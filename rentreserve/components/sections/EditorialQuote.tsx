"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

// Split quote into word groups for staggered reveal
const quoteChunks = [
  "The goal isn't to change",
  "how rent works.",
  "It's to give people",
  "more time to prepare for it.",
];

export default function EditorialQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 border-t border-b"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-label="Editorial statement"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[760px]">
          {/* Opening mark */}
          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.05, ease }}
            aria-hidden="true"
          >
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="none"
            >
              <path
                d="M0 24V14.4C0 10.08 1.28 6.56 3.84 3.84 6.4 1.28 9.92 0 14.4 0v4.8c-2.24 0-3.84.64-4.8 1.92C8.64 7.68 8 9.44 8 11.68V12h6.4V24H0zm17.6 0V14.4c0-4.32 1.28-7.84 3.84-10.56C24 1.28 27.52 0 32 0v4.8c-2.24 0-3.84.64-4.8 1.92-.96 1.44-1.6 3.2-1.6 5.44V12H32V24H17.6z"
                fill="rgba(0,0,0,0.08)"
              />
            </svg>
          </motion.div>

          {/* Quote text — serif, grouped chunks */}
          <blockquote>
            <p
              className="font-serif leading-tight mb-8"
              style={{
                fontSize: "clamp(28px, 3.8vw, 44px)",
                color: "rgba(0,0,0,0.875)",
                letterSpacing: "-0.01em",
              }}
            >
              {quoteChunks.map((chunk, i) => (
                <motion.span
                  key={i}
                  className="inline"
                  initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                  animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + i * 0.12,
                    ease,
                  }}
                >
                  {chunk}{" "}
                </motion.span>
              ))}
            </p>

            {/* Hairline divider */}
            <motion.div
              className="w-12 h-px mb-6"
              style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
              initial={{ scaleX: 0, originX: "left" }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease }}
              aria-hidden="true"
            />

            {/* Attribution */}
            <motion.figcaption
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8, ease }}
            >
              <p
                className="text-[14px]"
                style={{ color: "rgba(0,0,0,0.45)" }}
              >
                RentReserve product principle
              </p>
            </motion.figcaption>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
