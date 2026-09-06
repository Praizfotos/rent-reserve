"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadePresenceProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export default function FadePresence({ children, id, className }: FadePresenceProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      key={id}
      initial={prefersReduced ? false : { opacity: 0, filter: "blur(4px)", y: 6 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
