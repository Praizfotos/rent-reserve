"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BlurReveal from "@/components/motion/BlurReveal";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "What is RentReserve?",
    a: "RentReserve is a programmable rent-obligation platform. You create a rent obligation, define the target amount and due date, then contribute toward it gradually over time. When ready, you settle the full obligation through a wallet-authorized action. Both the tenant and landlord receive a verifiable record.",
  },
  {
    q: "Do I have to pay my rent monthly?",
    a: "No. RentReserve does not change the structure of your tenancy. If your landlord expects an annual payment, you can still settle the full amount annually — RentReserve just helps you prepare for that obligation by accumulating contributions throughout the year.",
  },
  {
    q: "Can I make multiple contributions toward one rent?",
    a: "Yes. This is the core product feature. You can contribute ₦50,000 one month and ₦200,000 the next — all contributions are tracked against the same rent obligation. The system shows your progress toward the total target at all times.",
  },
  {
    q: "Can I settle my rent early?",
    a: "Yes. Once your obligation is fully funded, you can settle any time before the due date. You do not need to wait for the deadline. The landlord receives confirmation as soon as settlement is complete.",
  },
  {
    q: "Can someone else contribute toward my rent?",
    a: "Shared contributions — from roommates, family members, sponsors and employers — are on the product roadmap. The V1 focuses on single-tenant obligations. Shared funding is planned for a future release.",
  },
  {
    q: "How does Stellar fit into RentReserve?",
    a: "Stellar and Soroban provide the programmable settlement layer. Rent obligations, contribution records, and settlement state are enforced by a Soroban smart contract rather than only stored in a database. This means financial state transitions happen with wallet-authorized actions and can be independently verified.",
  },
  {
    q: "Does RentReserve hold my money?",
    a: "No. The product is designed so funds move through user-authorized wallet actions against the Soroban contract, not through a RentReserve-controlled account. The platform does not take custody of customer funds.",
  },
  {
    q: "What happens when my rent is fully funded?",
    a: "The obligation status changes to Fully Funded. You can then choose to settle early or wait until closer to the due date. Once you initiate settlement, the obligation moves to Settled and a receipt is generated for both parties.",
  },
  {
    q: "Is RentReserve a rent loan?",
    a: "No. RentReserve is a preparation and settlement product, not a lending product. The platform does not advance money to tenants or collect repayments with interest. You save toward a real obligation and settle it when ready.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <BlurReveal delay={0.04 + index * 0.04}>
      <div className="border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <button
          className="w-full flex items-center justify-between gap-6 py-5 text-left group"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span
            className="text-[15px] font-medium leading-snug"
            style={{ color: "rgba(0,0,0,0.875)" }}
          >
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2, ease }}
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
            aria-hidden="true"
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M4.5 1v7M1 4.5h7"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              style={{ overflow: "hidden" }}
            >
              <p
                className="text-[14px] leading-relaxed pb-5"
                style={{ color: "rgba(0,0,0,0.55)" }}
              >
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BlurReveal>
  );
}

export default function FAQSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Label */}
          <div className="lg:col-span-4">
            <BlurReveal>
              <p
                className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="font-semibold tracking-tight mb-4"
                style={{
                  fontSize: "clamp(24px, 2.5vw, 34px)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  color: "rgba(0,0,0,0.875)",
                }}
              >
                Common questions.
              </h2>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "rgba(0,0,0,0.45)" }}
              >
                If you have a question not covered here, the documentation and
                GitHub repository have more detail.
              </p>
            </BlurReveal>
          </div>

          {/* Questions */}
          <div className="lg:col-span-8">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
