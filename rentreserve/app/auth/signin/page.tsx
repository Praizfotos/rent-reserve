"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/MockAuth";
import LogoMark from "@/components/shared/LogoMark";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push('/app/dashboard');
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
      // Set auth cookie for middleware
      document.cookie = "rentreserve_authenticated=true; path=/; max-age=86400"; // 24 hours
      router.push('/app/dashboard');
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

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
        
        {/* Heading */}
        <div className="mt-8 text-center">
          <h1 className="text-[28px] font-semibold tracking-tight text-black/87">
            Sign in to your account
          </h1>
          <p className="mt-2 text-[14px] text-black/45">
            Access your rent obligations and track your progress
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-black/[0.06] sm:rounded-xl sm:px-10">
          {/* Demo Notice */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600 mt-0.5 flex-shrink-0">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a1 1 0 011 1v3a1 1 0 01-2 0V5a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
              </svg>
              <div>
                <p className="text-[12px] font-medium text-blue-800">Demo Mode</p>
                <p className="text-[11px] text-blue-600 mt-0.5">
                  This is a demonstration. No real authentication required.
                </p>
              </div>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-black/[0.08] rounded-lg shadow-sm bg-white hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black/60 rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span className="text-[14px] font-medium text-black/87">
              {isLoading ? "Signing in..." : "Continue with Google (Demo)"}
            </span>
          </button>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/[0.06]" />
              </div>
              <div className="relative flex justify-center text-[12px]">
                <span className="px-2 bg-white text-black/40">
                  Demonstration only
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-[12px] text-black/35 leading-relaxed">
              This is a demonstration of the RentReserve authentication flow. 
              No real Google account is required - just click the button above.
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
    </div>
  );
}