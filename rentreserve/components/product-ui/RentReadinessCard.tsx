"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { calculateReadiness, formatNaira, type RentObligation } from "@/lib/mock-data";

interface RentReadinessCardProps {
  obligation: RentObligation;
  monthlyContribution?: number;
  className?: string;
}

export default function RentReadinessCard({
  obligation,
  monthlyContribution,
  className = "",
}: RentReadinessCardProps) {
  const prefersReduced = useReducedMotion();
  const contribution = monthlyContribution || obligation.recommendedContribution;

  const readiness = useMemo(
    () => calculateReadiness(obligation, contribution),
    [obligation, contribution]
  );

  const statusColors = {
    on_track: { bg: "bg-[rgba(0,143,74,0.06)]", text: "text-[rgba(0,143,74,0.81)]", dot: "bg-[rgba(0,143,74,0.81)]" },
    at_risk: { bg: "bg-[rgba(180,100,0,0.06)]", text: "text-[rgba(180,100,0,0.85)]", dot: "bg-[rgba(180,100,0,0.85)]" },
    behind: { bg: "bg-[rgba(223,38,0,0.05)]", text: "text-[rgba(223,38,0,0.82)]", dot: "bg-[rgba(223,38,0,0.82)]" },
    ready: { bg: "bg-[rgba(0,143,74,0.06)]", text: "text-[rgba(0,143,74,0.81)]", dot: "bg-[rgba(0,143,74,0.81)]" },
    overdue: { bg: "bg-[rgba(223,38,0,0.05)]", text: "text-[rgba(223,38,0,0.82)]", dot: "bg-[rgba(223,38,0,0.82)]" },
  };

  const statusLabels = {
    on_track: "On track",
    at_risk: "At risk",
    behind: "Behind",
    ready: "Ready",
    overdue: "Overdue",
  };

  const sc = statusColors[readiness.status];

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl border border-black/[0.06] bg-white overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-black/35">Rent readiness</p>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${sc.bg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
            <span className={`text-[11px] font-semibold ${sc.text}`}>
              {statusLabels[readiness.status]}
            </span>
          </div>
        </div>

        {/* Large percentage */}
        <div className="flex items-baseline gap-1 mb-1">
          <AnimatePresence mode="wait">
            <motion.span
              key={readiness.percentage}
              initial={prefersReduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[48px] font-semibold leading-none tracking-tighter text-black/87 tabular-nums"
            >
              {readiness.percentage}
            </motion.span>
          </AnimatePresence>
          <span className="text-[20px] font-medium text-black/30">%</span>
        </div>

        <p className="text-[14px] text-black/45 mb-4">
          {formatNaira(readiness.amountReserved)} of {formatNaira(readiness.rentAmount)} reserved
        </p>

        {/* Progress bar */}
        <div className="relative h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full origin-left"
            style={{
              background: readiness.status === "ready" || readiness.status === "on_track"
                ? "rgba(0,143,74,0.81)"
                : readiness.status === "at_risk"
                ? "rgba(180,100,0,0.85)"
                : "rgba(223,38,0,0.82)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: readiness.percentage / 100 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Detail rows */}
      <div className="border-t border-black/[0.04] px-5 py-3.5">
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
          <div>
            <p className="text-[11px] text-black/35">Rent due</p>
            <p className="text-[13px] font-medium text-black/87 mt-0.5">{obligation.dueDateLabel}</p>
          </div>
          <div>
            <p className="text-[11px] text-black/35">Days remaining</p>
            <p className="text-[13px] font-medium text-black/87 mt-0.5 tabular-nums">{readiness.daysRemaining}</p>
          </div>
          <div>
            <p className="text-[11px] text-black/35">Remaining</p>
            <p className="text-[13px] font-medium text-black/87 mt-0.5 tabular-nums">{formatNaira(readiness.remaining)}</p>
          </div>
          <div>
            <p className="text-[11px] text-black/35">Monthly needed</p>
            <p className="text-[13px] font-medium text-black/87 mt-0.5 tabular-nums">{formatNaira(readiness.requiredMonthly)}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-black/[0.04]">
          <AnimatePresence mode="wait">
            <motion.p
              key={readiness.statusMessage}
              initial={prefersReduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[13px] font-medium ${sc.text}`}
            >
              {readiness.statusMessage}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
