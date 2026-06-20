import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  Question,
  ChatCircleDots,
  Lightbulb,
  ArrowRight,
  BookOpen,
  TrendUp,
  Sparkle,
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
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Community Learning</Label>
          </div>
          <Heading as="h1">Ask a Doubt</Heading>
          <Meta className="mt-1.5">
            Get help from peers on tricky concepts and past paper questions
          </Meta>
        </div>

        <Card variant="default" className="animate-in animate-in-delay-1">
          <div className="flex items-start gap-4">
            <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center shrink-0">
              <Question size={22} weight="fill" className="text-brand-accent-dark" />
            </div>
            <div className="flex-1 space-y-3">
              <Heading as="h5">Post your doubt</Heading>
              <textarea
                placeholder="Type your question here... Be specific about the concept or problem you're stuck on."
                rows={3}
                className="w-full rounded-[10px] border border-border px-4 py-3 text-[13px] font-medium bg-surface-card text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all resize-none"
              />
              <div className="flex items-center justify-between">
                <select className="rounded-[10px] border border-border px-3 py-2 text-[12px] font-semibold bg-surface-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                  <option>Select subject</option>
                  <option>Accountancy</option>
                  <option>Business Studies</option>
                  <option>Economics</option>
                  <option>English</option>
                </select>
                <Button variant="accent" size="sm">
                  <Lightbulb size={16} weight="fill" />
                  Post Doubt
                </Button>
              </div>
            </div>
          </div>
        </Card>

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
            <Meta>Accountancy — Ch.3 & 4</Meta>
          </Card>
          <Card variant="interactive" className="text-center py-6">
            <Lightbulb size={28} weight="fill" className="text-brand-accent mx-auto mb-2" />
            <Heading as="h5">Popular Topics</Heading>
            <Meta>Goodwill, Revaluation, Ratios</Meta>
          </Card>
          <Card variant="interactive" className="text-center py-6">
            <ChatCircleDots size={28} weight="fill" className="text-brand-accent mx-auto mb-2" />
            <Heading as="h5">Unanswered</Heading>
            <Meta>2 doubts need your help</Meta>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
