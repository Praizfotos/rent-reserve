"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LogoMark from "@/components/shared/LogoMark";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "There was a problem with the authentication configuration.";
      case "AccessDenied":
        return "Access was denied. Please try again.";
      case "Verification":
        return "The verification token was invalid or has expired.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  return (
    <>
      {/* Error Message */}
      <div className="mt-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-500">
              <path
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-[24px] font-semibold tracking-tight text-black/87">
          Authentication Error
        </h1>
        <p className="mt-2 text-[14px] text-black/60 max-w-sm mx-auto">
          {getErrorMessage(error)}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-black/[0.06] sm:rounded-xl sm:px-10 text-center">
          {/* Try Again Button */}
          <Link
            href="/auth/signin"
            className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-[14px] font-medium text-white bg-black hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 transition-all duration-200"
          >
            Try signing in again
          </Link>

          {/* Support */}
          <div className="mt-6">
            <p className="text-[12px] text-black/35">
              If the problem persists, please contact support or try again later.
            </p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-[13px] text-black/40 hover:text-black/60 transition-colors duration-150"
          >
            ← Back to site
          </Link>
        </div>
      </div>
    </>
  );
}

export default function AuthError() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <LogoMark className="h-8 w-8" />
            <span className="text-[20px] font-semibold tracking-tight text-black/87">
              RentReserve
            </span>
          </Link>
        </div>
      </div>

      <Suspense fallback={
        <div className="mt-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-black/87">
            Loading...
          </h1>
        </div>
      }>
        <ErrorContent />
      </Suspense>
    </div>
  );
}