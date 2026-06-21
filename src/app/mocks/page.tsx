"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getTestDefinitions, getAttempts } from "@/lib/store";
import type { TestDefinition } from "@/types";
import {
  LockKey,
  PlayCircle,
  Clock,
  Sparkle,
  ChartBar,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const subjectMeta: Record<string, { label: string; icon: string }> = {
  accountancy: { label: "Accountancy", icon: "📊" },
  "business-studies": { label: "Business Studies", icon: "🏢" },
  economics: { label: "Economics", icon: "📈" },
  english: { label: "English", icon: "📝" },
};

export default function MocksPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestDefinition[]>([]);
  const [bestScores, setBestScores] = useState<Record<string, string>>({});

  useEffect(() => {
    const defs = getTestDefinitions().filter(t => t.type === "mock");
    setTests(defs);
    const attempts = getAttempts().filter(a => a.status === "completed" && a.type === "mock");
    const best: Record<string, string> = {};
    for (const t of defs) {
      const ta = attempts.filter(a => a.testId === t.id);
      if (ta.length > 0) {
        const top = ta.reduce((a, b) => a.score > b.score ? a : b);
        best[t.id] = `${top.score}/${top.total}`;
      }
    }
    setBestScores(best);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <Label>Practice</Label>
          <Heading as="h1">Mock Tests</Heading>
          <Meta className="mt-1.5">
            Subject-wise mock tests simulating the real CUET exam interface
          </Meta>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in animate-in-delay-1">
          {tests.map((test) => {
            const meta = subjectMeta[test.subject];
            const best = bestScores[test.id];
            return (
              <Card key={test.id} variant={test.isPremium ? "default" : "interactive"} className="relative overflow-hidden">
                {test.isPremium && (
                  <div className="absolute inset-0 bg-text-primary/[0.02] backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
                    <div className="size-12 rounded-full bg-brand-pop/10 flex items-center justify-center">
                      <LockKey size={24} weight="fill" className="text-brand-pop" />
                    </div>
                    <span className="text-[14px] font-bold text-text-primary">Coming Soon</span>
                    <Body size="meta" muted className="text-center px-6">
                      More subject mock tests are being prepared
                    </Body>
                  </div>
                )}
                <div className={`space-y-4 ${test.isPremium ? "opacity-30" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                        <span className="text-[20px]">{meta?.icon ?? "📘"}</span>
                      </div>
                      <div>
                        <Heading as="h5">{meta?.label ?? test.subject} Mock</Heading>
                        <Body size="meta" muted className="mt-0.5">{test.questionIds.length} questions · {test.duration} min</Body>
                      </div>
                    </div>
                    <Badge variant={best ? "success" : "neutral"} size="sm">
                      {best ? `${best}` : "New"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-text-muted">
                    <Clock size={13} weight="fill" />
                    <span>{test.duration} minutes</span>
                    <span className="mx-1">·</span>
                    <ChartBar size={13} weight="fill" />
                    <span>{test.totalMarks} marks</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    variant={best ? "pop" : "primary"}
                    onClick={() => router.push(`/mocks/test/${test.id}`)}
                  >
                    <PlayCircle size={14} weight="fill" />
                    {best ? "Retake Test" : "Start Test"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {tests.length === 0 && (
          <Card padding="compact" variant="default" className="text-center py-12">
            <Body muted>No mock tests available yet.</Body>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
