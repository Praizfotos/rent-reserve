"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProgressBar from "@/components/motion/ProgressBar";

const contributions = [
  { date: "Aug 02", amount: "₦100,000", delay: 0.8 },
  { date: "Jul 12", amount: "₦200,000", delay: 0.95 },
  { date: "Jun 03", amount: "₦150,000", delay: 1.1 },
  { date: "May 18", amount: "₦100,000", delay: 1.25 },
];

export default function HeroProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)", y: 20, scale: 0.98 }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }
          : {}
      }
      transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[600px] mx-auto lg:mx-0"
    >
      {/* Main product window */}
      <div
        className="relative rounded-2xl bg-white overflow-hidden"
        style={{
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.08) 0px 0px 0px 0.5px, rgba(0,0,0,0.04) 0px 8px 24px",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(0,143,74,0.08)",
                color: "rgba(0,143,74,0.9)",
              }}
            >
              Active
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-1"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Rent Reserve
              </p>
              <p
                className="text-[13px]"
                style={{ color: "rgba(0,0,0,0.45)" }}
              >
                Sep 2026 – Aug 2027
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-[11px] font-medium"
                style={{ color: "rgba(0,0,0,0.45)" }}
              >
                Due in
              </p>
              <p
                className="text-[18px] font-semibold tracking-tight"
                style={{ color: "rgba(0,0,0,0.875)" }}
              >
                68 days
              </p>
            </div>
          </div>

          {/* Main amount */}
          <div className="mb-4">
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-1"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Next Rent
            </p>
            <p
              className="text-[38px] font-semibold tracking-tight leading-none"
              style={{ color: "rgba(0,0,0,0.875)" }}
            >
              ₦1,200,000
            </p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[13px] font-medium"
                style={{ color: "rgba(0,0,0,0.608)" }}
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
            <ProgressBar percent={78} delay={0.9} duration={1.1} height={5} />
          </div>

          {/* Stats row */}
          <div
            className="flex gap-4 pb-4 mb-4 border-b"
            style={{ borderColor: "rgba(0,0,0,0.06)" }}
          >
            <div>
              <p
                className="text-[11px] font-medium mb-0.5"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Funded
              </p>
              <p
                className="text-[15px] font-semibold"
                style={{ color: "rgba(0,0,0,0.875)" }}
              >
                ₦936,000
              </p>
            </div>
            <div
              className="w-px self-stretch"
              style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
            />
            <div>
              <p
                className="text-[11px] font-medium mb-0.5"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Recommended pace
              </p>
              <p
                className="text-[15px] font-semibold"
                style={{ color: "rgba(0,0,0,0.875)" }}
              >
                ≈ ₦88,000 / month
              </p>
            </div>
          </div>

          {/* Contributions */}
          <div className="mb-4">
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-3"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Recent contributions
            </p>
            <div className="flex flex-col gap-2">
              {contributions.map((c, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: c.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "rgba(0,143,74,0.7)" }}
                    />
                    <span
                      className="text-[13px]"
                      style={{ color: "rgba(0,0,0,0.45)" }}
                    >
                      {c.date}
                    </span>
                  </div>
                  <span
                    className="text-[13px] font-medium tabular-nums"
                    style={{ color: "rgba(0,0,0,0.75)" }}
                  >
                    {c.amount}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            className="w-full py-2.5 rounded-xl text-[14px] font-medium text-white transition-colors"
            style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
            whileHover={{ backgroundColor: "#000", scale: 1.005 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.3 }}
          >
            Fund rent →
          </motion.button>
        </div>
      </div>

      {/* Notification card — floats outside the main window */}
      <RentNotification inView={inView} />
    </motion.div>
  );
}

function RentNotification({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="absolute -bottom-4 -left-4 sm:-left-6"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-xl bg-white px-3.5 py-3 w-[220px]"
        style={{
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.08) 0px 0px 0px 0.5px, rgba(0,0,0,0.06) 0px 6px 20px",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 5h6M5 2l3 3-3 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-[11px] font-semibold"
            style={{ color: "rgba(0,0,0,0.875)" }}
          >
            RentReserve
          </span>
          <span
            className="text-[10px] ml-auto"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            now
          </span>
        </div>
        <p
          className="text-[12px] font-medium mb-1"
          style={{ color: "rgba(0,0,0,0.875)" }}
        >
          30 days to rent day
        </p>
        <p
          className="text-[11px] leading-relaxed"
          style={{ color: "rgba(0,0,0,0.55)" }}
        >
          86% funded · ₦168,000 remaining
        </p>
        <button
          className="mt-2 text-[11px] font-medium"
          style={{ color: "rgba(0,0,0,0.875)" }}
        >
          Fund remaining →
        </button>
      </div>
    </motion.div>
  );
}
