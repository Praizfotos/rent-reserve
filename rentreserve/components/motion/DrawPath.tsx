"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface DrawPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  className?: string;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export default function DrawPath({
  d,
  stroke = "rgba(0,0,0,0.875)",
  strokeWidth = 1.5,
  delay = 0,
  duration = 0.8,
  className = "",
  viewBox = "0 0 100 100",
  width = "100%",
  height = "100%",
  fill = "none",
}: DrawPathProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2, delay },
        }}
      />
    </svg>
  );
}
