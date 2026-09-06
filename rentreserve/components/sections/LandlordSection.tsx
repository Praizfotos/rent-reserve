"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const statusFlow = [
  { id: "preparing", label: "Preparing", pct: 0, color: "rgba(0,0,0,0.3)", bgColor: "rgba(0,0,0,0.05)" },
  { id: "funding", label: "Partially funded", pct: 45, color: "rgba(180,100,0,0.8)", bgColor: "rgba(180,100,0,0.07)" },
  { id: "progressing", label: "78% funded", pct: 78, color: "rgba(0,100,180,0.8)", bgColor: "rgba(0,100,180,0.07)" },
  { id: "ready", label: "Fully funded", pct: 100, color: "rgba(0,143,74,0.85)", bgColor: "rgba(0,143,74,0.08)" },
  { id: "settled", label: "Settled ✓", pct: 100, color: "rgba(0,143,74,0.9)", bgColor: "rgba(0,143,74,0.1)", settled: true },
];

function LandlordCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [stateIndex, setStateIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setStateIndex((i) => (i + 1) % statusFlow.length);
    }, 2400);
    return () => clearInterval(t);
  }, [inView]);

  const current = statusFlow[stateIndex];

  return (
    <div
      ref={ref}
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
          Tenancy overview
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25, ease }}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: current.bgColor, color: current.color }}
          >
            {current.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="p-5">
        {/* Tenant info */}
        <div
          className="flex items-center gap-3 mb-5 p-3.5 rounded-xl"
          style={{ backgroundColor: "rgba(0,0,0,0.025)", border: "1px solid rgba(0,0,0,0.05)" }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[13px] font-semibold"
            style={{ backgroundColor: "rgba(0,0,0,0.07)", color: "rgba(0,0,0,0.5)" }}
          >
            PF
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold" style={{ color: "rgba(0,0,0,0.875)" }}>
              Praise Francis
            </p>
            <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>
              2-bedroom apartment · Lagos
            </p>
          </div>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: current.settled ? "rgba(0,143,74,0.7)" : "rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Rent row */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Rent obligation", value: "₦1,200,000" },
            { label: "Due date", value: "Aug 31, 2027" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl"
              style={{ backgroundColor: "rgba(0,0,0,0.025)", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <p className="text-[10px] mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>
                {item.label}
              </p>
              <p className="text-[14px] font-semibold" style={{ color: "rgba(0,0,0,0.875)" }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>
              Funding progress
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={current.pct}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[13px] font-semibold tabular-nums"
                style={{ color: current.color }}
              >
                {current.pct}%
              </motion.span>
            </AnimatePresence>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
            role="progressbar"
            aria-valuenow={current.pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: current.color, transformOrigin: "left" }}
              animate={{ scaleX: current.pct / 100 }}
              transition={{ duration: 0.7, ease }}
            />
          </div>
        </div>

        {/* History */}
        <div
          className="rounded-xl overflow-hidden border mb-5"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div
            className="px-4 py-2 border-b"
            style={{ borderColor: "rgba(0,0,0,0.05)", backgroundColor: "rgba(0,0,0,0.02)" }}
          >
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.3)" }}>
              Verified payment activity
            </p>
          </div>
          {[
            { date: "Aug 02", amount: "₦100,000", confirmed: true },
            { date: "Jul 12", amount: "₦200,000", confirmed: true },
            { date: "Jun 03", amount: "₦150,000", confirmed: true },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-b last:border-b-0"
              style={{ borderColor: "rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "rgba(0,143,74,0.6)" }}
                />
                <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>
                  {tx.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium tabular-nums" style={{ color: "rgba(0,0,0,0.7)" }}>
                  {tx.amount}
                </span>
                {tx.confirmed && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="rgba(0,143,74,0.7)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Settlement state */}
        <AnimatePresence mode="wait">
          {current.settled ? (
            <motion.div
              key="settled"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: "rgba(0,143,74,0.06)", border: "1px solid rgba(0,143,74,0.15)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(0,143,74,0.12)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7l3 3 6-6" stroke="rgba(0,143,74,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: "rgba(0,143,74,0.9)" }}>
                  Rent settled
                </p>
                <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>
                  ₦1,200,000 · Aug 20, 2027 · Receipt available
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-xl"
              style={{ backgroundColor: "rgba(0,0,0,0.025)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>
                Awaiting full settlement · Due Aug 31, 2027
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LandlordSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      id="landlords"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(248,248,248)",
      }}
      aria-labelledby="landlord-heading"
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
                For landlords
              </p>
              <h2
                id="landlord-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                Know where the obligation stands.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                See the status of an agreed rent obligation, watch the funding
                progress build in real time, receive settlement confirmation,
                and keep a clear verified record of payments.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "Visibility without complexity",
                    body: "Landlords see funding progress without needing to understand wallets or blockchain.",
                  },
                  {
                    title: "Settlement confirmation",
                    body: "The moment the tenant settles, the landlord's view updates immediately.",
                  },
                  {
                    title: "Verifiable payment history",
                    body: "Every contribution and settlement is linked to a verifiable transaction.",
                  },
                ].map((item, i) => (
                  <BlurReveal key={item.title} delay={0.1 + i * 0.1}>
                    <div className="flex gap-3.5">
                      <div
                        className="w-1 self-stretch rounded-full shrink-0"
                        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                      />
                      <div>
                        <p
                          className="text-[14px] font-semibold mb-1"
                          style={{ color: "rgba(0,0,0,0.875)" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-[13px] leading-relaxed"
                          style={{ color: "rgba(0,0,0,0.55)" }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </BlurReveal>
                ))}
              </div>

              {/* Status flow */}
              <BlurReveal delay={0.35}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {statusFlow.map((s) => (
                    <span
                      key={s.id}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: s.bgColor, color: s.color }}
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </BlurReveal>
            </BlurReveal>
          </div>

          {/* Card */}
          <div className="lg:col-span-7">
            <BlurReveal delay={0.12}>
              <LandlordCard />
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
