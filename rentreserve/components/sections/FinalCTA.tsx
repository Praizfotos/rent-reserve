"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 border-t"
      id="start"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(247,247,247)",
      }}
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[580px]">
          {/* Eyebrow */}
          <motion.p
            className="text-[11px] font-semibold tracking-widest uppercase mb-6"
            style={{ color: "rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.05, ease }}
          >
            Get started
          </motion.p>

          {/* Headline */}
          <motion.h2
            id="final-cta-heading"
            className="font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              color: "rgba(0,0,0,0.875)",
            }}
            initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
            animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease }}
          >
            Your next rent is already coming.
            <br />
            <span style={{ color: "rgba(0,0,0,0.35)" }}>
              Start preparing now.
            </span>
          </motion.h2>

          {/* Body */}
          <motion.p
            className="text-[16px] leading-relaxed mb-10"
            style={{ color: "rgba(0,0,0,0.55)", maxWidth: 480 }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.22, ease }}
          >
            Create your first rent reserve and turn a future payment into a plan.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-white rounded-full px-6 py-3 transition-all duration-150"
              style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#000";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,0,0,0.875)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Start a Rent Reserve
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M7 2.5l4.5 4L7 10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#product"
              className="text-[14px] px-4 py-3 transition-colors duration-150"
              style={{ color: "rgba(0,0,0,0.45)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.875)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.45)")
              }
            >
              Explore the product
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
