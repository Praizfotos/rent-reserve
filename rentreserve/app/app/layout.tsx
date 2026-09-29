"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import LogoMark from "@/components/shared/LogoMark";

const sidebarLinks = [
  {
    label: "Overview",
    href: "/app/dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Obligations",
    href: "/app/obligations",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Timeline",
    href: "/app/timeline",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 4.5V6.5M8 9.5V11.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen bg-[rgb(248,248,248)] overflow-x-hidden">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 border-r border-black/[0.06] bg-white">
        <div className="flex h-14 items-center gap-2 px-5 border-b border-black/[0.04]">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            title="Back to RentReserve homepage"
          >
            <LogoMark className="h-5 w-5" />
            <span className="text-[14px] font-semibold tracking-tight text-black/87">
              RentReserve
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4" aria-label="Application navigation">
          <ul className="space-y-1" role="list">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-black/[0.04] text-black/87"
                        : "text-black/50 hover:text-black/70 hover:bg-black/[0.02]"
                    }`}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="px-5 py-4 border-t border-black/[0.04] space-y-3">
          {/* User Info */}
          {session?.user && (
            <div className="flex items-center gap-2 mb-3">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-6 w-6 rounded-full"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-black/70 truncate">
                  {session.user.name}
                </p>
                <p className="text-[10px] text-black/40 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[12px] text-black/40 hover:text-black/60 transition-colors duration-150"
            >
              ← Back to site
            </Link>
            <button
              onClick={handleSignOut}
              className="text-[11px] text-black/40 hover:text-black/60 transition-colors duration-150 px-2 py-1 rounded hover:bg-black/[0.02]"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex h-14 items-center justify-between border-b border-black/[0.06] bg-white px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 min-w-0 flex-1 hover:opacity-75 transition-opacity"
          title="Back to RentReserve homepage"
        >
          <LogoMark className="h-5 w-5 flex-shrink-0" />
          <span className="text-[14px] font-semibold tracking-tight text-black/87 truncate">
            RentReserve
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/[0.04] transition-colors flex-shrink-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/20" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-35 w-60 bg-white border-r border-black/[0.06] transform transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center gap-2 px-5 border-b border-black/[0.04]">
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            title="Back to RentReserve homepage"
            onClick={() => setMobileOpen(false)}
          >
            <LogoMark className="h-5 w-5" />
            <span className="text-[14px] font-semibold tracking-tight text-black/87">
              RentReserve
            </span>
          </Link>
        </div>
        <nav className="px-3 py-4 flex-1 overflow-y-auto pb-24" aria-label="Application navigation">
          <ul className="space-y-1" role="list">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-black/[0.04] text-black/87"
                        : "text-black/50 hover:text-black/70 hover:bg-black/[0.02]"
                    }`}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Mobile Sidebar Footer */}
        <div className="px-3 py-4 border-t border-black/[0.04] space-y-3 absolute bottom-0 left-0 right-0 bg-white">
          {/* User Info */}
          {session?.user && (
            <div className="flex items-center gap-2 px-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-6 w-6 rounded-full flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-black/70 truncate">
                  {session.user.name}
                </p>
                <p className="text-[10px] text-black/40 truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                handleSignOut();
              }}
              className="text-[11px] text-black/40 hover:text-black/60 transition-colors duration-150 px-2 py-1 rounded hover:bg-black/[0.02]"
            >
              Sign out
            </button>
            <Link
              href="/"
              className="text-[12px] text-black/40 hover:text-black/60 transition-colors duration-150"
              onClick={() => setMobileOpen(false)}
            >
              Back to site →
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main id="main-content" className="flex-1 lg:pl-60 pt-14 lg:pt-0 overflow-x-hidden min-w-0">
        {children}
      </main>
    </div>
  );
}
