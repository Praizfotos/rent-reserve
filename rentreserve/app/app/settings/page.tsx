"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOCK_WALLET, MOCK_SETTLEMENTS, formatNaira } from "@/lib/mock-data";
import StatusBadge from "@/components/product-ui/StatusBadge";

export default function SettingsPage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="p-4 md:p-6 lg:p-8 xl:p-10 max-w-[800px] mx-auto overflow-x-hidden">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-[20px] md:text-[22px] font-semibold tracking-tight text-black/87">
          Settings
        </h1>
        <p className="mt-1 text-[14px] text-black/45">
          Account, wallet, and notification preferences.
        </p>
      </motion.div>

      <div className="space-y-4 md:space-y-6">
        {/* Wallet */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-black/[0.06] bg-white p-4 md:p-5"
        >
          <h2 className="text-[14px] font-semibold text-black/87 mb-4">Wallet</h2>
          {MOCK_WALLET.connected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/[0.02] border border-black/[0.04]">
                <div className="h-8 w-8 rounded-full bg-black/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="12" height="8" rx="2" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                    <circle cx="10" cy="7" r="1" fill="rgba(0,0,0,0.3)" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-black/87">{MOCK_WALLET.network}</p>
                  <p className="text-[11px] text-black/35 font-mono truncate break-all">{MOCK_WALLET.address}</p>
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge variant="positive">Connected</StatusBadge>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-black/[0.04] p-3">
                  <p className="text-[11px] text-black/35">Balance</p>
                  <p className="text-[14px] font-semibold text-black/87 mt-0.5 tabular-nums break-all">{formatNaira(MOCK_WALLET.balance)}</p>
                </div>
                <div className="rounded-lg border border-black/[0.04] p-3">
                  <p className="text-[11px] text-black/35">Network</p>
                  <p className="text-[14px] font-semibold text-black/87 mt-0.5">Testnet</p>
                </div>
              </div>
              <p className="text-[11px] text-black/30 leading-relaxed">
                This is a simulated wallet on Stellar Testnet. No real funds are held.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-3 flex justify-center">
                <div className="h-12 w-12 rounded-full bg-black/[0.04] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="12" height="8" rx="2" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
                    <circle cx="10" cy="7" r="1" fill="rgba(0,0,0,0.2)" />
                  </svg>
                </div>
              </div>
              <p className="text-[14px] font-medium text-black/87">Connect your Stellar wallet</p>
              <p className="text-[12px] text-black/40 mt-1 max-w-[280px] mx-auto">
                Connect a wallet to enable blockchain-based rent settlement.
              </p>
              <button className="mt-4 rounded-lg bg-black text-white px-4 py-2 text-[13px] font-medium transition-all hover:bg-black/80">
                Connect wallet
              </button>
            </div>
          )}
        </motion.div>

        {/* Settlement history */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-black/[0.06] bg-white p-4 md:p-5"
        >
          <h2 className="text-[14px] font-semibold text-black/87 mb-4">Settlement history</h2>
          {MOCK_SETTLEMENTS.length === 0 ? (
            <p className="text-[13px] text-black/35 py-4 text-center">No settlements yet</p>
          ) : (
            <div className="space-y-3">
              {MOCK_SETTLEMENTS.map((s) => (
                <div key={s.id} className="rounded-lg border border-black/[0.04] p-3 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <p className="text-[13px] font-medium text-black/87 break-all">{formatNaira(s.amount)}</p>
                    <div className="flex-shrink-0">
                      <StatusBadge variant="positive">{s.status === "confirmed" ? "Confirmed" : "Simulated"}</StatusBadge>
                    </div>
                  </div>
                  <div className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 text-[11px] text-black/40">
                    <div className="truncate">Network: {s.network}</div>
                    <div className="text-left sm:text-right font-mono truncate">{s.txHash.slice(0, 10)}…</div>
                    <div className="truncate">From: {s.from}</div>
                    <div className="truncate">To: {s.to}</div>
                  </div>
                  <p className="text-[10px] text-black/25 mt-2">{s.timestampLabel}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Profile */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-black/[0.06] bg-white p-4 md:p-5"
        >
          <h2 className="text-[14px] font-semibold text-black/87 mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-medium text-black/45 block mb-1">Name</label>
              <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2 text-[14px] text-black/70 break-all">
                Praise Francis
              </div>
            </div>
            <div>
              <label className="text-[12px] font-medium text-black/45 block mb-1">Email</label>
              <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2 text-[14px] text-black/70 break-all">
                praise@example.com
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-black/[0.06] bg-white p-4 md:p-5"
        >
          <h2 className="text-[14px] font-semibold text-black/87 mb-4">Notifications</h2>
          <div className="space-y-0">
            {[
              { label: "Deadline reminders", description: "Get notified as your rent deadline approaches", enabled: true },
              { label: "Contribution confirmations", description: "Receive confirmation when funds are added", enabled: true },
              { label: "Settlement updates", description: "Know when your obligation is fully reserved", enabled: true },
              { label: "Weekly progress summary", description: "A weekly summary of your reservation progress", enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-black/[0.04] last:border-0 gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-black/87 break-words">{item.label}</p>
                  <p className="text-[12px] text-black/40 mt-0.5 break-words">{item.description}</p>
                </div>
                <div
                  className={`relative h-5 w-9 rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0 ${
                    item.enabled ? "bg-[rgba(0,143,74,0.81)]" : "bg-black/15"
                  }`}
                  role="switch"
                  aria-checked={item.enabled}
                  aria-label={item.label}
                >
                  <div
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      item.enabled ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
