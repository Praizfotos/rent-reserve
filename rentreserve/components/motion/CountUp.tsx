"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  from,
  to,
  duration = 1.2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? to : from);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const timeout = setTimeout(() => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();

      function tick(now: number) {
        const elapsed = (now - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = from + (to - from) * eased;
        setValue(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration, delay, prefersReduced]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
