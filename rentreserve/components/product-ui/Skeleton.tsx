"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = "", count = 1 }: SkeletonProps) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-md bg-black/[0.04] ${className}`}
        >
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      ))}
    </>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-black/[0.06] bg-white p-5 ${className}`}>
      <Skeleton className="mb-3 h-3 w-20" />
      <Skeleton className="mb-2 h-5 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg border border-black/[0.04] p-3">
          <Skeleton className="h-4 w-4 flex-shrink-0 rounded" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}
