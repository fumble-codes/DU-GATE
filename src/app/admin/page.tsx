"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AppLayout } from "@/components/layout/app-layout";
import { Heading, Body, Label, Meta } from "@/components/ui/typography";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkle,
  SignOut,
  GraduationCap,
  Stack,
  Question,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";

export default function AdminDashboard() {
  const { user, loading, isTeacher, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login");
    if (!loading && user && !isTeacher) router.push("/");
  }, [user, loading, isTeacher, router]);

  if (loading || !user || !isTeacher) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Body muted>Loading...</Body>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between animate-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkle size={16} weight="fill" className="text-brand-accent" />
              <Label>Admin Panel</Label>
            </div>
            <Heading as="h1">Dashboard</Heading>
            <Meta className="mt-1">Welcome back, {user.email}</Meta>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            <SignOut size={13} weight="bold" />
            Sign out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-1">
          <Card variant="interactive" onClick={() => router.push("/admin/questions")}>
            <div className="space-y-4">
              <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <Question size={22} weight="fill" className="text-brand-accent-dark" />
              </div>
              <div>
                <Heading as="h5">Questions</Heading>
                <Body size="meta" muted className="mt-1">Manage question bank · Add, edit, bulk import</Body>
              </div>
              <Badge variant="accent" size="sm">Coming soon</Badge>
            </div>
          </Card>

          <Card variant="interactive" onClick={() => router.push("/admin/tests")}>
            <div className="space-y-4">
              <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <Stack size={22} weight="fill" className="text-brand-accent-dark" />
              </div>
              <div>
                <Heading as="h5">Tests</Heading>
                <Body size="meta" muted className="mt-1">Build test definitions · Assign questions</Body>
              </div>
              <Badge variant="accent" size="sm">Coming soon</Badge>
            </div>
          </Card>

          <Card variant="interactive" onClick={() => router.push("/admin/flashcards")}>
            <div className="space-y-4">
              <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <GraduationCap size={22} weight="fill" className="text-brand-accent-dark" />
              </div>
              <div>
                <Heading as="h5">Flashcards</Heading>
                <Body size="meta" muted className="mt-1">Manage decks · Add cards</Body>
              </div>
              <Badge variant="accent" size="sm">Coming soon</Badge>
            </div>
          </Card>

          <Card variant="interactive" onClick={() => router.push("/admin/cutoffs")}>
            <div className="space-y-4">
              <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                <BookOpen size={22} weight="fill" className="text-brand-accent-dark" />
              </div>
              <div>
                <Heading as="h5">College Cutoffs</Heading>
                <Body size="meta" muted className="mt-1">Manage cutoff data · Import</Body>
              </div>
              <Badge variant="accent" size="sm">Coming soon</Badge>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
