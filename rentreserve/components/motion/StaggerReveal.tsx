"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "ol";
  className?: string;
}

export default function StaggerReveal({
  children,
  stagger = 0.08,
  delay = 0,
  duration,
  y,
  blur,
  once = true,
  amount = 0.15,
  as = "div",
  className,
}: StaggerRevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] as React.ComponentType<React.HTMLAttributes<HTMLElement> & Record<string, unknown>>;

  const resolvedDuration = prefersReduced ? 0 : (duration ?? 0.6);
  const resolvedY = prefersReduced ? 0 : (y ?? 16);
  const resolvedBlur = prefersReduced ? 0 : (blur ?? 6);
  const resolvedStagger = prefersReduced ? 0 : stagger;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: resolvedStagger, delayChildren: delay } },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: resolvedY, filter: `blur(${resolvedBlur}px)` },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: resolvedDuration, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </Tag>
  );
}
