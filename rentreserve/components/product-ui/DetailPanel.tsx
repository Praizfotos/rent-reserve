"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface DetailPanelProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  className?: string;
}

export default function DetailPanel({
  title,
  subtitle,
  badge,
  children,
  isOpen = true,
  className = "",
}: DetailPanelProps) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -4, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-xl border border-black/[0.06] bg-white ${className}`}
        >
          <div className="flex items-center justify-between border-b border-black/[0.04] px-5 py-3.5">
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold text-black/87">{title}</h3>
              {subtitle && (
                <p className="mt-0.5 text-[12px] text-black/45">{subtitle}</p>
              )}
            </div>
            {badge && <div className="ml-3 flex-shrink-0">{badge}</div>}
          </div>
          <div className="p-5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
