"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const obligations = [
  { id: "rent", label: "Apartment Rent", sub: "Sep 2026 – Aug 2027", amount: 1_200_000, defaultChecked: true },
  { id: "service", label: "Service Charge", sub: "Annual levy", amount: 150_000, defaultChecked: true },
  { id: "maintenance", label: "Maintenance Fund", sub: "Optional", amount: 50_000, defaultChecked: false },
];

function BatchPaymentCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(obligations.map((o) => [o.id, o.defaultChecked]))
  );
  const [settled, setSettled] = useState(false);

  const selectedObligations = obligations.filter((o) => checked[o.id]);
  const total = selectedObligations.reduce((s, o) => s + o.amount, 0);
  const count = selectedObligations.length;

  function toggle(id: string) {
    if (settled) return;
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleSettle() {
    if (count === 0) return;
    setSettled(true);
  }

  function handleReset() {
    setSettled(false);
    setChecked(Object.fromEntries(obligations.map((o) => [o.id, o.defaultChecked])));
  }

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
        <p className="text-[12px] font-semibold tracking-widest uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
          Upcoming obligations
        </p>
        <AnimatePresence mode="wait">
          {settled ? (
            <motion.span
              key="settled"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(0,143,74,0.08)", color: "rgba(0,143,74,0.9)" }}
            >
              Settled ✓
            </motion.span>
          ) : (
            <motion.span
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.4)" }}
            >
              {count} selected
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5">
        {/* Obligations list */}
        <div className="flex flex-col gap-2 mb-5">
          {obligations.map((ob, i) => {
            const isChecked = checked[ob.id];
            return (
              <motion.button
                key={ob.id}
                onClick={() => toggle(ob.id)}
                disabled={settled}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.1, ease }}
                className="flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-150 w-full"
                style={{
                  backgroundColor: isChecked
                    ? "rgba(0,0,0,0.03)"
                    : "rgba(0,0,0,0.015)",
                  border: `1px solid ${isChecked ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)"}`,
                  cursor: settled ? "default" : "pointer",
                }}
                aria-pressed={isChecked}
                aria-label={`${isChecked ? "Deselect" : "Select"} ${ob.label}`}
              >
                {/* Checkbox */}
                <div
                  className="w-4.5 h-4.5 rounded flex items-center justify-center shrink-0 transition-all duration-200"
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: isChecked ? "rgba(0,0,0,0.875)" : "transparent",
                    border: `1.5px solid ${isChecked ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.2)"}`,
                    borderRadius: 5,
                  }}
                >
                  {isChecked && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: "rgba(0,0,0,0.875)" }}>
                    {ob.label}
                  </p>
                  <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>
                    {ob.sub}
                  </p>
                </div>

                {/* Amount */}
                <span
                  className="text-[13px] font-semibold tabular-nums shrink-0"
                  style={{ color: isChecked ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.3)" }}
                >
                  ₦{(ob.amount / 1000).toFixed(0)}k
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Divider + total */}
        <div
          className="flex items-center justify-between py-3 mb-4 border-t border-b"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <span className="text-[13px]" style={{ color: "rgba(0,0,0,0.45)" }}>
            Total · {count} obligation{count !== 1 ? "s" : ""}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={total}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease }}
              className="text-[18px] font-semibold tabular-nums"
              style={{ color: "rgba(0,0,0,0.875)" }}
            >
              ₦{total.toLocaleString()}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <AnimatePresence mode="wait">
          {settled ? (
            <motion.div
              key="settled-state"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col gap-2"
            >
              <div
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[14px] font-medium"
                style={{ backgroundColor: "rgba(0,143,74,0.08)", color: "rgba(0,143,74,0.9)" }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2.5 7l3 3 6-6" stroke="rgba(0,143,74,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All obligations settled
              </div>
              <button
                onClick={handleReset}
                className="text-[12px] text-center py-1"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Reset demo
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="settle-btn"
              onClick={handleSettle}
              disabled={count === 0}
              className="w-full py-2.5 rounded-xl text-[14px] font-medium text-white transition-all duration-150"
              style={{
                backgroundColor: count > 0 ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.15)",
                cursor: count === 0 ? "not-allowed" : "pointer",
              }}
              whileHover={count > 0 ? { backgroundColor: "#000", scale: 1.005 } : {}}
              whileTap={count > 0 ? { scale: 0.98 } : {}}
            >
              Review &amp; settle {count > 0 ? `₦${total.toLocaleString()}` : ""}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function BatchPaymentSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="batch-heading"
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
                Batch settlement
              </p>
              <h2
                id="batch-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                More than rent? Settle it together.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-8"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                When multiple obligations belong together, review them in one
                place and settle them as a batch. One review, one wallet
                authorization, one record.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { label: "Rent", amount: "₦1,200,000" },
                  { label: "Service Charge", amount: "₦150,000" },
                  { label: "Total", amount: "₦1,350,000", bold: true },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-2"
                    style={{
                      borderBottom: row.bold ? "none" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      className={`text-[14px] ${row.bold ? "font-semibold" : ""}`}
                      style={{ color: row.bold ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.55)" }}
                    >
                      {row.label}
                    </span>
                    <span
                      className={`text-[14px] tabular-nums ${row.bold ? "font-semibold" : ""}`}
                      style={{ color: row.bold ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.55)" }}
                    >
                      {row.amount}
                    </span>
                  </div>
                ))}
              </div>
            </BlurReveal>
          </div>

          {/* Interactive card */}
          <div className="lg:col-span-7">
            <BlurReveal delay={0.12}>
              <BatchPaymentCard />
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
