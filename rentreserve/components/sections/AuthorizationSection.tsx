"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const flowSteps = [
  { id: "tenant", label: "Tenant", sub: "Praise", icon: "person" },
  { id: "authorize", label: "Authorize", sub: "Fund Rent · ₦100,000", icon: "key" },
  { id: "soroban", label: "Soroban", sub: "Contract validates", icon: "contract" },
  { id: "stellar", label: "Stellar", sub: "Settlement network", icon: "network" },
  { id: "settled", label: "Settlement", sub: "Obligation updated", icon: "check" },
];

function NodeIcon({ type }: { type: string }) {
  if (type === "person") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "key") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9 9.5l5 5M12 12l-1.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "contract") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 6h4M6 9h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "network") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 2.5C6.5 4.5 6.5 11.5 8 13.5M8 2.5c1.5 2 1.5 9 0 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M2.5 8h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AuthFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative">
      {/* Desktop: horizontal flow */}
      <div className="hidden sm:flex items-center justify-between gap-0">
        {flowSteps.map((step, i) => {
          const isLast = i === flowSteps.length - 1;
          const isSettled = step.id === "settled";
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Node */}
              <motion.div
                className="flex flex-col items-center text-center shrink-0"
                style={{ minWidth: 72 }}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-2"
                  style={{
                    backgroundColor: isSettled
                      ? "rgba(0,143,74,0.08)"
                      : "rgba(0,0,0,0.05)",
                    border: isSettled
                      ? "1px solid rgba(0,143,74,0.2)"
                      : "1px solid rgba(0,0,0,0.08)",
                    color: isSettled ? "rgba(0,143,74,0.85)" : "rgba(0,0,0,0.5)",
                  }}
                >
                  <NodeIcon type={step.icon} />
                </div>
                <p
                  className="text-[12px] font-semibold leading-tight"
                  style={{ color: "rgba(0,0,0,0.75)" }}
                >
                  {step.label}
                </p>
                <p
                  className="text-[10px] leading-tight mt-0.5 max-w-[72px]"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                >
                  {step.sub}
                </p>
              </motion.div>

              {/* Connector */}
              {!isLast && (
                <div className="flex-1 mx-1 flex items-center" aria-hidden="true">
                  <motion.div
                    className="flex-1 h-px"
                    style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                    initial={{ scaleX: 0, originX: "left" }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.12, ease }}
                  />
                  <motion.svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.12 }}
                  >
                    <path d="M1 4h6M4 1l3 3-3 3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical flow */}
      <div className="flex sm:hidden flex-col gap-0">
        {flowSteps.map((step, i) => {
          const isLast = i === flowSteps.length - 1;
          const isSettled = step.id === "settled";
          return (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: isSettled ? "rgba(0,143,74,0.08)" : "rgba(0,0,0,0.05)",
                    border: isSettled ? "1px solid rgba(0,143,74,0.2)" : "1px solid rgba(0,0,0,0.08)",
                    color: isSettled ? "rgba(0,143,74,0.85)" : "rgba(0,0,0,0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.1, ease }}
                >
                  <NodeIcon type={step.icon} />
                </motion.div>
                {!isLast && (
                  <motion.div
                    className="w-px flex-1 my-1"
                    style={{ height: 28, backgroundColor: "rgba(0,0,0,0.08)" }}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.1, ease }}
                  />
                )}
              </div>
              <motion.div
                className="pt-1.5 pb-5"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.1, ease }}
              >
                <p className="text-[13px] font-semibold" style={{ color: "rgba(0,0,0,0.75)" }}>
                  {step.label}
                </p>
                <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {step.sub}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AuthorizationSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="auth-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Copy */}
          <div className="lg:col-span-5">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Authorization
              </p>
              <h2
                id="auth-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                Your money.{" "}
                <span style={{ color: "rgba(0,0,0,0.35)" }}>
                  Your authorization.
                </span>
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                RentReserve is designed so users authorize financial actions
                through their wallet rather than handing the platform
                unrestricted control of their funds.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  {
                    title: "Non-custodial by design",
                    body: "Funds move through user-authorized wallet actions, not platform-controlled accounts.",
                  },
                  {
                    title: "Each action is explicit",
                    body: "Every contribution and settlement requires a direct wallet authorization from the user.",
                  },
                  {
                    title: "Soroban enforces the rules",
                    body: "The financial state lives in a smart contract — not just in a database.",
                  },
                ].map((item, i) => (
                  <BlurReveal key={item.title} delay={0.1 + i * 0.1}>
                    <div
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "rgb(248,248,248)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <p
                        className="text-[13px] font-semibold mb-1"
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
                  </BlurReveal>
                ))}
              </div>
            </BlurReveal>
          </div>

          {/* Diagram */}
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
                <p
                  className="text-[11px] font-semibold tracking-widest uppercase mb-6"
                  style={{ color: "rgba(0,0,0,0.3)" }}
                >
                  How a contribution works
                </p>
                <AuthFlowDiagram />

                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.4)", maxWidth: 480 }}
                  >
                    RentReserve is an experimental software prototype. It does
                    not represent itself as a bank, lender, or licensed financial
                    institution. Production financial activity will require
                    appropriately licensed partners.
                  </p>
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
