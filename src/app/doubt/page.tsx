"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  Sparkle,
  Lightning,
  ChalkboardTeacher,
  ClockCountdown,
  ChatCircleDots,
  ArrowRight,
  BookOpen,
  TrendUp,
  Lightbulb,
  Robot,
  Spinner,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const doubts = [
  {
    id: "d1",
    title: "How is goodwill calculated in retirement of a partner?",
    subject: "Accountancy",
    chapter: "Ch.3 — Retirement & Death",
    answers: 3,
    time: "2 hours ago",
    status: "answered" as const,
  },
  {
    id: "d2",
    title: "Garner vs Murray rule — when is it applicable?",
    subject: "Accountancy",
    chapter: "Ch.4 — Dissolution of Firm",
    answers: 1,
    time: "5 hours ago",
    status: "answered" as const,
  },
  {
    id: "d3",
    title: "Difference between sacrificing ratio and gaining ratio?",
    subject: "Accountancy",
    chapter: "Ch.2 — Admission of Partner",
    answers: 5,
    time: "1 day ago",
    status: "answered" as const,
  },
  {
    id: "d4",
    title: "How to prepare Realisation Account step-by-step?",
    subject: "Accountancy",
    chapter: "Ch.4 — Dissolution of Firm",
    answers: 0,
    time: "3 hours ago",
    status: "pending" as const,
  },
  {
    id: "d5",
    title: "Treatment of accumulated profits at the time of admission?",
    subject: "Accountancy",
    chapter: "Ch.2 — Admission of Partner",
    answers: 2,
    time: "2 days ago",
    status: "answered" as const,
  },
];

