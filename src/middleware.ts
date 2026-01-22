// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    
    // ✅ Protection routes /admin/*
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  }
);

// ✅ Configuration : protection obligatoire pour /admin/* et /api/admin/*
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};