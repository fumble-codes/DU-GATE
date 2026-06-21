import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window === "undefined") {
      const noop = { auth: { getSession: async () => ({ data: { session: null } }), signOut: async () => {}, onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }), signInWithPassword: async () => ({ error: new Error("Supabase not configured") }), signUp: async () => ({ data: { user: null }, error: new Error("Supabase not configured") }) } } as any;
      return noop;
    }
    throw new Error("Supabase env vars not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createBrowserClient(url, key);
}
