import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isOnApp = nextUrl.pathname.startsWith('/app')
  const isOnAuth = nextUrl.pathname.startsWith('/auth')

  // Redirect to login if trying to access app without authentication
  if (isOnApp && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl))
  }

  // Redirect to dashboard if logged in and on auth pages
  if (isLoggedIn && isOnAuth) {
    return NextResponse.redirect(new URL('/app/dashboard', nextUrl))
  }

  return NextResponse.next()
})

// Configure which routes middleware should run on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}