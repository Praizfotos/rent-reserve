"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ActivityFeedItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
}

interface ActivityFeedProps {
  items: ActivityFeedItem[];
  className?: string;
}

export default function ActivityFeed({ items, className = "" }: ActivityFeedProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`space-y-0 ${className}`} role="list" aria-label="Activity feed">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          role="listitem"
          initial={prefersReduced ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            delay: prefersReduced ? 0 : i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex gap-3 border-b border-black/[0.04] py-3 last:border-0"
        >
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/30">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[13px] font-medium text-black/87 truncate">{item.title}</p>
              <span className="text-[11px] text-black/35 flex-shrink-0">{item.time}</span>
            </div>
            <p className="mt-0.5 text-[12px] text-black/45 truncate">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
