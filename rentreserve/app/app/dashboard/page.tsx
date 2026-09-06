"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_OBLIGATIONS, MOCK_TIMELINE, MOCK_WALLET, formatNaira } from "@/lib/mock-data";
import RentReadinessCard from "@/components/product-ui/RentReadinessCard";
import ActivityFeed from "@/components/product-ui/ActivityFeed";
import StatusBadge from "@/components/product-ui/StatusBadge";

const primaryObligation = MOCK_OBLIGATIONS[0];

const activity = MOCK_TIMELINE.slice(0, 5).map((e) => ({
  id: e.id,
  icon: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="4" fill={
        e.severity === "positive" ? "rgba(0,143,74,0.3)" :
        e.severity === "info" ? "rgba(0,100,180,0.3)" :
        e.severity === "warning" ? "rgba(180,100,0,0.3)" :
        "rgba(0,0,0,0.1)"
      } />
    </svg>
  ),
  title: e.title,
  description: e.description,
  time: e.dateLabel,
}));

export default function DashboardPage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-[1120px] mx-auto">
      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-[22px] font-semibold tracking-tight text-black/87">
          Dashboard
        </h1>
        <p className="mt-1 text-[14px] text-black/45">
          Your rent preparation overview.
        </p>
      </motion.div>

      {/* Rent readiness — hero element */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-5">
          <RentReadinessCard obligation={primaryObligation} />
        </div>

        {/* Quick stats + wallet */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Reserve balance */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <p className="text-[11px] font-medium text-black/35 uppercase tracking-wide mb-1">Total reserved</p>
            <p className="text-[24px] font-semibold text-black/87 tabular-nums">{formatNaira(MOCK_OBLIGATIONS.reduce((s, o) => s + o.amountReserved, 0))}</p>
            <p className="text-[12px] text-black/35 mt-1">Across {MOCK_OBLIGATIONS.length} obligations</p>
          </motion.div>

          {/* Next contribution */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <p className="text-[11px] font-medium text-black/35 uppercase tracking-wide mb-1">Next contribution</p>
            <p className="text-[24px] font-semibold text-black/87 tabular-nums">{formatNaira(primaryObligation.recommendedContribution)}</p>
            <p className="text-[12px] text-black/35 mt-1">Recommended monthly</p>
          </motion.div>

          {/* Settlement layer */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <p className="text-[11px] font-medium text-black/35 uppercase tracking-wide mb-1">Settlement layer</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-[rgba(0,143,74,0.81)]" />
              <p className="text-[14px] font-semibold text-black/87">Stellar</p>
            </div>
            <p className="text-[12px] text-black/35 mt-1">
              {MOCK_WALLET.connected ? "Wallet connected" : "No wallet"}
            </p>
          </motion.div>

          {/* Wallet */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <p className="text-[11px] font-medium text-black/35 uppercase tracking-wide mb-1">Wallet</p>
            <p className="text-[13px] font-mono text-black/70 mt-1 truncate">{MOCK_WALLET.address.slice(0, 6)}…{MOCK_WALLET.address.slice(-4)}</p>
            <p className="text-[12px] text-black/35 mt-0.5">{MOCK_WALLET.network}</p>
          </motion.div>
        </div>
      </div>

      {/* Obligations list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.04]">
              <h2 className="text-[14px] font-semibold text-black/87">Obligations</h2>
              <Link
                href="/app/obligations"
                className="text-[12px] text-black/40 hover:text-black/60 transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="divide-y divide-black/[0.04]">
              {MOCK_OBLIGATIONS.map((ob, i) => (
                <motion.div
                  key={ob.id}
                  initial={prefersReduced ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 py-4 hover:bg-black/[0.01] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/app/obligations/${ob.id}`} className="text-[14px] font-medium text-black/87 hover:text-black transition-colors truncate">
                          {ob.name}
                        </Link>
                        <StatusBadge
                          variant={ob.status === "settled" ? "positive" : "default"}
                          pulse={ob.status === "active"}
                        >
                          {ob.status === "settled" ? "Settled" : "Active"}
                        </StatusBadge>
                      </div>
                      <p className="mt-1 text-[12px] text-black/40">
                        {formatNaira(ob.annualRent)} · Due {ob.dueDateLabel}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[14px] font-semibold text-black/87">
                        {Math.round((ob.amountReserved / ob.annualRent) * 100)}%
                      </p>
                      <p className="text-[11px] text-black/35">{formatNaira(ob.annualRent - ob.amountReserved)} left</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-black/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full origin-left"
                      style={{
                        background: ob.status === "settled" ? "rgba(0,143,74,0.81)" : "rgba(0,0,0,0.6)",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: ob.amountReserved / ob.annualRent }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-5">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.04]">
              <h2 className="text-[14px] font-semibold text-black/87">Recent activity</h2>
              <Link
                href="/app/timeline"
                className="text-[12px] text-black/40 hover:text-black/60 transition-colors"
              >
                View timeline →
              </Link>
            </div>
            <div className="px-5 py-2">
              <ActivityFeed items={activity} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
