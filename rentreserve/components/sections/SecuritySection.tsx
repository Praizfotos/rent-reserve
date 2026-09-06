"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    number: "01",
    title: "User-controlled",
    body: "Financial actions require explicit user authorization through their wallet. The platform does not hold or move funds independently.",
    icon: "shield",
  },
  {
    number: "02",
    title: "Minimal on-chain data",
    body: "Sensitive personal information — names, addresses, documents, contact details — stays in the application database, not on a public ledger.",
    icon: "lock",
  },
  {
    number: "03",
    title: "Transparent settlement",
    body: "Important financial state transitions happen on Stellar, where they can be independently verified by either party via the network explorer.",
    icon: "check",
  },
];

const valueLoop = [
  { label: "Know", sub: "Know what you owe", icon: "eye" },
  { label: "Plan", sub: "Know when it's due", icon: "calendar" },
  { label: "Prepare", sub: "Fund it gradually", icon: "plus" },
  { label: "Remember", sub: "Get reminded", icon: "bell" },
  { label: "Settle", sub: "Pay the balance", icon: "arrow" },
  { label: "Verify", sub: "Both parties have proof", icon: "check" },
];

function SecurityIcon({ type }: { type: string }) {
  if (type === "shield") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L3 4.5v4.5c0 4 2.7 7.5 6 8.5 3.3-1 6-4.5 6-8.5V4.5L9 2z" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6 9l2 2 4-4" stroke="rgba(0,143,74,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "lock") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3.5" y="8" width="11" height="8" rx="2" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" />
        <path d="M5.5 8V6a3.5 3.5 0 0 1 7 0v2" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="12" r="1.2" fill="rgba(0,0,0,0.35)" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6.5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.4" />
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="rgba(0,143,74,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoopIcon({ type }: { type: string }) {
  const stroke = "rgba(0,0,0,0.45)";
  if (type === "eye") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke={stroke} strokeWidth="1.3" />
        <circle cx="7" cy="7" r="1.8" stroke={stroke} strokeWidth="1.3" />
      </svg>
    );
  }
  if (type === "calendar") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1.5" y="3" width="11" height="9.5" rx="1.5" stroke={stroke} strokeWidth="1.3" />
        <path d="M5 1.5V4M9 1.5V4M1.5 6.5h11" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "plus") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 2v10M2 7h10" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "bell") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1.5a4 4 0 0 1 4 4v3.5l1 1H2l1-1V5.5a4 4 0 0 1 4-4z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M5.5 10.5a1.5 1.5 0 0 0 3 0" stroke={stroke} strokeWidth="1.3" />
      </svg>
    );
  }
  if (type === "arrow") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7l3 3 6-6" stroke="rgba(0,143,74,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SecuritySection() {
  const loopRef = useRef<HTMLDivElement>(null);
  const loopInView = useInView(loopRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* Value loop */}
      <section
        className="py-20 md:py-24 border-t"
        style={{
          borderColor: "rgba(0,0,0,0.06)",
          backgroundColor: "rgb(248,248,248)",
        }}
        aria-labelledby="value-loop-heading"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <BlurReveal className="mb-12">
            <h2
              id="value-loop-heading"
              className="font-semibold tracking-tight"
              style={{
                fontSize: "clamp(22px, 2.5vw, 32px)",
                letterSpacing: "-0.02em",
                color: "rgba(0,0,0,0.875)",
              }}
            >
              The complete rent preparation loop.
            </h2>
          </BlurReveal>

          <div
            ref={loopRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {valueLoop.map((step, i) => (
              <motion.div
                key={step.label}
                className="flex flex-col items-center text-center p-4 rounded-2xl"
                style={{
                  backgroundColor: "white",
                  boxShadow:
                    "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={loopInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.07, ease }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    backgroundColor:
                      step.label === "Verify"
                        ? "rgba(0,143,74,0.08)"
                        : "rgba(0,0,0,0.04)",
                  }}
                >
                  <LoopIcon type={step.icon} />
                </div>
                <p
                  className="text-[13px] font-semibold mb-0.5"
                  style={{ color: "rgba(0,0,0,0.875)" }}
                >
                  {step.label}
                </p>
                <p
                  className="text-[11px] leading-snug"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  {step.sub}
                </p>
                {i < valueLoop.length - 1 && (
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security / trust */}
      <section
        className="py-20 md:py-28 border-t"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
        aria-labelledby="security-heading"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <BlurReveal className="mb-12 max-w-[480px]">
            <p
              className="text-[11px] font-semibold tracking-widest uppercase mb-4"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              Security
            </p>
            <h2
              id="security-heading"
              className="font-semibold tracking-tight mb-4"
              style={{
                fontSize: "clamp(26px, 3vw, 38px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "rgba(0,0,0,0.875)",
              }}
            >
              Built around clear financial boundaries.
            </h2>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              No fabricated certifications. No vague "military grade" claims.
              Three principles that actually govern how the product is designed.
            </p>
          </BlurReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <BlurReveal key={p.number} delay={0.08 + i * 0.1}>
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    backgroundColor: "rgb(252,252,252)",
                    boxShadow:
                      "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                    >
                      <SecurityIcon type={p.icon} />
                    </div>
                    <span
                      className="text-[11px] font-semibold tabular-nums"
                      style={{ color: "rgba(0,0,0,0.2)" }}
                    >
                      {p.number}
                    </span>
                  </div>
                  <p
                    className="text-[15px] font-semibold mb-2"
                    style={{ color: "rgba(0,0,0,0.875)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.5)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </BlurReveal>
            ))}
          </div>

          {/* Disclaimer */}
          <BlurReveal delay={0.35}>
            <p
              className="mt-10 text-[12px] leading-relaxed"
              style={{ color: "rgba(0,0,0,0.35)", maxWidth: 680 }}
            >
              RentReserve is an experimental software and protocol product. It
              is not a bank, lender, deposit-taking institution or financial
              adviser. Production payment and custody functionality will depend
              on applicable regulatory requirements and appropriately licensed
              partners.
            </p>
          </BlurReveal>
        </div>
      </section>
    </>
  );
}
