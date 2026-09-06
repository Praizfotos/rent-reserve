"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LogoMark from "@/components/shared/LogoMark";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For tenants", href: "#tenants" },
  { label: "For landlords", href: "#landlords" },
  { label: "Developers", href: "#developers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm border-b border-black/[0.06]"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <nav
            className="flex items-center justify-between h-14"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0"
              aria-label="RentReserve home"
            >
              <LogoMark />
              <span
                className="text-[15px] font-semibold tracking-tight"
                style={{ color: "rgba(0,0,0,0.875)" }}
              >
                RentReserve
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[14px] transition-colors duration-150"
                    style={{ color: "rgba(0,0,0,0.608)" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "rgba(0,0,0,0.875)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "rgba(0,0,0,0.608)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/app/dashboard"
                className="text-[14px] transition-colors duration-150 px-3 py-2 hover:text-black/87 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
                style={{ color: "rgba(0,0,0,0.608)" }}
              >
                Log in
              </Link>
              <Link
                href="/app/dashboard"
                className="text-[14px] font-medium text-white rounded-full px-4 py-2 transition-all duration-150 hover:bg-black hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
                style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
              >
                Start preparing
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -mr-2 rounded-md transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <motion.span
                  className="block h-px bg-black/70 origin-center"
                  animate={
                    menuOpen
                      ? { rotate: 45, y: 7.5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-px bg-black/70"
                  animate={{ opacity: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block h-px bg-black/70 origin-center"
                  animate={
                    menuOpen
                      ? { rotate: -45, y: -7.5 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-14 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="px-6 py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-[18px] font-medium py-3 border-b border-black/[0.06]"
                  style={{ color: "rgba(0,0,0,0.875)" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                className="flex flex-col gap-3 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.25 }}
              >
                <Link
                  href="/app/dashboard"
                  className="text-[16px] text-center py-3 rounded-xl border border-black/10 hover:bg-black/[0.02] transition-colors"
                  style={{ color: "rgba(0,0,0,0.608)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/app/dashboard"
                  className="text-[16px] font-medium text-white text-center py-3 rounded-xl transition-all duration-150 hover:bg-black"
                  style={{ backgroundColor: "rgba(0,0,0,0.875)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Start preparing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
