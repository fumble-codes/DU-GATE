import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const chapters = [
  { id: "ch1", title: "Partnership Formation", subject: "Accountancy", questions: 30, progress: 80 },
  { id: "ch2", title: "Admission of Partner", subject: "Accountancy", questions: 40, progress: 60 },
  { id: "ch3", title: "Retirement & Death", subject: "Accountancy", questions: 50, progress: 25 },
  { id: "ch4", title: "Dissolution of Firm", subject: "Accountancy", questions: 50, progress: 0 },
  { id: "ch5", title: "Share Capital", subject: "Accountancy", questions: 35, progress: 0 },
  { id: "ch6", title: "Debentures", subject: "Accountancy", questions: 40, progress: 0 },
  { id: "ch7", title: "Financial Statements", subject: "Accountancy", questions: 30, progress: 0 },
  { id: "bs1", title: "Business Environment", subject: "Business Studies", questions: 30, progress: 0 },
  { id: "bs2", title: "Principles of Management", subject: "Business Studies", questions: 35, progress: 0 },
];

const subjectTabs = [
  { id: "all", label: "ALL" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
];

export default function PracticePage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Topic Practice</Label>
          </div>
          <Heading as="h1">Chapter Practice</Heading>
          <Meta className="mt-1.5">
            Target specific chapters and track your mastery
          </Meta>
        </div>

        <div className="animate-in animate-in-delay-1">
          <FilterTabs tabs={subjectTabs} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-2">
          {chapters.map((ch) => (
            <Card key={ch.id} variant="interactive">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                    <BookOpen size={22} weight="fill" className="text-brand-accent-dark" />
                  </div>
                  {ch.progress >= 80 ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle size={10} weight="fill" />
                      Almost done
                    </Badge>
                  ) : ch.progress > 0 ? (
                    <Badge variant="accent" size="sm">In progress</Badge>
                  ) : null}
                </div>
                <div>
                  <Heading as="h5">{ch.title}</Heading>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="neutral" size="sm">{ch.subject}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock size={12} weight="fill" className="text-text-muted" />
                      <Body size="meta" muted>{ch.questions}Q</Body>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Body size="meta" muted>Progress</Body>
                    <Body size="meta">{ch.progress}%</Body>
                  </div>
                  <div className="h-2 rounded-full bg-text-primary/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        ch.progress >= 80
                          ? "bg-status-success"
                          : ch.progress > 0
                          ? "bg-brand-accent"
                          : "bg-text-primary/10"
                      }`}
                      style={{ width: `${Math.max(ch.progress, 4)}%` }}
                    />
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  variant={ch.progress > 0 ? "accent" : "outline"}
                >
                  {ch.progress > 0 ? "Continue Practice" : "Start Practice"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
