import { redirect } from "next/navigation";
import { createClient } from "@/lib/db/supabase-server";

export async function verifyAdmin() {
  let supabase;
  try {
    supabase = await createClient();
  } catch {
    redirect("/auth/login");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "ADMIN") {
    redirect("/403");
    return;
  }

  return { user };
}
