import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedPaths = ["/admin"];
const authPaths = ["/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
        },
      },
    },
  );

  const { data: { session } } = await supabase.auth.getSession();

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));
  const isAuth = authPaths.some(p => pathname.startsWith(p));

  if (isProtected && !session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtected && session) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile || profile.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (isAuth && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login", "/auth/signup"],
};
