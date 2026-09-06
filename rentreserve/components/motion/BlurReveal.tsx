"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function BlurReveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 20,
  className = "",
  once = true,
  amount = 0.15,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", y }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
