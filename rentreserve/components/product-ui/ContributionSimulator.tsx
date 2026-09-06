"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { calculateReadiness, formatNaira, type RentObligation } from "@/lib/mock-data";

interface ContributionSimulatorProps {
  obligation: RentObligation;
  className?: string;
}

const CONTRIBUTION_PRESETS = [50_000, 75_000, 100_000, 150_000, 200_000];

export default function ContributionSimulator({ obligation, className = "" }: ContributionSimulatorProps) {
  const prefersReduced = useReducedMotion();
  const [monthly, setMonthly] = useState(obligation.recommendedContribution || 75_000);

  const readiness = useMemo(
    () => calculateReadiness(obligation, monthly),
    [obligation, monthly]
  );

  const statusColors = {
    on_track: "text-[rgba(0,143,74,0.81)]",
    at_risk: "text-[rgba(180,100,0,0.85)]",
    behind: "text-[rgba(223,38,0,0.82)]",
    ready: "text-[rgba(0,143,74,0.81)]",
    overdue: "text-[rgba(223,38,0,0.82)]",
  };

  const statusLabels = {
    on_track: "On track",
    at_risk: "At risk",
    behind: "Behind schedule",
    ready: "Ready early",
    overdue: "Overdue",
  };

  return (
    <div className={`rounded-xl border border-black/[0.06] bg-white p-5 md:p-6 ${className}`}>
      <h3 className="text-[14px] font-semibold text-black/87 mb-1">Contribution simulator</h3>
      <p className="text-[12px] text-black/40 mb-5">Adjust your monthly contribution to see projected readiness.</p>

      {/* Monthly input */}
      <div className="mb-5">
        <label className="text-[11px] font-medium text-black/40 uppercase tracking-wide block mb-2">
          Monthly contribution
        </label>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-black/30">₦</span>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg border border-black/[0.08] bg-black/[0.02] pl-7 pr-3 py-2.5 text-[15px] font-medium text-black/87 tabular-nums focus:outline-2 focus:outline-offset-0 focus:outline-black/20 transition-all"
              min={0}
              step={5_000}
            />
          </div>
          <span className="text-[12px] text-black/35">/ month</span>
        </div>

        {/* Preset buttons */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {CONTRIBUTION_PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setMonthly(preset)}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-150 ${
                monthly === preset
                  ? "bg-black text-white"
                  : "bg-black/[0.04] text-black/50 hover:bg-black/[0.07] hover:text-black/70"
              }`}
            >
              {formatNaira(preset)}
            </button>
          ))}
        </div>
      </div>

      {/* Readiness visualization */}
      <div className="mb-5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[11px] font-medium text-black/40 uppercase tracking-wide">Projected readiness</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={readiness.status}
              initial={prefersReduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={`text-[12px] font-semibold ${statusColors[readiness.status]}`}
            >
              {statusLabels[readiness.status]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="relative h-3 w-full rounded-full bg-black/[0.04] overflow-hidden mb-3">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full origin-left"
            style={{
              background: readiness.status === "ready" || readiness.status === "on_track"
                ? "rgba(0,143,74,0.81)"
                : readiness.status === "at_risk"
                ? "rgba(180,100,0,0.85)"
                : "rgba(223,38,0,0.82)",
            }}
            animate={{ scaleX: readiness.percentage / 100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Due date marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-black/20"
            style={{ left: `${Math.min(100, (readiness.amountReserved / readiness.rentAmount) * 100)}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[11px] text-black/35 mb-0.5">Reserved</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={readiness.amountReserved}
                initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[15px] font-semibold text-black/87 tabular-nums"
              >
                {formatNaira(readiness.amountReserved)}
              </motion.p>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-[11px] text-black/35 mb-0.5">Remaining</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={readiness.remaining}
                initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[15px] font-semibold text-black/87 tabular-nums"
              >
                {formatNaira(readiness.remaining)}
              </motion.p>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-[11px] text-black/35 mb-0.5">Days left</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={readiness.daysRemaining}
                initial={prefersReduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[15px] font-semibold text-black/87 tabular-nums"
              >
                {readiness.daysRemaining}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Projection */}
      <div className="rounded-lg bg-black/[0.02] border border-black/[0.04] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-black/50">Projected ready by</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={readiness.projectedReadyDate}
              initial={prefersReduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[13px] font-semibold text-black/87"
            >
              {readiness.projectedReadyLabel}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] text-black/50">Rent due</span>
          <span className="text-[13px] font-medium text-black/70">{obligation.dueDateLabel}</span>
        </div>
        <div className="pt-2 mt-2 border-t border-black/[0.04]">
          <AnimatePresence mode="wait">
            <motion.p
              key={readiness.statusMessage}
              initial={prefersReduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[13px] font-medium ${statusColors[readiness.status]}`}
            >
              {readiness.statusMessage}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
