import { type NextRequest, NextResponse } from "next/server"

// AUTH DISABLED — full implementation is preserved below
export async function proxy(request: NextRequest) {
  return NextResponse.next()
}

// Original auth implementation — restore this and matcher when ready to re-enable auth:
//
// import { createServerClient } from "@supabase/ssr"
//
// const protectedPaths = ["/admin", "/dashboard"]
// const authPaths = ["/auth/login", "/auth/signup"]
//
// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl
//
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//
//   if (!supabaseUrl || !supabaseAnonKey) {
//     if (protectedPaths.some(p => pathname.startsWith(p))) {
//       const loginUrl = new URL("/auth/login", request.url)
//       loginUrl.searchParams.set("redirectTo", pathname)
//       return NextResponse.redirect(loginUrl)
//     }
//     return NextResponse.next()
//   }
//
//   let supabaseResponse = NextResponse.next({ request })
//   let supabase
//
//   try {
//     supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
//       cookies: {
//         getAll() { return request.cookies.getAll() },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
//           supabaseResponse = NextResponse.next({ request })
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options),
//           )
//         },
//       },
//     })
//   } catch {
//     if (protectedPaths.some(p => pathname.startsWith(p))) {
//       const loginUrl = new URL("/auth/login", request.url)
//       loginUrl.searchParams.set("redirectTo", pathname)
//       return NextResponse.redirect(loginUrl)
//     }
//     return supabaseResponse
//   }
//
//   let session = null
//   try {
//     const { data } = await supabase.auth.getSession()
//     session = data.session
//   } catch { session = null }
//
//   const isProtected = protectedPaths.some(p => pathname.startsWith(p))
//   const isAuth = authPaths.some(p => pathname.startsWith(p))
//
//   if (isProtected && !session) {
//     const loginUrl = new URL("/auth/login", request.url)
//     loginUrl.searchParams.set("redirectTo", pathname)
//     return NextResponse.redirect(loginUrl)
//   }
//
//   if (isProtected && session) {
//     const { data: profile } = await supabase
//       .from("profiles").select("role").eq("id", session.user.id).single()
//     if (pathname.startsWith("/admin") && (!profile || profile.role !== "ADMIN")) {
//       return NextResponse.redirect(new URL("/403", request.url))
//     }
//   }
//
//   if (isAuth && session) {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }
//
//   return supabaseResponse
// }
//
// export const config = {
//   matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/login", "/auth/signup"],
// }
