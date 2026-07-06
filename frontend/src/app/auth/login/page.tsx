"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/db/supabase-browser";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Check your email for a confirmation link, or try again."
          : err.message
      );
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="text-center mb-6">
        <Heading as="h3">Welcome back</Heading>
        <Meta className="mt-1">Sign in to your account</Meta>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
            className="w-full mt-1 px-3.5 py-2.5 rounded-[10px] border border-border bg-white text-[14px] text-text-primary outline-none focus:border-brand-accent transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <Body size="meta" className="text-status-alert">{error}</Body>
        )}

        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <Meta className="bg-canvas-bg px-2">or continue with</Meta>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        <Body size="meta" className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-brand-accent font-semibold hover:underline">
            Sign up
          </Link>
        </Body>
      </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-canvas-bg flex items-center justify-center p-4">
      <Suspense fallback={
        <Card className="w-full max-w-sm p-8 text-center">
          <Meta>Loading...</Meta>
        </Card>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
