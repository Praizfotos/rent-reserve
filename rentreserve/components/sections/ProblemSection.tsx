"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const monthlyBars = [
  { month: "Jan", value: 72, amount: "₦72k" },
  { month: "Feb", value: 85, amount: "₦85k" },
  { month: "Mar", value: 91, amount: "₦91k" },
  { month: "Apr", value: 64, amount: "₦64k" },
  { month: "May", value: 88, amount: "₦88k" },
  { month: "Jun", value: 95, amount: "₦95k" },
  { month: "Jul", value: 78, amount: "₦78k" },
  { month: "Aug", value: 82, amount: "₦82k" },
  { month: "Sep", value: 90, amount: "₦90k" },
  { month: "Oct", value: 70, amount: "₦70k" },
  { month: "Nov", value: 86, amount: "₦86k" },
  { month: "Dec", value: 79, amount: "₦79k" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function IncomeChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <p
        className="text-[11px] font-semibold tracking-widest uppercase mb-4"
        style={{ color: "rgba(0,0,0,0.35)" }}
      >
        Monthly income
      </p>
      <div className="flex items-end gap-1.5 h-24">
        {monthlyBars.map((bar, i) => (
          <div key={bar.month} className="flex flex-col items-center gap-1 flex-1">
            <motion.div
              className="w-full rounded-sm"
              style={{ backgroundColor: "rgba(0,0,0,0.10)" }}
              initial={{ scaleY: 0, originY: "bottom" }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + i * 0.05,
                ease,
              }}
              title={bar.amount}
            >
              <div
                style={{
                  height: `${bar.value * 0.9}px`,
                  maxHeight: "86px",
                  backgroundColor: "rgba(0,0,0,0.12)",
                  borderRadius: "2px 2px 0 0",
                }}
              />
            </motion.div>
            <span
              className="text-[9px]"
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              {bar.month.slice(0, 1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnualRentBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <p
        className="text-[11px] font-semibold tracking-widest uppercase mb-4"
        style={{ color: "rgba(0,0,0,0.35)" }}
      >
        Annual rent obligation
      </p>
      <div className="relative">
        <motion.div
          className="rounded-lg h-14 flex items-center justify-between px-4 overflow-hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          initial={{ scaleX: 0, originX: "left" }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <span
            className="text-[13px] font-semibold"
            style={{ color: "rgba(0,0,0,0.608)" }}
          >
            ₦1,200,000
          </span>
          <span
            className="text-[11px]"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            Due once · Aug 31
          </span>
        </motion.div>
        {/* Connector arrow */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.85 }}
          aria-hidden="true"
        >
          <div className="w-px h-4" style={{ backgroundColor: "rgba(0,0,0,0.12)" }} />
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1l3 3 3-3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function BridgeLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center mt-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.3, ease }}
    >
      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-2"
        style={{
          backgroundColor: "rgba(0,0,0,0.875)",
          color: "white",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[12px] font-medium">RentReserve bridges the gap</span>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <>
      {/* Introduction bridge */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: "rgb(248,248,248)" }}
        aria-label="Introduction"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <BlurReveal className="max-w-[680px]">
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-6"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Built for one simple problem
            </p>
            <p
              className="font-semibold leading-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                letterSpacing: "-0.025em",
                color: "rgba(0,0,0,0.875)",
              }}
            >
              Income arrives gradually.
            </p>
            <p
              className="font-semibold leading-tight"
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                letterSpacing: "-0.025em",
                color: "rgba(0,0,0,0.35)",
              }}
            >
              Rent often doesn&apos;t.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Problem visualization */}
      <section
        id="how-it-works"
        className="py-20 md:py-28 border-t"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
        aria-label="The problem"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — copy */}
            <div className="lg:col-span-5">
              <BlurReveal>
                <p
                  className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                >
                  The problem
                </p>
                <h2
                  className="font-semibold tracking-tight mb-5"
                  style={{
                    fontSize: "clamp(26px, 3vw, 36px)",
                    letterSpacing: "-0.025em",
                    color: "rgba(0,0,0,0.875)",
                    lineHeight: 1.1,
                  }}
                >
                  Rent shouldn&apos;t become a financial emergency every year.
                </h2>
                <p
                  className="text-[16px] leading-relaxed"
                  style={{ color: "rgba(0,0,0,0.608)" }}
                >
                  Your income may arrive every week or every month. Your rent
                  may still arrive as one large obligation. RentReserve helps
                  you bridge that gap before the deadline arrives.
                </p>
              </BlurReveal>

              {/* Three points */}
              <div className="mt-8 flex flex-col gap-4">
                {[
                  {
                    n: "01",
                    title: "Know what you owe",
                    body: "Create a rent obligation once and know exactly what's coming.",
                  },
                  {
                    n: "02",
                    title: "Fund it gradually",
                    body: "Contribute whatever amount works for you, as often as you like.",
                  },
                  {
                    n: "03",
                    title: "Settle before the deadline",
                    body: "When you're ready, settle the full obligation with one action.",
                  },
                ].map((item, i) => (
                  <BlurReveal key={item.n} delay={0.1 + i * 0.1}>
                    <div className="flex gap-4">
                      <span
                        className="text-[11px] font-semibold pt-0.5 shrink-0 tabular-nums"
                        style={{ color: "rgba(0,0,0,0.25)" }}
                      >
                        {item.n}
                      </span>
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
            </div>

            {/* Right — visualization */}
            <div className="lg:col-span-7">
              <BlurReveal delay={0.15}>
                <div
                  className="rounded-2xl p-6 md:p-8"
                  style={{
                    backgroundColor: "rgb(252,252,252)",
                    boxShadow:
                      "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                  }}
                >
                  <IncomeChart />

                  <div className="my-5 relative flex items-center" aria-hidden="true">
                    <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
                    <span
                      className="mx-3 text-[11px] px-2 py-0.5 rounded-full"
                      style={{
                        color: "rgba(0,0,0,0.35)",
                        backgroundColor: "rgba(0,0,0,0.04)",
                      }}
                    >
                      vs
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
                  </div>

                  <AnnualRentBar />
                  <BridgeLabel />
                </div>
              </BlurReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
