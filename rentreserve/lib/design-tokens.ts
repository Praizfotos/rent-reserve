export const designTokens = {
  color: {
    canvas: {
      default: "rgb(255, 255, 255)",
      subtle: "rgb(252, 252, 252)",
      muted: "rgb(248, 248, 248)",
      footer: "rgb(247, 247, 247)",
      dark: "rgb(20, 20, 20)",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.875)",
      secondary: "rgba(0, 0, 0, 0.608)",
      muted: "rgba(0, 0, 0, 0.45)",
      inverse: "rgba(255, 255, 255, 0.92)",
    },
    border: {
      hairline: "rgba(0, 0, 0, 0.06)",
      strong: "rgba(0, 0, 0, 0.10)",
      focus: "rgba(0, 0, 0, 0.35)",
    },
    accent: {
      positive: "rgba(0, 143, 74, 0.81)",
      positiveSubtle: "rgba(0, 143, 74, 0.08)",
      negative: "rgba(223, 38, 0, 0.82)",
      negativeSubtle: "rgba(223, 38, 0, 0.06)",
      warning: "rgba(180, 100, 0, 0.85)",
      warningSubtle: "rgba(180, 100, 0, 0.07)",
      info: "rgba(0, 100, 180, 0.85)",
      infoSubtle: "rgba(0, 100, 180, 0.07)",
    },
  },
  typography: {
    fontFamily: {
      sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    letterSpacing: {
      tighter: "-0.04em",
      tight: "-0.02em",
      snug: "-0.015em",
      normal: "0",
      wide: "0.05em",
    },
    lineHeight: {
      tighter: 0.98,
      tight: 1.15,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.65,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    "2xl": 48,
    "3xl": 64,
    "4xl": 96,
    "5xl": 128,
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 24,
    full: 9999,
  },
  shadow: {
    hairline: "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
    subtle: "0 1px 2px rgba(0,0,0,0.04)",
    card: "0 1px 3px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.06)",
    elevated: "0 4px 12px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.04)",
  },
  maxWidth: {
    page: 1280,
    content: 720,
    narrow: 580,
  },
  grid: {
    columns: 12,
    gutter: 24,
    gutterDesktop: 32,
  },
} as const;

export type DesignTokens = typeof designTokens;
