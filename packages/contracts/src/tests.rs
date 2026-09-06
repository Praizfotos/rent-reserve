#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    token::{Client as TokenClient, StellarAssetClient},
    Address, BytesN, Env,
};

// ─── SETUP ───────────────────────────────────────────────────────────────────

struct Setup {
    env:      Env,
    client:   RentReserveContractClient<'static>,
    tenant:   Address,
    landlord: Address,
    sponsor:  Address,
    asset:    Address,
}

impl Setup {
    fn new() -> Self {
        let env = Env::default();
        env.mock_all_auths();

        let asset_res  = env.register_stellar_asset_contract_v2(Address::generate(&env));
        let asset_addr = asset_res.address();
        let token_sa   = StellarAssetClient::new(&env, &asset_addr);

        let contract_id = env.register(RentReserveContract, ());
        let raw_client  = RentReserveContractClient::new(&env, &contract_id);

        let admin    = Address::generate(&env);
        let tenant   = Address::generate(&env);
        let landlord = Address::generate(&env);
        let sponsor  = Address::generate(&env);

        raw_client.initialize(&admin);
        token_sa.mint(&tenant,  &10_000_000_000_i128);
        token_sa.mint(&sponsor, &5_000_000_000_i128);

        env.ledger().set(LedgerInfo {
            timestamp:                1_700_000_000,
            protocol_version:         23,  // SDK 28 requires protocol 23+
            sequence_number:          1000,
            network_id:               Default::default(),
            base_reserve:             10,
            min_temp_entry_ttl:       10_000,
            min_persistent_entry_ttl: 10_000,
            max_entry_ttl:            6_000_000,
        });

        // SAFETY: client lifetime is bounded by env which outlives every test
        let client: RentReserveContractClient<'static> =
            unsafe { core::mem::transmute(raw_client) };

        Setup { env, client, tenant, landlord, sponsor, asset: asset_addr }
    }

    fn prop(&self)   -> BytesN<32> { BytesN::from_array(&self.env, &[1u8; 32]) }
    fn now(&self)    -> u64        { self.env.ledger().timestamp() }
    fn in_30d(&self) -> u64        { self.now() + 86_400 * 30 }

    // In SDK 28, the non-try_ client methods panic on error / return T directly
    fn active(&self, target: i128) -> BytesN<32> {
        let id = self.client.create_obligation(
            &self.tenant, &self.landlord, &self.prop(), &self.asset,
            &target, &(self.now() - 100), &self.in_30d(),
        );
        self.client.accept_obligation(&id);
        id
    }
}

// ─── CREATION ────────────────────────────────────────────────────────────────

#[test]
fn create_success() {
    let s = Setup::new();
    let id = s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_200_000, &(s.now() - 100), &(s.now() + 86_400 * 365),
    );
    let o = s.client.get_obligation(&id);
    assert_eq!(o.status, RentStatus::PendingAcceptance);
    assert_eq!(o.funded_amount, 0);
    assert_eq!(o.target_amount, 1_200_000);
}

#[test]
#[should_panic]
fn create_zero_target_fails() {
    let s = Setup::new();
    s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &0, &(s.now() - 100), &s.in_30d(),
    );
}

#[test]
#[should_panic]
fn create_past_due_fails() {
    let s = Setup::new();
    s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_000_000, &(s.now() - 200), &(s.now() - 1),
    );
}

#[test]
#[should_panic]
fn create_start_after_due_fails() {
    let s = Setup::new();
    s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_000_000, &(s.now() + 86_400 * 2), &(s.now() + 86_400),
    );
}

// ─── ACCEPTANCE ──────────────────────────────────────────────────────────────

#[test]
fn accept_transitions_to_active() {
    let s = Setup::new();
    let id = s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_200_000, &(s.now() - 100), &s.in_30d(),
    );
    s.client.accept_obligation(&id);
    assert_eq!(s.client.get_obligation(&id).status, RentStatus::Active);
}

#[test]
#[should_panic]
fn double_accept_fails() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.accept_obligation(&id); // should panic — already Active
}

// ─── CONTRIBUTIONS ───────────────────────────────────────────────────────────

#[test]
fn partial_contribution() {
    let s = Setup::new();
    let id = s.active(1_200_000);
    s.client.contribute(&id, &s.tenant, &300_000);
    let o = s.client.get_obligation(&id);
    assert_eq!(o.funded_amount, 300_000);
    assert_eq!(o.status, RentStatus::PartiallyFunded);
}

#[test]
fn contributions_accumulate() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &200_000);
    s.client.contribute(&id, &s.tenant, &300_000);
    s.client.contribute(&id, &s.tenant, &500_000);
    let o = s.client.get_obligation(&id);
    assert_eq!(o.funded_amount, 1_000_000);
    assert_eq!(o.status, RentStatus::FullyFunded);
}

