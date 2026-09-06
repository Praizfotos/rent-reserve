"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOCK_TIMELINE } from "@/lib/mock-data";

export default function TimelinePage() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="p-6 md:p-8 lg:p-10 max-w-[800px] mx-auto">
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="text-[22px] font-semibold tracking-tight text-black/87">
          Timeline
        </h1>
        <p className="mt-1 text-[14px] text-black/45">
          A chronological view of all rent-related activity.
        </p>
      </motion.div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-black/[0.06] bg-white p-5"
      >
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.06]" />
          <div className="space-y-4">
            {MOCK_TIMELINE.map((event, i) => {
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
                  transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-3 pl-5"
                >
                  <div className={`absolute left-0 top-1.5 h-[14px] w-[14px] rounded-full border-2 border-white ${dotColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-[13px] font-medium text-black/87">{event.title}</p>
                      <span className="text-[11px] text-black/35 flex-shrink-0">{event.dateLabel}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-black/45">{event.description}</p>
                    {event.amount && (
                      <p className="mt-0.5 text-[11px] font-medium text-black/30">₦{event.amount.toLocaleString("en-NG")}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
