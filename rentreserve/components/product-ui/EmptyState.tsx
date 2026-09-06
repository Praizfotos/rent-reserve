"use client";

import { motion, useReducedMotion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.04] text-black/20">
          {icon}
        </div>
      )}
      <h3 className="text-[15px] font-semibold text-black/87">{title}</h3>
      <p className="mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-black/45">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