const subjectTabs = [
  { id: "all", label: "ALL" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
];

export default function DoubtPage() {
  const [selectedOption, setSelectedOption] = useState<"ai" | "teacher" | null>(null);
  const [doubtText, setDoubtText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Select subject");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAskAI = async () => {
    if (!doubtText.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    setAiError(null);

    try {
      const res = await fetch("/api/doubt/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: doubtText, subject: selectedSubject }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setAiResponse(data.answer);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Failed to get answer");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Help Center</Label>
          </div>
          <Heading as="h1">Ask a Doubt</Heading>
          <p className="text-[13px] leading-[1.6] font-medium text-text-muted mt-1.5 max-w-lg">
            Stuck on a concept? Choose how you want to get unstuck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in animate-in-delay-1">
          <Card
            variant={selectedOption === "ai" ? "glow" : "default"}
            padding="none"
            className={`overflow-hidden transition-all duration-200 ${
              selectedOption === "ai" ? "ring-2 ring-brand-accent/30" : ""
            }`}
          >
            <button
              onClick={() => setSelectedOption(selectedOption === "ai" ? null : "ai")}
              className="w-full text-left p-6 cursor-pointer"
            >
              <div className="size-12 rounded-[12px] bg-brand-accent-subtle flex items-center justify-center mb-4">
                <Robot size={28} weight="fill" className="text-brand-accent" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <Heading as="h4">Ask AI</Heading>
                <Badge variant="accent" size="sm">Instant</Badge>
              </div>
              <Body size="sm" muted className="mb-4">
                Get an immediate answer powered by AI. Available 24/7 for any subject or topic.
              </Body>
              <ul className="space-y-1.5 mb-5">
                {["Instant response in seconds", "Any subject, any time", "Step-by-step explanations"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12px] text-text-muted">
                    <Lightning size={14} weight="fill" className="text-brand-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={selectedOption === "ai" ? "accent" : "outline"}
                size="sm"
                shape="default"
                className="w-full"
                onClick={(e) => { e.stopPropagation(); setSelectedOption("ai"); }}
              >
                {selectedOption === "ai" ? "Type your doubt below" : "Ask AI Now"}
                <ArrowRight size={14} weight="bold" />
              </Button>
            </button>
          </Card>

          <Card
            variant={selectedOption === "teacher" ? "glow" : "default"}
            padding="none"
            className={`overflow-hidden transition-all duration-200 ${
              selectedOption === "teacher" ? "ring-2 ring-brand-pop/30" : ""
            }`}
          >
            <button
              onClick={() => setSelectedOption(selectedOption === "teacher" ? null : "teacher")}
              className="w-full text-left p-6 cursor-pointer"
            >
              <div className="size-12 rounded-[12px] bg-brand-pop-subtle flex items-center justify-center mb-4">
                <ChalkboardTeacher size={28} weight="fill" className="text-brand-pop" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <Heading as="h4">Ask Teachers</Heading>
                <Badge variant="pop" size="sm">Thorough</Badge>
              </div>
              <Body size="sm" muted className="mb-4">
                Submit your doubt to our expert teachers. Get detailed, exam-focused answers within 24 hours.
              </Body>
              <ul className="space-y-1.5 mb-5">
                {["Expert-verified answers", "Detailed explanations with examples", "Response within 24 hours"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12px] text-text-muted">
                    <ClockCountdown size={14} weight="fill" className="text-brand-pop shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={selectedOption === "teacher" ? "pop" : "outline"}
                size="sm"
                shape="default"
                className="w-full"
                onClick={(e) => { e.stopPropagation(); setSelectedOption("teacher"); }}
              >
                {selectedOption === "teacher" ? "Type your doubt below" : "Submit to Teachers"}
                <ArrowRight size={14} weight="bold" />
              </Button>
            </button>
          </Card>
        </div>

        {selectedOption && (
          <Card variant="default" className="animate-in animate-in-delay-2">
            <div className="flex items-start gap-4">
              <div className={`size-11 rounded-[10px] flex items-center justify-center shrink-0 ${
                selectedOption === "ai" ? "bg-brand-accent-subtle" : "bg-brand-pop-subtle"
              }`}>
                {selectedOption === "ai" ? (
                  <Robot size={22} weight="fill" className="text-brand-accent" />
                ) : (
                  <ChalkboardTeacher size={22} weight="fill" className="text-brand-pop" />
                )}
              </div>
              <div className="flex-1 space-y-3">
                <Heading as="h5">
                  {selectedOption === "ai" ? "Ask AI your doubt" : "Submit your doubt to teachers"}
                </Heading>
                <textarea
                  value={doubtText}
                  onChange={(e) => setDoubtText(e.target.value)}
                  placeholder="Type your question here... Be specific about the concept or problem you're stuck on."
                  rows={3}
                  className="w-full rounded-[10px] border border-border px-4 py-3 text-[13px] font-medium bg-surface-card text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all resize-none"
                />
                <div className="flex items-center justify-between">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="rounded-[10px] border border-border px-3 py-2 text-[12px] font-semibold bg-surface-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                  >
                    <option>Select subject</option>
                    <option>Accountancy</option>
                    <option>Business Studies</option>
                    <option>Economics</option>
                    <option>English</option>
                  </select>
                  {selectedOption === "ai" ? (
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handleAskAI}
                      disabled={aiLoading || !doubtText.trim()}
                    >
                      {aiLoading ? (
                        <>
                          <Spinner size={16} weight="bold" className="animate-spin" />
                          Thinking...
                        </>
                      ) : (
                        <>
                          <Lightning size={16} weight="fill" />
                          Ask AI
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button variant="pop" size="sm" disabled={!doubtText.trim()}>
                      <ChalkboardTeacher size={16} weight="fill" />
                      Submit to Teachers
                    </Button>
                  )}
                </div>

                {aiResponse && (
                  <div className="mt-4 p-4 rounded-[10px] bg-brand-accent-subtle border border-brand-accent/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} weight="fill" className="text-brand-accent" />
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-brand-accent">
                        AI Response
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.75] text-text-primary whitespace-pre-wrap">
                      {aiResponse}
                    </p>
                  </div>
                )}

                {aiError && (
                  <div className="mt-4 p-4 rounded-[10px] bg-status-alert-light border border-status-alert/20">
                    <p className="text-[13px] leading-[1.6] text-status-alert">{aiError}</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        <div className="animate-in animate-in-delay-2">
          <div className="flex items-center justify-between mb-4">
            <FilterTabs tabs={subjectTabs} />
            <div className="flex items-center gap-1.5">
              <ChatCircleDots size={16} weight="fill" className="text-brand-accent" />
              <Body size="sm">{doubts.length} doubts</Body>
            </div>
          </div>

          <div className="space-y-3">
            {doubts.map((doubt) => (
              <Card key={doubt.id} variant="interactive" padding="list">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="size-7 rounded-[6px] bg-brand-accent-subtle flex items-center justify-center">
                        <BookOpen size={14} weight="fill" className="text-brand-accent-dark" />
                      </div>
                      <Badge variant="accent" size="sm">{doubt.subject}</Badge>
                      <Body size="meta" muted>{doubt.chapter}</Body>
                    </div>
                    <Heading as="h5" className="mt-1.5">{doubt.title}</Heading>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5">
                        <ChatCircleDots size={14} weight="fill" className="text-text-muted" />
                        <Body size="meta" muted>{doubt.answers} {doubt.answers === 1 ? "answer" : "answers"}</Body>
                      </div>
                      <Badge variant={doubt.status === "answered" ? "success" : "alert"} size="sm">
                        {doubt.status === "answered" ? "Answered" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <Body size="meta" muted>{doubt.time}</Body>
                    <Button variant="ghost" size="sm" shape="default" className="mt-1.5">
                      View <ArrowRight size={12} weight="bold" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in animate-in-delay-3">
          <Card variant="interactive" className="text-center py-6">
            <TrendUp size={28} weight="fill" className="text-brand-accent mx-auto mb-2" />
            <Heading as="h5">Most Active</Heading>
            <Body size="meta" muted>Accountancy — Ch.3 & 4</Body>
          </Card>
          <Card variant="interactive" className="text-center py-6">
            <Lightbulb size={28} weight="fill" className="text-brand-accent mx-auto mb-2" />
            <Heading as="h5">Popular Topics</Heading>
            <Body size="meta" muted>Goodwill, Revaluation, Ratios</Body>
          </Card>
          <Card variant="interactive" className="text-center py-6">
            <ChatCircleDots size={28} weight="fill" className="text-brand-accent mx-auto mb-2" />
            <Heading as="h5">Unanswered</Heading>
            <Body size="meta" muted>2 doubts need your help</Body>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
