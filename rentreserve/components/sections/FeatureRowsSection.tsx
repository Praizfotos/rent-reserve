"use client";

import BlurReveal from "@/components/motion/BlurReveal";

const features = [
  {
    number: "01",
    label: "Gradual funding",
    body: "Contribute toward the same rent target over time instead of starting from zero on rent day. Any amount, any cadence.",
    tag: "Core",
    tagColor: "rgba(0,0,0,0.4)",
    tagBg: "rgba(0,0,0,0.05)",
  },
  {
    number: "02",
    label: "Deadline-aware reminders",
    body: "Know how much remains, how much time is left, and what contribution pace keeps you on track for your exact due date.",
    tag: "Core",
    tagColor: "rgba(0,0,0,0.4)",
    tagBg: "rgba(0,0,0,0.05)",
  },
  {
    number: "03",
    label: "Early settlement",
    body: "Reach your funding target before the deadline and settle whenever you're ready. The landlord receives confirmation immediately.",
    tag: "Core",
    tagColor: "rgba(0,0,0,0.4)",
    tagBg: "rgba(0,0,0,0.05)",
  },
  {
    number: "04",
    label: "Shared contributions",
    body: "Multiple authorized contributors can fund one obligation — roommates, family members, sponsors, and employers.",
    tag: "Coming soon",
    tagColor: "rgba(180,100,0,0.8)",
    tagBg: "rgba(180,100,0,0.07)",
  },
  {
    number: "05",
    label: "Batch settlement",
    body: "Review multiple approved obligations together and settle them in one wallet-authorized action.",
    tag: "Coming soon",
    tagColor: "rgba(180,100,0,0.8)",
    tagBg: "rgba(180,100,0,0.07)",
  },
  {
    number: "06",
    label: "Smart scheduled funding",
    body: "Authorize programmable monthly contributions with explicit spending limits, time constraints and a specific target obligation.",
    tag: "Planned",
    tagColor: "rgba(0,100,180,0.8)",
    tagBg: "rgba(0,100,180,0.07)",
  },
];

export default function FeatureRowsSection() {
  return (
    <section
      className="py-20 md:py-28 border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
      aria-labelledby="features-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <BlurReveal className="mb-12 md:mb-16 max-w-[480px]">
          <p
            className="text-[11px] font-semibold tracking-widest uppercase mb-4"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            Features
          </p>
          <h2
            id="features-heading"
            className="font-semibold tracking-tight"
            style={{
              fontSize: "clamp(26px, 3vw, 38px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "rgba(0,0,0,0.875)",
            }}
          >
            Everything the obligation needs.
          </h2>
        </BlurReveal>

        <div className="flex flex-col">
          {features.map((f, i) => (
            <BlurReveal key={f.number} delay={0.05 + i * 0.06}>
              <div
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-6 border-b"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                {/* Number */}
                <span
                  className="text-[11px] font-semibold tabular-nums shrink-0 pt-0.5 w-6"
                  style={{ color: "rgba(0,0,0,0.2)" }}
                >
                  {f.number}
                </span>

                {/* Label */}
                <div className="sm:w-56 shrink-0">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "rgba(0,0,0,0.875)" }}
                  >
                    {f.label}
                  </p>
                </div>

                {/* Body */}
                <p
                  className="text-[14px] leading-relaxed flex-1"
                  style={{ color: "rgba(0,0,0,0.55)", maxWidth: 520 }}
                >
                  {f.body}
                </p>

                {/* Tag */}
                <span
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center"
                  style={{ backgroundColor: f.tagBg, color: f.tagColor }}
                >
                  {f.tag}
                </span>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
