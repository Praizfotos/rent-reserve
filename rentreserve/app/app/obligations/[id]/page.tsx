"use client";

import { use } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  getObligation,
  getContributions,
  getTimelineForObligation,
  calculateReadiness,
  formatNaira,
  MOCK_SETTLEMENTS,
} from "@/lib/mock-data";
import StatusBadge from "@/components/product-ui/StatusBadge";
import ContributionSimulator from "@/components/product-ui/ContributionSimulator";

export default function ObligationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const prefersReduced = useReducedMotion();
  const obligation = getObligation(id);
  const contributions = getContributions(id);
  const timeline = getTimelineForObligation(id);
  const settlement = MOCK_SETTLEMENTS.find((s) => s.obligationId === id);

  if (!obligation) {
    return (
      <div className="p-6 md:p-8 lg:p-10 max-w-[800px] mx-auto">
        <div className="text-center py-20">
          <h1 className="text-[18px] font-semibold text-black/87">Obligation not found</h1>
          <p className="mt-2 text-[14px] text-black/40">This obligation doesn&apos;t exist.</p>
          <Link href="/app/obligations" className="mt-4 inline-block text-[13px] text-black/50 hover:text-black/70 transition-colors">
            ← Back to obligations
          </Link>
        </div>
      </div>
    );
  }

  const readiness = calculateReadiness(obligation, obligation.recommendedContribution);
  const pct = Math.round((obligation.amountReserved / obligation.annualRent) * 100);

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-[1120px] mx-auto">
      {/* Breadcrumb */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <Link href="/app/obligations" className="text-[12px] text-black/40 hover:text-black/60 transition-colors">
          ← Obligations
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-[22px] font-semibold tracking-tight text-black/87">
            {obligation.name}
          </h1>
          <StatusBadge variant={obligation.status === "settled" ? "positive" : "default"} pulse={obligation.status === "active"}>
            {obligation.status === "settled" ? "Settled" : "Active"}
          </StatusBadge>
        </div>
        <p className="mt-1 text-[14px] text-black/45">{obligation.landlord}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Progress card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-[11px] font-medium text-black/35 uppercase tracking-wide">Funding progress</p>
              <p className="text-[20px] font-semibold text-black/87 tabular-nums">{pct}%</p>
            </div>

            <div className="relative h-3 w-full rounded-full bg-black/[0.04] overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full origin-left"
                style={{
                  background: obligation.status === "settled" ? "rgba(0,143,74,0.81)" : "rgba(0,0,0,0.6)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: obligation.amountReserved / obligation.annualRent }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] text-black/35">Annual rent</p>
                <p className="text-[14px] font-semibold text-black/87 mt-0.5 tabular-nums">{formatNaira(obligation.annualRent)}</p>
              </div>
              <div>
                <p className="text-[11px] text-black/35">Reserved</p>
                <p className="text-[14px] font-semibold text-black/87 mt-0.5 tabular-nums">{formatNaira(obligation.amountReserved)}</p>
              </div>
              <div>
                <p className="text-[11px] text-black/35">Remaining</p>
                <p className="text-[14px] font-semibold text-black/87 mt-0.5 tabular-nums">{formatNaira(readiness.remaining)}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-black/[0.04] grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] text-black/35">Rent due</p>
                <p className="text-[13px] font-medium text-black/87 mt-0.5">{obligation.dueDateLabel}</p>
              </div>
              <div>
                <p className="text-[11px] text-black/35">Days remaining</p>
                <p className="text-[13px] font-medium text-black/87 mt-0.5 tabular-nums">{readiness.daysRemaining}</p>
              </div>
            </div>
          </motion.div>

          {/* Contribution history */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white"
          >
            <div className="px-5 py-4 border-b border-black/[0.04]">
              <h2 className="text-[14px] font-semibold text-black/87">Contribution history</h2>
            </div>
            {contributions.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-[13px] text-black/35">No contributions yet</p>
              </div>
            ) : (
              <div className="divide-y divide-black/[0.04]">
                {contributions.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={prefersReduced ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="px-5 py-3.5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-black/87">{formatNaira(c.amount)}</p>
                      <p className="text-[11px] text-black/35 mt-0.5">{c.dateLabel}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge variant="positive">
                        {c.status === "confirmed" ? "Confirmed" : c.status === "pending" ? "Pending" : "Failed"}
                      </StatusBadge>
                      {c.txHash && (
                        <span className="text-[10px] font-mono text-black/25">{c.txHash}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Settlement info */}
          {settlement && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-black/[0.06] bg-white p-5"
            >
              <h2 className="text-[14px] font-semibold text-black/87 mb-3">Settlement</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">Status</span>
                  <StatusBadge variant="positive">Confirmed</StatusBadge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">Amount</span>
                  <span className="text-[13px] font-medium text-black/87">{formatNaira(settlement.amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">Network</span>
                  <span className="text-[13px] font-medium text-black/87">{settlement.network}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">Transaction</span>
                  <span className="text-[11px] font-mono text-black/50">{settlement.txHash.slice(0, 10)}…</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">Timestamp</span>
                  <span className="text-[12px] text-black/60">{settlement.timestampLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">From</span>
                  <span className="text-[12px] text-black/60">{settlement.from}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-black/40">To</span>
                  <span className="text-[12px] text-black/60">{settlement.to}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulator */}
          {obligation.status === "active" && (
            <ContributionSimulator obligation={obligation} />
          )}

          {/* Timeline */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-black/[0.06] bg-white p-5"
          >
            <h2 className="text-[14px] font-semibold text-black/87 mb-4">Timeline</h2>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.06]" />
              <div className="space-y-4">
                {timeline.map((event, i) => {
                  const dotColor =
                    event.severity === "positive" ? "bg-[rgba(0,143,74,0.81)]" :
                    event.severity === "info" ? "bg-[rgba(0,100,180,0.85)]" :
                    event.severity === "warning" ? "bg-[rgba(180,100,0,0.85)]" :
                    "bg-black/20";

                  return (
                    <motion.div
                      key={event.id}
                      initial={prefersReduced ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex gap-3 pl-5"
                    >
                      <div className={`absolute left-0 top-1.5 h-[14px] w-[14px] rounded-full border-2 border-white ${dotColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="text-[13px] font-medium text-black/87">{event.title}</p>
                          <span className="text-[11px] text-black/35 flex-shrink-0">{event.dateLabel}</span>
                        </div>
                        <p className="mt-0.5 text-[12px] text-black/45">{event.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
