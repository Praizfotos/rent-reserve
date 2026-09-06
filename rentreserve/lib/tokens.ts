export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.18,
    normal: 0.3,
    moderate: 0.45,
    slow: 0.65,
    hero: 0.8,
    sequence: 1.2,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    enter: [0.16, 1, 0.3, 1] as const,
    exit: [0.7, 0, 0.84, 0] as const,
    smooth: [0.22, 1, 0.36, 1] as const,
  },
  blur: {
    none: 0,
    subtle: 4,
    medium: 8,
    heavy: 12,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    loose: 0.12,
    slow: 0.18,
  },
} as const;

export type MotionToken = typeof motion;
