"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

export default function BlurReveal({
  children,
  delay = 0,
  duration,
  y,
  blur,
  once = true,
  amount = 0.15,
  className,
}: BlurRevealProps) {
  const prefersReduced = useReducedMotion();

  const resolvedDuration = prefersReduced ? 0 : (duration ?? 0.65);
  const resolvedY = prefersReduced ? 0 : (y ?? 20);
  const resolvedBlur = prefersReduced ? 0 : (blur ?? 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: resolvedY, filter: `blur(${resolvedBlur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: resolvedDuration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
