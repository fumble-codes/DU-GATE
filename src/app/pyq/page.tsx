import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  Archive,
  CalendarBlank,
  Building,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const papers = [
  { id: "pyq-1", title: "CUET 2025 — Shift 1", date: "04 Jun 2025", subject: "Accountancy", questions: 50, shift: "Morning" },
  { id: "pyq-2", title: "CUET 2025 — Shift 2", date: "03 Jun 2025", subject: "Accountancy", questions: 50, shift: "Afternoon" },
  { id: "pyq-3", title: "CUET 2025 — Shift 1", date: "02 Jun 2025", subject: "Business Studies", questions: 50, shift: "Morning" },
  { id: "pyq-4", title: "CUET 2024 — Shift 1", date: "15 May 2024", subject: "Economics", questions: 50, shift: "Morning" },
  { id: "pyq-5", title: "CUET 2024 — Shift 2", date: "15 May 2024", subject: "Accountancy", questions: 50, shift: "Afternoon" },
  { id: "pyq-6", title: "CUET 2023 — Shift 1", date: "21 May 2023", subject: "Accountancy", questions: 50, shift: "Morning" },
];

const yearTabs = [
  { id: "all", label: "ALL" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
];

const subjectTabs = [
  { id: "all", label: "ALL SUBJECTS" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
];

export default function PyqPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Question Bank</Label>
          </div>
          <Heading as="h1">PYQ Bank</Heading>
          <Meta className="mt-1.5">
            21 official CUET government papers from 2022–2025
          </Meta>
        </div>

        <div className="flex items-center gap-3 animate-in animate-in-delay-1">
          <FilterTabs tabs={yearTabs} />
          <FilterTabs tabs={subjectTabs} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-2">
          {papers.map((paper) => (
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
                      <Body size="meta" muted>{paper.date}</Body>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building size={13} weight="fill" className="text-text-muted" />
                      <Body size="meta" muted>{paper.shift}</Body>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent" size="sm">{paper.subject}</Badge>
                    <Body size="meta" muted>{paper.questions}Q</Body>
                  </div>
                  <Button size="sm">Attempt</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-in animate-in-delay-3">
          <Meta>
            Showing 6 of 21 available papers
            <button className="ml-2 text-brand-accent-dark font-semibold hover:underline">
              View all
            </button>
          </Meta>
        </div>
      </div>
    </AppLayout>
  );
}
