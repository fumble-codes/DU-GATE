"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/db/supabase-browser";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        is_teacher: false,
      });
    }

    router.push("/auth/login?verified=true");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-canvas-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <Heading as="h3">Create account</Heading>
          <Meta className="mt-1">Start preparing for CUET</Meta>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <Label>Username</Label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full mt-1 px-3.5 py-2.5 rounded-[10px] border border-border bg-white text-[14px] text-text-primary outline-none focus:border-brand-accent transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label>Email</Label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3.5 py-2.5 rounded-[10px] border border-border bg-white text-[14px] text-text-primary outline-none focus:border-brand-accent transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label>Password</Label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 px-3.5 py-2.5 rounded-[10px] border border-border bg-white text-[14px] text-text-primary outline-none focus:border-brand-accent transition-colors"
              placeholder="Min. 6 characters"
            />
          </div>

          {error && (
            <Body size="meta" className="text-status-alert">{error}</Body>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <Body size="meta" className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
            Sign in
          </Link>
        </Body>
      </Card>
    </div>
  );
}
