"use client";

import Link from "next/link";
import LogoMark from "@/components/shared/LogoMark";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "For tenants", href: "#tenants" },
      { label: "For landlords", href: "#landlords" },
      { label: "Security", href: "#security" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Stellar", href: "https://stellar.org", target: "_blank" },
      { label: "Soroban", href: "https://developers.stellar.org", target: "_blank" },
      { label: "API", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Risk disclosure", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(0,0,0,0.06)", backgroundColor: "rgb(247,247,247)" }}
      aria-label="Site footer"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="RentReserve home">
              <LogoMark />
              <span
                className="text-[14px] font-semibold tracking-tight"
                style={{ color: "rgba(0,0,0,0.875)" }}
              >
                RentReserve
              </span>
            </Link>
            <p
              className="text-[13px] leading-relaxed mb-5"
              style={{ color: "rgba(0,0,0,0.45)", maxWidth: 280 }}
            >
              Prepare for rent before rent day. Programmable rent preparation
              and settlement infrastructure.
            </p>
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: "rgba(0,0,0,0.3)", maxWidth: 280 }}
            >
              Built on Stellar · Testnet prototype
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-[11px] font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "rgba(0,0,0,0.35)" }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5" role="list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={"target" in link ? link.target : undefined}
                        rel={"target" in link ? "noopener noreferrer" : undefined}
                        className="text-[13px] transition-colors duration-150"
                        style={{ color: "rgba(0,0,0,0.45)" }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLAnchorElement).style.color =
                            "rgba(0,0,0,0.875)")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLAnchorElement).style.color =
                            "rgba(0,0,0,0.45)")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-12 pt-6 border-t"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <p className="text-[12px]" style={{ color: "rgba(0,0,0,0.3)" }}>
            © 2026 RentReserve
          </p>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: "rgba(0,0,0,0.25)", maxWidth: 560 }}
          >
            RentReserve is an experimental software prototype. Not a licensed
            payment service, bank or financial adviser. Testnet only.
          </p>
        </div>
      </div>
    </footer>
  );
}
