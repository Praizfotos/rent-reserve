"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type BadgeVariant = "default" | "positive" | "negative" | "warning" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-black/[0.04] text-black/60",
  positive: "bg-[rgba(0,143,74,0.08)] text-[rgba(0,143,74,0.81)]",
  negative: "bg-[rgba(223,38,0,0.06)] text-[rgba(223,38,0,0.82)]",
  warning: "bg-[rgba(180,100,0,0.07)] text-[rgba(180,100,0,0.85)]",
  info: "bg-[rgba(0,100,180,0.07)] text-[rgba(0,100,180,0.85)]",
};

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}

export default function StatusBadge({
  variant = "default",
  children,
  className = "",
  pulse = false,
}: StatusBadgeProps) {
  const prefersReduced = useReducedMotion();

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-none tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{
            background: variant === "positive" ? "rgba(0,143,74,0.81)" :
              variant === "negative" ? "rgba(223,38,0,0.82)" :
              variant === "warning" ? "rgba(180,100,0,0.85)" :
              "rgba(0,100,180,0.85)",
          }}
          animate={prefersReduced ? {} : { opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {children}
    </span>
  );
}
