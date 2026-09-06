"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";
import ProgressBar from "@/components/motion/ProgressBar";

const historyItems = [
  { date: "Aug 02", amount: "₦100,000", pct: 8 },
  { date: "Jul 12", amount: "₦200,000", pct: 17 },
  { date: "Jun 03", amount: "₦150,000", pct: 13 },
  { date: "May 18", amount: "₦100,000", pct: 8 },
  { date: "Apr 24", amount: "₦200,000", pct: 17 },
  { date: "Mar 05", amount: "₦186,000", pct: 16 },
];

const ease = [0.22, 1, 0.36, 1] as const;

function RentReserveCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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
          Rent Reserve
        </p>
        <span
          className="text-[11px] font-medium rounded-full px-2 py-0.5"
          style={{
            backgroundColor: "rgba(0,143,74,0.08)",
            color: "rgba(0,143,74,0.9)",
          }}
        >
          Active
        </span>
      </div>

      <div className="p-5">
        {/* Amount */}
        <motion.p
          className="text-[40px] font-semibold tracking-tight leading-none mb-1"
          style={{ color: "rgba(0,0,0,0.875)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease }}
        >
          ₦1,200,000
        </motion.p>
        <p
          className="text-[13px] mb-5"
          style={{ color: "rgba(0,0,0,0.45)" }}
        >
          Sep 2026 – Aug 2027
        </p>

        {/* Progress */}
        <div className="mb-2">
          <div className="flex justify-between mb-2">
            <span
              className="text-[13px] font-semibold"
              style={{ color: "rgba(0,0,0,0.875)" }}
            >
              78% funded
            </span>
            <span
              className="text-[13px]"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              ₦264,000 remaining
            </span>
          </div>
          <ProgressBar percent={78} height={5} delay={0.4} />
        </div>

        <div
          className="flex gap-5 mt-4 pt-4 mb-5 border-t"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div>
            <p className="text-[11px] mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>Funded</p>
            <p className="text-[15px] font-semibold" style={{ color: "rgba(0,0,0,0.875)" }}>₦936,000</p>
          </div>
          <div>
            <p className="text-[11px] mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>Due</p>
            <p className="text-[15px] font-semibold" style={{ color: "rgba(0,0,0,0.875)" }}>Aug 31, 2027</p>
          </div>
          <div className="ml-auto">
            <p className="text-[11px] mb-0.5" style={{ color: "rgba(0,0,0,0.35)" }}>Recommended</p>
            <p className="text-[15px] font-semibold" style={{ color: "rgba(0,0,0,0.875)" }}>₦88,000/mo</p>
          </div>
        </div>

        {/* History */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div
            className="px-4 py-2.5 border-b"
            style={{ borderColor: "rgba(0,0,0,0.05)", backgroundColor: "rgba(0,0,0,0.02)" }}
          >
            <p
              className="text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Funding history
            </p>
          </div>
          {historyItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between px-4 py-2.5 border-b last:border-b-0"
              style={{ borderColor: "rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.08, ease }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "rgba(0,143,74,0.6)" }}
                />
                <span className="text-[12px]" style={{ color: "rgba(0,0,0,0.45)" }}>
                  {item.date}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "rgba(0,0,0,0.2)", transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: item.pct / 20 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease }}
                  />
                </div>
                <span
                  className="text-[12px] font-medium tabular-nums"
                  style={{ color: "rgba(0,0,0,0.7)" }}
                >
                  {item.amount}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2 rounded-xl text-[13px] font-medium text-white transition-colors"
            style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
          >
            Add funds
          </button>
          <button
            className="flex-1 py-2 rounded-xl text-[13px] font-medium border transition-colors"
            style={{
              color: "rgba(0,0,0,0.608)",
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            Settle early
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RentReserveSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="rent-reserve-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — product */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <BlurReveal delay={0.1}>
              <RentReserveCard />
            </BlurReveal>
          </div>

          {/* Right — copy */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                The Rent Reserve
              </p>
              <h2
                id="rent-reserve-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                Turn one big payment into something you can prepare for.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                Create a rent obligation once. Then contribute toward it
                whenever you can. The system tracks your progress, calculates
                your pace, and tells you exactly where you stand.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: "target",
                    title: "One obligation, many contributions",
                    body: "Every payment you make is tracked against the same rent target.",
                  },
                  {
                    icon: "clock",
                    title: "Deadline-aware from day one",
                    body: "The system always knows your due date and how much time remains.",
                  },
                  {
                    icon: "check",
                    title: "Settle when ready",
                    body: "Once funded, settle the obligation in a single wallet-authorized action.",
                  },
                ].map((item, i) => (
                  <BlurReveal key={item.title} delay={0.1 + i * 0.1}>
                    <div className="flex gap-3.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <FeatureIcon type={item.icon} />
                      </div>
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
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ type }: { type: string }) {
  if (type === "target") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.3" />
        <circle cx="7" cy="7" r="2" fill="rgba(0,0,0,0.4)" />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.3" />
        <path d="M7 4.5V7l2 1.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7l3 3 6-6" stroke="rgba(0,143,74,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
