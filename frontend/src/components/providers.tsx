"use client";

import { AuthProvider } from "@/lib/auth/context";
import type { ReactNode } from "react";

function hasSupabaseEnv(): boolean {
  return !!(
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function Providers({ children }: { children: ReactNode }) {
  if (!hasSupabaseEnv()) return <>{children}</>;
  return <AuthProvider>{children}</AuthProvider>;
}
