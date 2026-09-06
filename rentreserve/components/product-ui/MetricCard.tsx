"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  className?: string;
}

export default function MetricCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  className = "",
}: MetricCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-xl border border-black/[0.06] bg-white p-5 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[12px] font-medium tracking-wide text-black/45">{label}</p>
          <p className="mt-1.5 text-[24px] font-semibold leading-tight tracking-tight text-black/87">
            {value}
          </p>
          {change && (
            <p
              className={`mt-1 text-[12px] font-medium ${
                changeType === "positive"
                  ? "text-[rgba(0,143,74,0.81)]"
                  : changeType === "negative"
                  ? "text-[rgba(223,38,0,0.82)]"
                  : "text-black/45"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        {icon && <div className="ml-3 text-black/20">{icon}</div>}
      </div>
    </motion.div>
  );
}
