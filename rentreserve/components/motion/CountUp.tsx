"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({
  from = 0,
  to,
  duration = 1.2,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  format,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now() + delay * 1000;
    let raf: number;

    function update(now: number) {
      if (now < startTime) {
        raf = requestAnimationFrame(update);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = easeOut(progress);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(update);
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration, delay]);

  const display = format ? format(value) : value.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
