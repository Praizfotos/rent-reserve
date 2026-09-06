"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode[];
  stagger?: number;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  itemClassName?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "ol";
}

export default function StaggerReveal({
  children,
  stagger = 0.08,
  delay = 0,
  duration = 0.6,
  y = 18,
  className = "",
  itemClassName = "",
  once = true,
  amount = 0.15,
  as: Tag = "div",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once, amount });

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          initial={{ opacity: 0, filter: "blur(6px)", y }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </Tag>
  );
}
