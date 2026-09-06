"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    label: "Programmable",
    title: "Financial state follows explicit rules",
    body: "The rent obligation's lifecycle — creation, funding, settlement — is enforced by a Soroban smart contract, not just application code.",
    icon: "contract",
  },
  {
    label: "Authorized",
    title: "Users approve the actions that move their funds",
    body: "Every funding and settlement action requires a direct wallet authorization. The platform cannot move funds without the user's explicit signature.",
    icon: "key",
  },
  {
    label: "Verifiable",
    title: "Settlement can be independently confirmed",
    body: "Important settlement events are recorded on Stellar and can be verified via the network's public transaction history.",
    icon: "verify",
  },
];

function ArchDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });

  const nodes = [
    { x: 100, y: 40, label: "RentReserve", sub: "App", r: 28 },
    { x: 240, y: 120, label: "Wallet", sub: "Authorization", r: 22 },
    { x: 100, y: 200, label: "Soroban", sub: "Contract", r: 24 },
    { x: -40, y: 120, label: "Stellar", sub: "Network", r: 22 },
  ];

  const edges = [
    { x1: 100, y1: 68, x2: 218, y2: 100 },
    { x1: 218, y1: 140, x2: 124, y2: 178 },
    { x1: 76, y1: 178, x2: -18, y2: 140 },
    { x1: -18, y1: 100, x2: 72, y2: 62 },
    { x1: 100, y1: 176, x2: 100, y2: 64 },
  ];

  return (
    <div className="relative flex justify-center">
      <svg
        ref={ref}
        viewBox="-80 10 360 220"
        width="100%"
        height={220}
        aria-label="Architecture diagram: RentReserve, Wallet, Soroban, Stellar"
      >
        {/* Edges */}
        {edges.map((e, i) => (
          <motion.line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={n.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.12, ease }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="white"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
            <text
              x={n.x}
              y={n.y - 3}
              textAnchor="middle"
              fontSize="8"
              fontWeight="600"
              fill="rgba(0,0,0,0.7)"
              fontFamily="Inter, sans-serif"
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y={n.y + 8}
              textAnchor="middle"
              fontSize="7"
              fill="rgba(0,0,0,0.35)"
              fontFamily="Inter, sans-serif"
            >
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function PillarIcon({ type }: { type: string }) {
  if (type === "contract") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="10" height="12" rx="2" stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" />
        <path d="M6 6h4M6 9h3" stroke="rgba(0,0,0,0.4)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "key") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6" cy="7" r="3.5" stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" />
        <path d="M9 9.5l5 5M12 12l-1.5 1.5" stroke="rgba(0,0,0,0.4)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2l1.5 3.5L13 6l-2.5 2.5.5 3.5L8 10l-3 2 .5-3.5L3 6l3.5-.5z" stroke="rgba(0,0,0,0.5)" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export default function StellarSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      id="developers"
      style={{
        borderColor: "rgba(0,0,0,0.06)",
        backgroundColor: "rgb(248,248,248)",
      }}
      aria-labelledby="stellar-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top — centered headline */}
        <BlurReveal className="max-w-[640px] mb-14 md:mb-20">
          <p
            className="text-[11px] font-semibold tracking-widest uppercase mb-4"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            Under the hood
          </p>
          <h2
            id="stellar-heading"
            className="font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "rgba(0,0,0,0.875)",
            }}
          >
            Programmable settlement, without the complexity.
          </h2>
          <p
            className="text-[16px] leading-relaxed"
            style={{ color: "rgba(0,0,0,0.608)" }}
          >
            RentReserve uses Stellar and Soroban to make rent obligations
            programmable, wallet-authorized and verifiable. The application
            handles the user experience; Soroban enforces the financial rules.
          </p>
        </BlurReveal>

        {/* Pillars + diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Three pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pillars.map((p, i) => (
              <BlurReveal key={p.label} delay={0.08 + i * 0.1}>
                <div
                  className="p-5 rounded-2xl h-full"
                  style={{
                    backgroundColor: "white",
                    boxShadow:
                      "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  >
                    <PillarIcon type={p.icon} />
                  </div>
                  <p
                    className="text-[11px] font-semibold tracking-widest uppercase mb-2"
                    style={{ color: "rgba(0,0,0,0.3)" }}
                  >
                    {p.label}
                  </p>
                  <p
                    className="text-[13px] font-semibold mb-2 leading-snug"
                    style={{ color: "rgba(0,0,0,0.875)" }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.5)" }}
                  >
                    {p.body}
                  </p>
                </div>
              </BlurReveal>
            ))}
          </div>

          {/* Architecture diagram */}
          <div className="lg:col-span-5">
            <BlurReveal delay={0.2}>
              <div
                className="rounded-2xl p-6 bg-white"
                style={{
                  boxShadow:
                    "rgba(0,0,0,0) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.06) 0px 0px 0px 0.5px",
                }}
              >
                <p
                  className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "rgba(0,0,0,0.3)" }}
                >
                  Architecture
                </p>
                <ArchDiagram />

                <div
                  className="mt-4 pt-4 border-t grid grid-cols-2 gap-3"
                  style={{ borderColor: "rgba(0,0,0,0.06)" }}
                >
                  {[
                    { label: "On-chain", items: ["Obligation state", "Contributions", "Settlement", "Events"] },
                    { label: "Off-chain", items: ["User profiles", "Notifications", "Analytics", "Documents"] },
                  ].map((col) => (
                    <div key={col.label}>
                      <p
                        className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                        style={{ color: "rgba(0,0,0,0.3)" }}
                      >
                        {col.label}
                      </p>
                      {col.items.map((item) => (
                        <p
                          key={item}
                          className="text-[11px] py-0.5"
                          style={{ color: "rgba(0,0,0,0.5)" }}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