#[test]
fn sponsor_tracked_separately() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.sponsor, &400_000);
    s.client.contribute(&id, &s.tenant,  &600_000);
    assert_eq!(s.client.get_contributor_total(&id, &s.tenant),  600_000_i128);
    assert_eq!(s.client.get_contributor_total(&id, &s.sponsor), 400_000_i128);
    assert_eq!(s.client.get_obligation(&id).status, RentStatus::FullyFunded);
}

#[test]
#[should_panic]
fn contribute_before_acceptance_fails() {
    let s = Setup::new();
    let id = s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_000_000, &(s.now() - 100), &s.in_30d(),
    );
    s.client.contribute(&id, &s.tenant, &100_000); // should panic
}

// ─── INVARIANTS ──────────────────────────────────────────────────────────────

#[test]
fn overfunding_rejected() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &900_000);

    // try_ returns Result — does not panic
    let r = s.client.try_contribute(&id, &s.tenant, &200_000);
    assert!(r.is_err(), "overfunding must be rejected");

    // funded_amount must still be exactly 900_000
    assert_eq!(s.client.get_obligation(&id).funded_amount, 900_000);
}

#[test]
fn zero_contribution_rejected() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    let r = s.client.try_contribute(&id, &s.tenant, &0);
    assert!(r.is_err());
}

#[test]
fn progress_pct_correct() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &750_000);
    assert_eq!(s.client.get_progress_pct(&id), 75_u32);
}

#[test]
fn remaining_correct() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &300_000);
    assert_eq!(s.client.get_remaining(&id), 700_000_i128);
}

// ─── SETTLEMENT ──────────────────────────────────────────────────────────────

#[test]
fn full_settlement_transfers_to_landlord() {
    let s = Setup::new();
    let token = TokenClient::new(&s.env, &s.asset);
    let id = s.active(1_000_000);
    let before = token.balance(&s.landlord);

    s.client.contribute(&id, &s.tenant, &1_000_000);
    s.client.settle(&id);

    assert_eq!(s.client.get_obligation(&id).status, RentStatus::Settled);
    assert_eq!(token.balance(&s.landlord), before + 1_000_000);
}

#[test]
fn partial_funding_cannot_settle() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &500_000);
    let r = s.client.try_settle(&id);
    assert!(r.is_err());
}

#[test]
fn cannot_settle_twice() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &1_000_000);
    s.client.settle(&id);
    let r = s.client.try_settle(&id);
    assert!(r.is_err());
}

#[test]
fn cannot_contribute_after_settled() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &1_000_000);
    s.client.settle(&id);
    let r = s.client.try_contribute(&id, &s.tenant, &1);
    assert!(r.is_err());
}

// ─── CANCELLATION ────────────────────────────────────────────────────────────

#[test]
fn cancel_refunds_tenant() {
    let s = Setup::new();
    let token  = TokenClient::new(&s.env, &s.asset);
    let id     = s.active(1_000_000);
    let before = token.balance(&s.tenant);

    s.client.contribute(&id, &s.tenant, &400_000);
    s.client.cancel(&id);

    assert_eq!(token.balance(&s.tenant), before);   // fully refunded
    let o = s.client.get_obligation(&id);
    assert_eq!(o.status, RentStatus::Cancelled);
    assert_eq!(o.funded_amount, 0);
}

#[test]
fn cannot_contribute_to_cancelled() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.cancel(&id);
    let r = s.client.try_contribute(&id, &s.tenant, &100_000);
    assert!(r.is_err());
}

#[test]
fn cannot_cancel_settled() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.contribute(&id, &s.tenant, &1_000_000);
    s.client.settle(&id);
    let r = s.client.try_cancel(&id);
    assert!(r.is_err());
}

#[test]
fn cancel_without_funds_succeeds() {
    let s = Setup::new();
    let id = s.active(1_000_000);
    s.client.cancel(&id);
    assert_eq!(s.client.get_obligation(&id).status, RentStatus::Cancelled);
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────

#[test]
fn version_is_one() {
    let s = Setup::new();
    assert_eq!(s.client.version(), 1_u32);
}

#[test]
fn pause_blocks_create_unpause_restores() {
    let s = Setup::new();
    s.client.pause();
    let r = s.client.try_create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_000_000, &(s.now() - 100), &s.in_30d(),
    );
    assert!(r.is_err(), "paused contract must reject create");

    s.client.unpause();
    // must succeed after unpause
    s.client.create_obligation(
        &s.tenant, &s.landlord, &s.prop(), &s.asset,
        &1_000_000, &(s.now() - 100), &s.in_30d(),
    );
}
