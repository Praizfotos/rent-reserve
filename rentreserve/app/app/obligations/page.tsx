"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MOCK_OBLIGATIONS, formatNaira } from "@/lib/mock-data";
import StatusBadge from "@/components/product-ui/StatusBadge";

export default function ObligationsPage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-[1120px] mx-auto">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-[22px] font-semibold tracking-tight text-black/87">
          Obligations
        </h1>
        <p className="mt-1 text-[14px] text-black/45">
          All rent obligations and their funding status.
        </p>
      </motion.div>

      <div className="space-y-4">
        {MOCK_OBLIGATIONS.map((ob, i) => {
          const pct = Math.round((ob.amountReserved / ob.annualRent) * 100);
          const remaining = ob.annualRent - ob.amountReserved;

          return (
            <motion.div
              key={ob.id}
              initial={prefersReduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-black/[0.06] bg-white p-5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <Link href={`/app/obligations/${ob.id}`} className="text-[15px] font-semibold text-black/87 hover:text-black transition-colors">
                      {ob.name}
                    </Link>
                    <StatusBadge variant={ob.status === "settled" ? "positive" : "default"} pulse={ob.status === "active"}>
                      {ob.status === "settled" ? "Settled" : "Active"}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-[13px] text-black/45">{ob.landlord}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-black/40">
                    <span>Annual rent: {formatNaira(ob.annualRent)}</span>
                    <span>Due: {ob.dueDateLabel}</span>
                    <span>Created: {ob.createdAt}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 sm:min-w-[80px]">
                  <p className="text-[20px] font-semibold text-black/87 tabular-nums">{pct}%</p>
                  <p className="text-[11px] text-black/35">{formatNaira(remaining)} remaining</p>
                  {ob.status === "active" && (
                    <p className="mt-1 text-[11px] text-black/30">{formatNaira(ob.recommendedContribution)}/mo recommended</p>
                  )}
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-black/[0.04] overflow-hidden">
                <motion.div
                  className="h-full rounded-full origin-left"
                  style={{
                    background: ob.status === "settled" ? "rgba(0,143,74,0.81)" : "rgba(0,0,0,0.6)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: ob.amountReserved / ob.annualRent }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
