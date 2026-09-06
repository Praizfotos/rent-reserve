"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface FadePresenceProps {
  children: ReactNode;
  id: string | number;
  className?: string;
}

export default function FadePresence({
  children,
  id,
  className = "",
}: FadePresenceProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, filter: "blur(4px)", y: 6 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
