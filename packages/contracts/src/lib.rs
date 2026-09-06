//! RentReserve — Programmable Rent Obligation Contract
//!
//! Manages the complete lifecycle of a rent obligation:
//! creation, acceptance, contributions, settlement, and cancellation.
//!
//! Security model:
//! - Every state-changing function requires explicit authorization from
//!   the appropriate participant (tenant, landlord, or contributor).
//! - Soroban's built-in replay protection is used throughout.
//! - No admin key can move user funds.
//! - Invariant: funded_amount <= target_amount always holds.

#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    symbol_short,
    Address, BytesN, Env,
    token,
};

// ─── ERROR CODES ─────────────────────────────────────────────────────────────

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum RentError {
    Unauthorized          = 1,
    ObligationNotFound    = 2,
    InvalidStateTransition = 3,
    InvalidAmount         = 4,
    WouldExceedTarget     = 5,
    AlreadySettled        = 6,
    AlreadyCancelled      = 7,
    Expired               = 8,
    NotFullyFunded        = 9,
    InvalidDueDate        = 10,
    InvalidTarget         = 11,
    ContractPaused        = 12,
    ObligationNotActive   = 13,
    InvalidTimeRange      = 14,
}

// ─── DATA TYPES ──────────────────────────────────────────────────────────────

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum RentStatus {
    PendingAcceptance,
    Active,
    PartiallyFunded,
    FullyFunded,
    Settled,
    Cancelled,
    Expired,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct RentObligation {
    pub id:             BytesN<32>,
    pub tenant:         Address,
    pub landlord:       Address,
    pub property_ref:   BytesN<32>,
    pub asset:          Address,
    pub target_amount:  i128,
    pub funded_amount:  i128,
    pub start_time:     u64,
    pub due_time:       u64,
    pub status:         RentStatus,
    pub created_at:     u64,
    pub updated_at:     u64,
}

// ─── STORAGE KEYS ────────────────────────────────────────────────────────────

#[contracttype]
enum DataKey {
    Admin,
    Paused,
    Version,
    Obligation(BytesN<32>),
    ContributorTotal(BytesN<32>, Address),
}

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────

fn get_obligation(env: &Env, id: &BytesN<32>) -> Result<RentObligation, RentError> {
    env.storage()
        .persistent()
        .get::<_, RentObligation>(&DataKey::Obligation(id.clone()))
        .ok_or(RentError::ObligationNotFound)
}

fn save_obligation(env: &Env, obligation: &RentObligation) {
    let key = DataKey::Obligation(obligation.id.clone());
    // ~1 year at ~6s/ledger
    let ttl: u32 = 5_256_000;
    env.storage().persistent().set(&key, obligation);
    env.storage().persistent().extend_ttl(&key, ttl, ttl);
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────

fn emit_created(env: &Env, id: &BytesN<32>, tenant: &Address, landlord: &Address, target: i128) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("CREATED")),
        (id.clone(), tenant.clone(), landlord.clone(), target),
    );
}

fn emit_accepted(env: &Env, id: &BytesN<32>) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("ACCEPTED")),
        id.clone(),
    );
}

fn emit_contrib(env: &Env, id: &BytesN<32>, contributor: &Address, amount: i128, funded: i128, target: i128) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("CONTRIB")),
        (id.clone(), contributor.clone(), amount, funded, target),
    );
}

fn emit_funded(env: &Env, id: &BytesN<32>) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("FUNDED")),
        id.clone(),
    );
}

fn emit_settled(env: &Env, id: &BytesN<32>, landlord: &Address, amount: i128) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("SETTLED")),
        (id.clone(), landlord.clone(), amount),
    );
}

fn emit_cancelled(env: &Env, id: &BytesN<32>, actor: &Address) {
    env.events().publish(
        (symbol_short!("RENT"), symbol_short!("CANCEL")),
        (id.clone(), actor.clone()),
    );
}

// ─── CONTRACT ────────────────────────────────────────────────────────────────

#[contract]
pub struct RentReserveContract;

#[contractimpl]
impl RentReserveContract {

