import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "RentReserve — Prepare for Rent Before Rent Day",
  description:
    "Plan, fund and settle your upcoming rent before the deadline with RentReserve. Turn your next rent payment into a plan.",
  openGraph: {
    title: "RentReserve — Prepare for Rent Before Rent Day",
    description:
      "Turn your next rent payment into a plan. Fund gradually, stay on track, and settle when you're ready.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-canvas antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-black/35"
        >
          Skip to content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
