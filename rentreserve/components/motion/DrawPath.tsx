"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

interface DrawPathProps {
  d: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  delay?: number;
  duration?: number;
}

export default function DrawPath({
  d,
  className,
  strokeWidth = 1.5,
  stroke = "rgba(0,0,0,0.12)",
  delay = 0,
  duration,
}: DrawPathProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const resolvedDuration = prefersReduced ? 0 : (duration ?? 0.8);

  return (
    <motion.path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{
        pathLength: { delay, duration: resolvedDuration, ease: [0.22, 1, 0.36, 1] },
        opacity: { delay, duration: 0.2 },
      }}
      className={className}
    />
  );
}
