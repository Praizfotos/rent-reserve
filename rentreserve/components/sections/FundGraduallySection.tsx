"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const contributions = [
  { amount: 100_000, label: "₦100k", delay: 0.2 },
  { amount: 75_000, label: "₦75k", delay: 0.55 },
  { amount: 200_000, label: "₦200k", delay: 0.9 },
  { amount: 150_000, label: "₦150k", delay: 1.25 },
  { amount: 275_000, label: "₦275k", delay: 1.6 },
];

const total = contributions.reduce((s, c) => s + c.amount, 0); // 800_000
const target = 1_200_000;
const pct = Math.round((total / target) * 100); // 67

const ease = [0.22, 1, 0.36, 1] as const;

function ContributionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative">
      {/* Contribution pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {contributions.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.38, delay: c.delay, ease }}
          >
            <div
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
              style={{
                backgroundColor: "rgba(0,0,0,0.875)",
                color: "white",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] font-semibold tabular-nums">{c.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.9, ease }}
      >
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        <span className="text-[13px] font-medium" style={{ color: "rgba(0,0,0,0.35)" }}>
          Total funded
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
      </motion.div>

      {/* Running total */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 2.0, ease }}
        className="mb-4"
      >
        <div className="flex items-end justify-between mb-2">
          <span
            className="font-semibold tabular-nums"
            style={{
              fontSize: "clamp(28px, 3.5vw, 38px)",
              letterSpacing: "-0.03em",
              color: "rgba(0,0,0,0.875)",
            }}
          >
            ₦800,000
          </span>
          <span
            className="text-[14px] font-semibold mb-1"
            style={{ color: "rgba(0,143,74,0.8)" }}
          >
            {pct}% funded
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="relative h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.875)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: pct / 100 } : { scaleX: 0 }}
            transition={{ duration: 1.0, delay: 2.1, ease }}
          />
          {/* Segment markers */}
          {contributions.map((_, i) => {
            const markerPct = contributions
              .slice(0, i + 1)
              .reduce((s, c) => s + c.amount, 0) / target;
            return (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px"
                style={{
                  left: `${markerPct * 100}%`,
                  backgroundColor: "rgba(255,255,255,0.5)",
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 2.2 + i * 0.05 }}
              />
            );
          })}
        </div>

        <div className="flex justify-between mt-1.5">
          <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.35)" }}>
            ₦0
          </span>
          <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.35)" }}>
            Target ₦1,200,000
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function FundGraduallySection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(248,248,248)",
      }}
      aria-labelledby="fund-gradually-heading"
      id="tenants"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy — left */}
          <div className="lg:col-span-5">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Fund it your way
              </p>
              <h2
                id="fund-gradually-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                You don&apos;t need one perfect payment.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                Make one contribution, ten contributions, or whatever works for
                you. Every payment moves the same rent obligation forward. The
                system never loses track of where you stand.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Contribute ₦50k this month and ₦200k next month — it all counts.",
                  "No fixed schedule required. Contribute on your own terms.",
                  "Every contribution is linked to the same obligation and the same landlord.",
                ].map((point, i) => (
                  <BlurReveal key={i} delay={0.1 + i * 0.1}>
                    <div className="flex gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "rgba(0,143,74,0.1)" }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                          <path d="M1.5 4l2 2 3-3" stroke="rgba(0,143,74,0.8)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[14px] leading-relaxed" style={{ color: "rgba(0,0,0,0.608)" }}>
                        {point}
                      </p>
                    </div>
                  </BlurReveal>
                ))}
              </div>
            </BlurReveal>
          </div>

          {/* Visualization — right */}
          <div className="lg:col-span-7">
            <BlurReveal delay={0.12}>
              <div
                className="rounded-2xl bg-white p-6 md:p-8"
                style={{
                  boxShadow:
                    "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.07) 0px 0px 0px 0.5px, rgba(0,0,0,0.03) 0px 8px 24px",
                }}
              >
                <p
                  className="text-[11px] font-semibold tracking-widest uppercase mb-5"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                >
                  Contributions toward one obligation
                </p>
                <ContributionFlow />
                <div
                  className="mt-5 pt-5 border-t flex items-center justify-between"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <span className="text-[13px]" style={{ color: "rgba(0,0,0,0.45)" }}>
                    5 contributions · same obligation
                  </span>
                  <span
                    className="text-[12px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.05)",
                      color: "rgba(0,0,0,0.608)",
                    }}
                  >
                    ₦400,000 remaining
                  </span>
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
