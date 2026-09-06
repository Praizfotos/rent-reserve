"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function WordReveal({
  text,
  className = "",
  stagger = 0.055,
  delay = 0,
  duration = 0.55,
  once = true,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
          initial={{ opacity: 0, filter: "blur(8px)", y: 16 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
