import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_REDIRECT, authRoutes, publicRoutes } from "./config/route"
import { cookies } from "next/headers"


async function hasLoggedIn() {
  const cookieStore = await cookies()
  const hasCookie = cookieStore.has("token")
  if (!hasCookie) {
    return false
  } else {
    const token = cookieStore.get("token")?.value
    if (!token) {
      return false
    }
    return true
  }
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req

  const isLoggedIn = await hasLoggedIn()
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)


  if (isPublicRoutes) {
    return NextResponse.next()
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/login", nextUrl))
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
