"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "./tokens";

export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion,
    duration: shouldReduceMotion ? 0 : motion.duration,
    ease: motion.ease,
    blur: shouldReduceMotion ? 0 : motion.blur,
    distance: shouldReduceMotion ? 0 : motion.distance,
    stagger: shouldReduceMotion ? 0 : motion.stagger,
  };
}

export function getRevealProps(config: {
  duration?: number;
  delay?: number;
  y?: number;
  blur?: number;
}) {
  const { duration = motion.duration.slow, delay = 0, y = motion.distance.md, blur = motion.blur.medium } = config;
  return {
    initial: { opacity: 0, y, filter: `blur(${blur}px)` },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration, delay, ease: motion.ease.standard },
  };
}
