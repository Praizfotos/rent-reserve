"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const reminderStates = [
  {
    id: "90d",
    label: "90 days",
    tag: "Planning",
    tagColor: "rgba(0,0,0,0.35)",
    tagBg: "rgba(0,0,0,0.05)",
    title: "Your rent is due in 90 days",
    body: "₦400,000 remaining",
    sub: "You're 67% funded. You have time — start building your reserve.",
    funded: 67,
    action: "View reserve",
    accent: "rgba(0,0,0,0.3)",
  },
  {
    id: "60d",
    label: "60 days",
    tag: "On track",
    tagColor: "rgba(0,143,74,0.85)",
    tagBg: "rgba(0,143,74,0.08)",
    title: "You're 78% funded",
    body: "₦264,000 remaining",
    sub: "Good pace. Contribute ₦88,000/month to stay on track.",
    funded: 78,
    action: "Add funds",
    accent: "rgba(0,143,74,0.7)",
  },
  {
    id: "30d",
    label: "30 days",
    tag: "Stay focused",
    tagColor: "rgba(180,100,0,0.85)",
    tagBg: "rgba(180,100,0,0.07)",
    title: "Your rent is due next month",
    body: "₦168,000 remaining",
    sub: "86% funded. Suggested contribution: ₦84,000/fortnight.",
    funded: 86,
    action: "Fund remaining",
    accent: "rgba(180,100,0,0.7)",
  },
  {
    id: "7d",
    label: "7 days",
    tag: "Final stretch",
    tagColor: "rgba(180,50,0,0.85)",
    tagBg: "rgba(180,50,0,0.07)",
    title: "Your rent is due in 7 days",
    body: "₦80,000 remaining",
    sub: "93% funded. One more contribution settles your obligation.",
    funded: 93,
    action: "Pay remaining",
    accent: "rgba(180,50,0,0.7)",
  },
  {
    id: "done",
    label: "Settled",
    tag: "Complete",
    tagColor: "rgba(0,143,74,0.9)",
    tagBg: "rgba(0,143,74,0.08)",
    title: "Rent settled ✓",
    body: "₦1,200,000",
    sub: "Your obligation is fully settled. Receipt available.",
    funded: 100,
    action: "View receipt",
    accent: "rgba(0,143,74,0.7)",
  },
];

function PhoneNotification({ state }: { state: typeof reminderStates[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state.id}
        initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
        transition={{ duration: 0.35, ease }}
        className="absolute inset-x-0 bottom-6 mx-4"
      >
        <div
          className="rounded-2xl p-4 bg-white"
          style={{
            boxShadow:
              "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.1) 0px 0px 0px 0.5px, rgba(0,0,0,0.06) 0px 8px 24px",
          }}
        >
          {/* Notification header */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                <path d="M1 4.5h7M4.5 1l3.5 3.5L4.5 8" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[11px] font-semibold" style={{ color: "rgba(0,0,0,0.75)" }}>
              RentReserve
            </span>
            <span
              className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: state.tagBg, color: state.tagColor }}
            >
              {state.tag}
            </span>
          </div>

          {/* Body */}
          <p className="text-[13px] font-semibold mb-0.5" style={{ color: "rgba(0,0,0,0.875)" }}>
            {state.title}
          </p>
          <p className="text-[13px] font-medium mb-1" style={{ color: state.accent }}>
            {state.body}
          </p>
          <p className="text-[11px] leading-relaxed mb-3" style={{ color: "rgba(0,0,0,0.45)" }}>
            {state.sub}
          </p>

          {/* Mini progress */}
          <div className="mb-3">
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
              role="progressbar"
              aria-valuenow={state.funded}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: state.accent, transformOrigin: "left" }}
                animate={{ scaleX: state.funded / 100 }}
                transition={{ duration: 0.6, ease }}
              />
            </div>
          </div>

          <button
            className="text-[12px] font-semibold"
            style={{ color: "rgba(0,0,0,0.875)" }}
          >
            {state.action} →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function PhoneFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % reminderStates.length);
    }, 2800);
    return () => clearInterval(t);
  }, [inView]);

  const state = reminderStates[activeIndex];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15, ease }}
      className="relative mx-auto"
      style={{ width: 280, height: 440 }}
    >
      {/* Phone shell */}
      <div
        className="absolute inset-0 rounded-[2.5rem]"
        style={{
          backgroundColor: "rgb(252,252,252)",
          boxShadow:
            "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.10) 0px 0px 0px 0.5px, rgba(0,0,0,0.05) 0px 16px 48px",
        }}
      />
      {/* Screen */}
      <div
        className="absolute rounded-[2rem] overflow-hidden"
        style={{
          inset: "8px",
          backgroundColor: "rgb(248,248,248)",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 pt-3 pb-1"
          style={{ backgroundColor: "rgb(248,248,248)" }}
        >
          <span className="text-[10px] font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>
            9:41
          </span>
          <div
            className="w-16 h-4 rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          />
          <div className="flex items-center gap-1">
            {[3, 4, 5, 5].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full"
                style={{ height: h, backgroundColor: "rgba(0,0,0,0.25)" }}
              />
            ))}
          </div>
        </div>

        {/* App mini header */}
        <div className="px-4 pt-3 pb-2">
          <p
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            Rent Reserve
          </p>
          <p
            className="text-[22px] font-semibold tracking-tight"
            style={{ color: "rgba(0,0,0,0.875)" }}
          >
            ₦1,200,000
          </p>
        </div>

        {/* Mini progress strip */}
        <div className="px-4 mb-3">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "rgba(0,0,0,0.2)", transformOrigin: "left" }}
              animate={{ scaleX: state.funded / 100 }}
              transition={{ duration: 0.6, ease }}
            />
          </div>
        </div>

        {/* State indicator tabs */}
        <div className="flex items-center gap-1.5 px-4 mb-2">
          {reminderStates.map((s, i) => (
            <motion.button
              key={s.id}
              className="rounded-full transition-all"
              onClick={() => setActiveIndex(i)}
              animate={{
                width: i === activeIndex ? 20 : 6,
                backgroundColor:
                  i === activeIndex ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.12)",
              }}
              transition={{ duration: 0.3, ease }}
              style={{ height: 6 }}
              aria-label={`Show ${s.label} state`}
            />
          ))}
        </div>

        {/* Notification */}
        <PhoneNotification state={state} />
      </div>
    </motion.div>
  );
}

export default function RemindersSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="reminders-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Phone — left */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <PhoneFrame />
          </div>

          {/* Copy — right */}
          <div className="lg:col-span-7">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                Smart reminders
              </p>
              <h2
                id="reminders-heading"
                className="font-semibold tracking-tight mb-5"
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                A reminder that actually tells you what to do.
              </h2>
              <p
                className="text-[16px] leading-relaxed mb-10"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                RentReserve considers your deadline and funding progress, so
                reminders can show what&apos;s left — not just that rent is due.
              </p>
            </BlurReveal>

            {/* Reminder states grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reminderStates.map((s, i) => (
                <BlurReveal key={s.id} delay={0.08 + i * 0.07}>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "rgb(248,248,248)",
                      boxShadow:
                        "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: "rgba(0,0,0,0.4)" }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: s.tagBg, color: s.tagColor }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <p
                      className="text-[12px] font-medium leading-snug"
                      style={{ color: "rgba(0,0,0,0.75)" }}
                    >
                      {s.title}
                    </p>
                    <p
                      className="text-[11px] mt-1"
                      style={{ color: "rgba(0,0,0,0.4)" }}
                    >
                      {s.body}
                    </p>
                  </div>
                </BlurReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
