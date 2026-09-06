"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const timelineEvents = [
  {
    month: "Jan",
    amount: "₦100k",
    running: 100_000,
    pct: 8,
    status: "contribution",
    delay: 0.2,
  },
  {
    month: "Mar",
    amount: "₦250k",
    running: 350_000,
    pct: 29,
    status: "contribution",
    delay: 0.5,
  },
  {
    month: "May",
    amount: "₦300k",
    running: 650_000,
    pct: 54,
    status: "contribution",
    delay: 0.8,
  },
  {
    month: "Jul",
    amount: "₦350k",
    running: 1_000_000,
    pct: 83,
    status: "contribution",
    delay: 1.1,
  },
  {
    month: "Aug",
    amount: "₦200k",
    running: 1_200_000,
    pct: 100,
    status: "full",
    delay: 1.4,
  },
  {
    month: "Aug 20",
    amount: "Settled ✓",
    running: 1_200_000,
    pct: 100,
    status: "settled",
    delay: 1.75,
  },
];

function SettlementTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className="relative">
      {/* Vertical spine */}
      <div
        className="absolute left-[18px] top-4 bottom-4 w-px"
        style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 2.2, delay: 0.15, ease: "linear" }}
        />
      </div>

      <div className="flex flex-col gap-0">
        {timelineEvents.map((ev, i) => {
          const isSettled = ev.status === "settled";
          const isFull = ev.status === "full";

          return (
            <motion.div
              key={i}
              className="flex items-start gap-4 pb-4 last:pb-0"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: ev.delay, ease }}
            >
              {/* Node */}
              <div className="relative z-10 shrink-0 mt-0.5">
                {isSettled ? (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,143,74,0.1)", border: "1.5px solid rgba(0,143,74,0.4)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7l3 3 5-5" stroke="rgba(0,143,74,0.8)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : isFull ? (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(0,0,0,0.35)" }}>
                      {ev.month.slice(0, 1)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span
                      className="text-[12px] font-semibold"
                      style={{
                        color: isSettled
                          ? "rgba(0,143,74,0.9)"
                          : "rgba(0,0,0,0.875)",
                      }}
                    >
                      {ev.amount}
                    </span>
                    <span
                      className="ml-2 text-[11px]"
                      style={{ color: "rgba(0,0,0,0.35)" }}
                    >
                      {ev.month}
                    </span>
                  </div>
                  {!isSettled && (
                    <span
                      className="text-[11px] font-medium"
                      style={{
                        color: ev.pct === 100 ? "rgba(0,143,74,0.8)" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {ev.pct}%
                    </span>
                  )}
                </div>

                {/* Mini progress */}
                {!isSettled && (
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    role="progressbar"
                    aria-valuenow={ev.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          ev.pct === 100 ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.2)",
                        transformOrigin: "left",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: ev.pct / 100 } : { scaleX: 0 }}
                      transition={{ duration: 0.5, delay: ev.delay + 0.15, ease }}
                    />
                  </div>
                )}

                {isSettled && (
                  <p className="text-[11px]" style={{ color: "rgba(0,143,74,0.7)" }}>
                    Obligation complete · Receipt available
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function EarlySettlementCard() {
  return (
    <BlurReveal delay={0.15}>
      <div
        className="rounded-2xl bg-white overflow-hidden"
        style={{
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.07) 0px 0px 0px 0.5px, rgba(0,0,0,0.04) 0px 8px 24px",
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <p
            className="text-[12px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            Settlement timeline
          </p>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(0,143,74,0.08)",
              color: "rgba(0,143,74,0.9)",
            }}
          >
            Settled early
          </span>
        </div>

        <div className="p-5">
          <div
            className="mb-5 p-4 rounded-xl"
            style={{ backgroundColor: "rgba(0,143,74,0.05)", border: "1px solid rgba(0,143,74,0.12)" }}
          >
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "rgba(0,143,74,0.7)" }}
            >
              Rent fully funded
            </p>
            <p
              className="text-[28px] font-semibold tracking-tight leading-none mb-1"
              style={{ color: "rgba(0,0,0,0.875)" }}
            >
              ₦1,200,000
            </p>
            <p className="text-[13px]" style={{ color: "rgba(0,0,0,0.45)" }}>
              Aug 20 · 11 days before deadline
            </p>
          </div>

          <SettlementTimeline />

          <div
            className="mt-5 pt-4 border-t"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <div className="flex gap-2">
              <button
                className="flex-1 py-2.5 rounded-xl text-[13px] font-medium text-white"
                style={{ backgroundColor: "rgba(0,143,74,0.85)" }}
              >
                Settlement confirmed ✓
              </button>
              <button
                className="px-4 py-2.5 rounded-xl text-[13px] border"
                style={{
                  color: "rgba(0,0,0,0.45)",
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlurReveal>
  );
}

export default function EarlySettlementSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(248,248,248)",
      }}
      aria-labelledby="early-settlement-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-5">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Pay ahead
              </p>
              <h2
                id="early-settlement-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                When you&apos;re ready, settle early.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                Once you&apos;ve funded your rent, you don&apos;t have to wait
                for the deadline. Settle the obligation early and keep moving.
                The landlord sees confirmation immediately.
              </p>

              {/* Key points */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "No waiting required",
                    body: "Reach 100% funding at any time and settle straight away.",
                  },
                  {
                    title: "Landlord sees it immediately",
                    body: "The settlement status updates for both parties at once.",
                  },
                  {
                    title: "Receipt generated automatically",
                    body: "A verifiable record is created for both the tenant and landlord.",
                  },
                ].map((item, i) => (
                  <BlurReveal key={item.title} delay={0.1 + i * 0.1}>
                    <div
                      className="flex gap-4 p-4 rounded-xl"
                      style={{
                        backgroundColor: "white",
                        boxShadow:
                          "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "rgba(0,143,74,0.08)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="rgba(0,143,74,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p
                          className="text-[13px] font-semibold mb-0.5"
                          style={{ color: "rgba(0,0,0,0.875)" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-[12px] leading-relaxed"
                          style={{ color: "rgba(0,0,0,0.5)" }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </BlurReveal>
                ))}
              </div>
            </BlurReveal>
          </div>

          {/* Timeline card */}
          <div className="lg:col-span-7">
            <EarlySettlementCard />
          </div>
        </div>
      </div>
    </section>
  );
}
