"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col items-center justify-center py-16 text-center ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(223,38,0,0.06)]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="9" stroke="rgba(223,38,0,0.4)" strokeWidth="1.5" />
          <path d="M10 6v5M10 13v1" stroke="rgba(223,38,0,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-[15px] font-semibold text-black/87">{title}</h3>
      <p className="mt-1.5 max-w-[280px] text-[13px] leading-relaxed text-black/45">
        {description}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg border border-black/[0.06] bg-white px-4 py-2 text-[13px] font-medium text-black/87 transition-all duration-150 hover:bg-black/[0.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
        >
          Try again
        </button>
      )}
    </motion.div>
  );
}
