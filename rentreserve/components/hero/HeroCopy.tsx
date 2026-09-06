"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WordReveal from "@/components/motion/WordReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroCopy() {
  return (
    <div className="flex flex-col items-start">
      {/* Eyebrow */}
      <motion.p
        className="text-[13px] font-medium flex items-center gap-2 mb-6"
        style={{ color: "rgba(0,0,0,0.45)" }}
        initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ backgroundColor: "rgba(0,143,74,0.7)" }}
        />
        A calmer way to prepare for rent
      </motion.p>

      {/* Headline */}
      <h1
        className="font-semibold tracking-tight mb-6 leading-none"
        style={{
          fontSize: "clamp(42px, 5.5vw, 64px)",
          letterSpacing: "-0.03em",
          maxWidth: 660,
          color: "rgba(0,0,0,0.875)",
        }}
      >
        <WordReveal text="Prepare for your" delay={0.1} />
        <br />
        <WordReveal text="rent before" delay={0.28} />
        <br />
        <WordReveal text="rent day." delay={0.44} />
      </h1>

      {/* Description */}
      <motion.p
        className="text-[17px] leading-relaxed mb-8"
        style={{ color: "rgba(0,0,0,0.608)", maxWidth: 520 }}
        initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.65, delay: 0.52, ease }}
      >
        Set your rent target, fund it gradually, stay ahead of your deadline
        and settle when you&apos;re ready — without the last-minute scramble.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex items-center gap-3 flex-wrap mb-6"
        initial={{ opacity: 0, filter: "blur(8px)", y: 14 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.6, delay: 0.64, ease }}
      >
        <Link
          href="/app/dashboard"
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-white rounded-full px-5 py-2.5 transition-all duration-150 hover:bg-black hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
          style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
        >
          Open the app
          <ArrowRight />
        </Link>
        <a
          href="#how-it-works"
          className="inline-flex items-center text-[14px] px-4 py-2.5 transition-colors duration-150 hover:text-black/87 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
          style={{ color: "rgba(0,0,0,0.608)" }}
        >
          See how it works
        </a>
      </motion.div>

      {/* Trust line */}
      <motion.div
        className="flex items-center gap-4 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.78, ease }}
      >
        {[
          "Fund gradually",
          "Pay ahead",
          "Wallet-authorized settlement",
        ].map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 text-[12px]"
            style={{ color: "rgba(0,0,0,0.4)" }}
          >
            <CheckMark />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-150 group-hover:translate-x-0.5"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6l3 3 5-5"
        stroke="rgba(0,143,74,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
