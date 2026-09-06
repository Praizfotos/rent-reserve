"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
  delay?: number;
  duration?: number;
  height?: number;
  className?: string;
  label?: string;
}

export default function ProgressBar({
  percent,
  delay = 0.3,
  duration,
  height = 6,
  className,
  label,
}: ProgressBarProps) {
  const prefersReduced = useReducedMotion();
  const resolvedDuration = prefersReduced ? 0 : (duration ?? 1.0);

  return (
    <motion.div
      className={className}
      style={{ height }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${percent}% complete`}
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: 9999 }}
      >
        <motion.div
          className="absolute inset-0 origin-left"
          style={{
            background: "rgba(0, 143, 74, 0.81)",
            borderRadius: 9999,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: percent / 100 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            delay,
            duration: resolvedDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
