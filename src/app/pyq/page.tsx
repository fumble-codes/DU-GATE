"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { getTestDefinitions, getAttempts } from "@/lib/store";
import type { TestDefinition, Subject } from "@/types";
import {
  Archive,
  CalendarBlank,
  Building,
  Sparkle,
  PlayCircle,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const subjectMeta: Record<string, { label: string }> = {
  all: { label: "ALL SUBJECTS" },
  accountancy: { label: "ACCOUNTANCY" },
  "business-studies": { label: "BUSINESS STUDIES" },
  economics: { label: "ECONOMICS" },
  english: { label: "ENGLISH" },
};

const yearTabs = [
  { id: "all", label: "ALL" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
];

const subjectTabs = [
  { id: "all", label: "ALL SUBJECTS" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
  { id: "english", label: "ENGLISH" },
];

export default function PyqPage() {
  const router = useRouter();
  const [tests, setTests] = useState<TestDefinition[]>([]);
  const [yearFilter, setYearFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const defs = getTestDefinitions().filter(t => t.type === "pyq");
    setTests(defs);
    const attempts = getAttempts().filter(a => a.status === "completed" && a.type === "pyq");
    setCompletedIds(new Set(attempts.map(a => a.testId)));
  }, []);

  const filtered = tests.filter(t => {
    const yearMatch = yearFilter === "all" || String(t.year) === yearFilter;
    const subjectMatch = subjectFilter === "all" || t.subject === subjectFilter;
    return yearMatch && subjectMatch;
  });

  const grouped = filtered.reduce((acc, t) => {
    const key = t.subject;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {} as Record<string, TestDefinition[]>);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <Label>Question Bank</Label>
          <Heading as="h1">PYQ Bank</Heading>
          <Meta className="mt-1.5">
            Official CUET previous year papers across subjects
          </Meta>
        </div>

        <div className="flex items-center gap-3 animate-in animate-in-delay-1">
          <FilterTabs tabs={yearTabs} onChange={setYearFilter} />
          <FilterTabs tabs={subjectTabs} onChange={setSubjectFilter} />
        </div>

        {Object.entries(grouped).map(([subject, papers]) => (
          <div key={subject} className="animate-in animate-in-delay-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                {subjectMeta[subject]?.label ?? subject}
              </span>
              <span className="text-[11px] text-text-muted">· {papers.length} paper{papers.length > 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers.map((paper) => {
                const isCompleted = completedIds.has(paper.id);
                return (
                  <Card key={paper.id} variant="interactive">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                          <Archive size={22} weight="fill" className="text-brand-accent-dark" />
                        </div>
                        <Badge variant="gold" size="sm">Official</Badge>
                      </div>
                      <div>
                        <Heading as="h5">{paper.title}</Heading>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1.5">
                            <CalendarBlank size={13} weight="fill" className="text-text-muted" />
                            <Body size="meta" muted>CUET {paper.year}</Body>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Building size={13} weight="fill" className="text-text-muted" />
                            <Body size="meta" muted>Shift {paper.shift}</Body>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={isCompleted ? "success" : "accent"} size="sm">
                            {isCompleted ? "Completed" : paper.subject}
                          </Badge>
                          <Body size="meta" muted>{paper.questionIds.length}Q</Body>
                        </div>
                        <Button size="sm" variant={isCompleted ? "accent" : "primary"} onClick={() => router.push(`/pyq/test/${paper.id}`)}>
                          <PlayCircle size={13} weight="fill" />
                          {isCompleted ? "Retake" : "Attempt"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <Card padding="compact" variant="default" className="text-center py-12">
            <Body muted>No PYQ papers match your filters.</Body>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
