"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

export default function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  duration,
}: WordRevealProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const resolvedDuration = prefersReduced ? 0 : (duration ?? 0.55);
  const resolvedStagger = prefersReduced ? 0 : stagger;

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: resolvedStagger, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: resolvedDuration, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
