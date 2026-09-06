import type { Metadata } from "next";
import "./globals.css";

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
      <body className="bg-canvas antialiased">{children}</body>
    </html>
  );
}
