"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const lifecycleSteps = [
  {
    id: "create",
    number: "01",
    label: "Create",
    title: "Define the obligation",
    body: "Set the landlord, property, rent amount and due date. The obligation is the financial anchor for everything that follows.",
    pct: 0,
    statusLabel: "Created",
    statusColor: "rgba(0,0,0,0.4)",
    statusBg: "rgba(0,0,0,0.05)",
  },
  {
    id: "accept",
    number: "02",
    label: "Accept",
    title: "Landlord approves",
    body: "The landlord reviews and accepts the obligation. Both parties are now bound to the agreed terms.",
    pct: 0,
    statusLabel: "Active",
    statusColor: "rgba(0,100,180,0.85)",
    statusBg: "rgba(0,100,180,0.07)",
  },
  {
    id: "fund",
    number: "03",
    label: "Fund",
    title: "Contribute gradually",
    body: "Make contributions at any cadence. Each payment moves the funding progress forward.",
    pct: 55,
    statusLabel: "Funding",
    statusColor: "rgba(180,100,0,0.85)",
    statusBg: "rgba(180,100,0,0.07)",
  },
  {
    id: "track",
    number: "04",
    label: "Track",
    title: "Stay deadline-aware",
    body: "The system monitors your funding pace against the deadline and surfaces intelligent reminders.",
    pct: 78,
    statusLabel: "78% funded",
    statusColor: "rgba(0,100,180,0.85)",
    statusBg: "rgba(0,100,180,0.07)",
  },
  {
    id: "settle",
    number: "05",
    label: "Settle",
    title: "Complete the obligation",
    body: "When fully funded, settle the obligation with a wallet-authorized action. No waiting required.",
    pct: 100,
    statusLabel: "Fully funded",
    statusColor: "rgba(0,143,74,0.85)",
    statusBg: "rgba(0,143,74,0.08)",
  },
  {
    id: "verify",
    number: "06",
    label: "Verify",
    title: "Both parties have proof",
    body: "The settled obligation is recorded on Stellar. A receipt is generated for tenant and landlord.",
    pct: 100,
    statusLabel: "Settled ✓",
    statusColor: "rgba(0,143,74,0.9)",
    statusBg: "rgba(0,143,74,0.1)",
    settled: true,
  },
];

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof lifecycleSteps)[0];
  index: number;
  inView: boolean;
}) {
  const isSettled = step.id === "verify";
  const showProgress = step.pct > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: 0.08 + index * 0.07, ease }}
    >
      <div
        className="rounded-2xl p-5 h-full flex flex-col"
        style={{
          backgroundColor: "white",
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-[11px] font-semibold tabular-nums"
            style={{ color: "rgba(0,0,0,0.25)" }}
          >
            {step.number}
          </span>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: step.statusBg, color: step.statusColor }}
          >
            {step.statusLabel}
          </span>
        </div>

        {/* Label */}
        <p
          className="text-[11px] font-semibold tracking-widest uppercase mb-1.5"
          style={{ color: "rgba(0,0,0,0.3)" }}
        >
          {step.label}
        </p>

        {/* Title */}
        <p
          className="text-[15px] font-semibold mb-2 leading-snug"
          style={{ color: "rgba(0,0,0,0.875)" }}
        >
          {step.title}
        </p>

        {/* Body */}
        <p
          className="text-[12px] leading-relaxed flex-1"
          style={{ color: "rgba(0,0,0,0.5)" }}
        >
          {step.body}
        </p>

        {/* Progress bar if applicable */}
        {showProgress && (
          <div className="mt-4">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
              role="progressbar"
              aria-valuenow={step.pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: isSettled
                    ? "rgba(0,143,74,0.7)"
                    : "rgba(0,0,0,0.2)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: step.pct / 100 } : { scaleX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.07,
                  ease,
                }}
              />
            </div>
          </div>
        )}

        {/* Settled icon */}
        {isSettled && (
          <div className="mt-3 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="rgba(0,143,74,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[11px]" style={{ color: "rgba(0,143,74,0.7)" }}>
              Verifiable transaction
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LifecycleSection() {
  const flowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(flowRef, { once: true, amount: 0.1 });

  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(248,248,248)",
      }}
      aria-labelledby="lifecycle-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <BlurReveal className="mb-12 md:mb-16 max-w-[560px]">
          <p
            className="text-[11px] font-semibold tracking-widest uppercase mb-4"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            The full lifecycle
          </p>
          <h2
            id="lifecycle-heading"
            className="font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "rgba(0,0,0,0.875)",
            }}
          >
            From obligation to verified settlement.
          </h2>
          <p
            className="text-[15px] leading-relaxed"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            Every rent obligation follows the same clear path — from creation
            through funding to final settlement.
          </p>
        </BlurReveal>

        {/* Flow arrow */}
        <motion.div
          className="flex items-center gap-2 mb-8 overflow-x-auto pb-2"
          ref={flowRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.05 }}
          aria-hidden="true"
        >
          {lifecycleSteps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 shrink-0">
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: step.statusBg,
                  color: step.statusColor,
                }}
              >
                {step.label}
              </span>
              {i < lifecycleSteps.length - 1 && (
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 4h10M7 1l4 3-4 3"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          ref={gridRef}
        >
          {lifecycleSteps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
