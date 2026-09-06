"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressBarProps {
  percent: number;
  delay?: number;
  duration?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  height?: number;
}

export default function ProgressBar({
  percent,
  delay = 0.3,
  duration = 1.0,
  className = "",
  trackClassName = "",
  fillClassName = "",
  height = 6,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{
        height,
        backgroundColor: "rgba(0,0,0,0.06)",
      }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full ${fillClassName}`}
        style={{ backgroundColor: "rgba(0,0,0,0.875)", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: percent / 100 } : { scaleX: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
