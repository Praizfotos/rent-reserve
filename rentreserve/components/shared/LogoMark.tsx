"use client";

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="6" fill="rgba(0,0,0,0.875)" />
      <path
        d="M8 10.5C8 9.67 8.67 9 9.5 9H13.5C14.33 9 15 9.67 15 10.5V11H8V10.5Z"
        fill="white"
        fillOpacity="0.92"
      />
      <path
        d="M8 13H16V17.5C16 18.33 15.33 19 14.5 19H9.5C8.67 19 8 18.33 8 17.5V13Z"
        fill="white"
        fillOpacity="0.5"
      />
      <circle cx="19" cy="10" r="2" fill="rgba(0,143,74,0.81)" />
    </svg>
  );
}
