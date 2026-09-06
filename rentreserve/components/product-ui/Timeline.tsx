"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  type?: "default" | "positive" | "warning" | "info";
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

const dotColors: Record<string, string> = {
  default: "bg-black/20",
  positive: "bg-[rgba(0,143,74,0.81)]",
  warning: "bg-[rgba(180,100,0,0.85)]",
  info: "bg-[rgba(0,100,180,0.85)]",
};

export default function Timeline({ events, className = "" }: TimelineProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative ${className}`} role="list" aria-label="Timeline">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.06]" />
      <div className="space-y-4">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            role="listitem"
            initial={prefersReduced ? false : { opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.4,
              delay: prefersReduced ? 0 : i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex gap-3 pl-5"
          >
            <div
              className={`absolute left-0 top-1.5 h-[14px] w-[14px] rounded-full border-2 border-white ${dotColors[event.type || "default"]}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[13px] font-medium text-black/87">{event.title}</p>
                <span className="text-[11px] text-black/35 flex-shrink-0">{event.time}</span>
              </div>
              {event.description && (
                <p className="mt-0.5 text-[12px] text-black/45">{event.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
