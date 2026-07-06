"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/db/supabase-browser";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-canvas-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-8 text-center space-y-4">
          <Heading as="h3">Verify your email</Heading>
          <Body size="base">
            We sent a confirmation link to{" "}
            <span className="font-semibold">{email}</span>
          </Body>
          <Body size="meta" className="text-text-secondary">
            Didn't get it? Check your spam folder.
          </Body>
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </Button>
          </div>
          <Body size="meta">
            <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
              Back to login
            </Link>
          </Body>
        </Card>
      </div>
    );
  }

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
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-accent font-semibold hover:underline">
            Sign in
          </Link>
        </Body>
      </Card>
    </div>
  );
}