    // ── ADMIN ─────────────────────────────────────────────────────────────

    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin,   &admin);
        env.storage().instance().set(&DataKey::Paused,  &false);
        env.storage().instance().set(&DataKey::Version, &1u32);
        env.storage().instance().extend_ttl(100_000, 100_000);
    }

    pub fn pause(env: Env) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        env.storage().instance().set(&DataKey::Paused, &true);
    }

    pub fn unpause(env: Env) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        env.storage().instance().set(&DataKey::Paused, &false);
    }

    // ── OBLIGATION LIFECYCLE ──────────────────────────────────────────────

    /// Create a new rent obligation. Tenant must authorize.
    /// Returns the 32-byte obligation ID.
    pub fn create_obligation(
        env:           Env,
        tenant:        Address,
        landlord:      Address,
        property_ref:  BytesN<32>,
        asset:         Address,
        target_amount: i128,
        start_time:    u64,
        due_time:      u64,
    ) -> Result<BytesN<32>, RentError> {
        let paused: bool = env.storage().instance()
            .get(&DataKey::Paused).unwrap_or(false);
        if paused { return Err(RentError::ContractPaused); }

        tenant.require_auth();

        if target_amount <= 0 { return Err(RentError::InvalidTarget); }
        let now = env.ledger().timestamp();
        if due_time <= now   { return Err(RentError::InvalidDueDate); }
        if start_time >= due_time { return Err(RentError::InvalidTimeRange); }

        // Derive a unique ID from ledger sequence + current timestamp
        let mut seed = [0u8; 16];
        seed[..4].copy_from_slice(&env.ledger().sequence().to_be_bytes());
        seed[4..12].copy_from_slice(&now.to_be_bytes());
        let id: BytesN<32> = env.crypto()
            .sha256(&soroban_sdk::Bytes::from_slice(&env, &seed))
            .into();

        let obligation = RentObligation {
            id: id.clone(),
            tenant,
            landlord,
            property_ref,
            asset,
            target_amount,
            funded_amount: 0,
            start_time,
            due_time,
            status: RentStatus::PendingAcceptance,
            created_at: now,
            updated_at: now,
        };

        save_obligation(&env, &obligation);
        emit_created(&env, &obligation.id, &obligation.tenant, &obligation.landlord, target_amount);

        Ok(id)
    }

    /// Landlord accepts: PendingAcceptance → Active
    pub fn accept_obligation(env: Env, obligation_id: BytesN<32>) -> Result<(), RentError> {
        let mut o = get_obligation(&env, &obligation_id)?;
        o.landlord.require_auth();

        match o.status {
            RentStatus::PendingAcceptance => {}
            RentStatus::Cancelled => return Err(RentError::AlreadyCancelled),
            _ => return Err(RentError::InvalidStateTransition),
        }

        o.status = RentStatus::Active;
        o.updated_at = env.ledger().timestamp();
        save_obligation(&env, &o);
        emit_accepted(&env, &obligation_id);
        Ok(())
    }

    /// Contribute funds. Any authorized address (tenant, sponsor, family).
    ///
    /// CRITICAL INVARIANT: funded_amount + amount <= target_amount
    /// enforced atomically on-chain.
    pub fn contribute(
        env:           Env,
        obligation_id: BytesN<32>,
        contributor:   Address,
        amount:        i128,
    ) -> Result<(), RentError> {
        contributor.require_auth();

        if amount <= 0 { return Err(RentError::InvalidAmount); }

        let mut o = get_obligation(&env, &obligation_id)?;

        match o.status {
            RentStatus::Active | RentStatus::PartiallyFunded => {}
            RentStatus::PendingAcceptance => return Err(RentError::ObligationNotActive),
            RentStatus::Settled           => return Err(RentError::AlreadySettled),
            RentStatus::Cancelled         => return Err(RentError::AlreadyCancelled),
            RentStatus::Expired           => return Err(RentError::Expired),
            _ => return Err(RentError::InvalidStateTransition),
        }

        let now = env.ledger().timestamp();
        if now > o.due_time {
            o.status = RentStatus::Expired;
            save_obligation(&env, &o);
            return Err(RentError::Expired);
        }

        // ─── CRITICAL INVARIANT ──────────────────────────────────────────
        let new_funded = o.funded_amount
            .checked_add(amount)
            .ok_or(RentError::WouldExceedTarget)?;
        if new_funded > o.target_amount {
            return Err(RentError::WouldExceedTarget);
        }

        // Transfer tokens from contributor → contract
        token::Client::new(&env, &o.asset)
            .transfer(&contributor, &env.current_contract_address(), &amount);

        // Track per-contributor totals
        let ctbr_key = DataKey::ContributorTotal(obligation_id.clone(), contributor.clone());
        let prev: i128 = env.storage().persistent().get(&ctbr_key).unwrap_or(0);
        let ttl: u32 = 5_256_000;
        env.storage().persistent().set(&ctbr_key, &(prev + amount));
        env.storage().persistent().extend_ttl(&ctbr_key, ttl, ttl);

        o.funded_amount = new_funded;
        o.updated_at = now;

        if o.funded_amount == o.target_amount {
            o.status = RentStatus::FullyFunded;
            save_obligation(&env, &o);
            emit_funded(&env, &obligation_id);
        } else {
            o.status = RentStatus::PartiallyFunded;
            save_obligation(&env, &o);
        }

        emit_contrib(&env, &obligation_id, &contributor, amount,
            o.funded_amount, o.target_amount);

        Ok(())
    }

    /// Settle: FullyFunded → Settled. Tenant authorizes.
    pub fn settle(env: Env, obligation_id: BytesN<32>) -> Result<(), RentError> {
        let mut o = get_obligation(&env, &obligation_id)?;
        o.tenant.require_auth();

        match o.status {
            RentStatus::FullyFunded => {}
            RentStatus::Settled   => return Err(RentError::AlreadySettled),
            RentStatus::Cancelled => return Err(RentError::AlreadyCancelled),
            _ => return Err(RentError::NotFullyFunded),
        }

        let amount = o.funded_amount;
        token::Client::new(&env, &o.asset)
            .transfer(&env.current_contract_address(), &o.landlord, &amount);

        o.status = RentStatus::Settled;
        o.updated_at = env.ledger().timestamp();
        save_obligation(&env, &o);
        emit_settled(&env, &obligation_id, &o.landlord, amount);

        Ok(())
    }

    /// Cancel. Refunds contributed funds to tenant. Tenant only (V1).
    pub fn cancel(env: Env, obligation_id: BytesN<32>) -> Result<(), RentError> {
        let mut o = get_obligation(&env, &obligation_id)?;
        o.tenant.require_auth();

        match o.status {
            RentStatus::Settled   => return Err(RentError::AlreadySettled),
            RentStatus::Cancelled => return Err(RentError::AlreadyCancelled),
            _ => {}
        }

        if o.funded_amount > 0 {
            token::Client::new(&env, &o.asset)
                .transfer(&env.current_contract_address(), &o.tenant, &o.funded_amount);
        }

        let actor = o.tenant.clone();
        o.status = RentStatus::Cancelled;
        o.funded_amount = 0;
        o.updated_at = env.ledger().timestamp();
        save_obligation(&env, &o);
        emit_cancelled(&env, &obligation_id, &actor);

        Ok(())
    }

    // ── QUERIES ───────────────────────────────────────────────────────────

    pub fn get_obligation(env: Env, obligation_id: BytesN<32>) -> Result<RentObligation, RentError> {
        get_obligation(&env, &obligation_id)
    }

    pub fn get_contributor_total(
        env:           Env,
        obligation_id: BytesN<32>,
        contributor:   Address,
    ) -> i128 {
        env.storage()
            .persistent()
            .get::<_, i128>(&DataKey::ContributorTotal(obligation_id, contributor))
            .unwrap_or(0)
    }

    pub fn get_remaining(env: Env, obligation_id: BytesN<32>) -> Result<i128, RentError> {
        let o = get_obligation(&env, &obligation_id)?;
        Ok(o.target_amount - o.funded_amount)
    }

    pub fn get_progress_pct(env: Env, obligation_id: BytesN<32>) -> Result<u32, RentError> {
        let o = get_obligation(&env, &obligation_id)?;
        if o.target_amount == 0 { return Ok(0); }
        Ok(((o.funded_amount * 100 / o.target_amount) as u32).min(100))
    }

    pub fn version(env: Env) -> u32 {
        env.storage().instance().get(&DataKey::Version).unwrap_or(0)
    }
}

// ─── TESTS ───────────────────────────────────────────────────────────────────

#[cfg(test)]
mod tests;
