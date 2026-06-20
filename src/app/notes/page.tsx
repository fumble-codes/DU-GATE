import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  Notepad,
  FileText,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const notes = [
  { id: "n1", title: "Partnership Fundamentals", subject: "Accountancy", pages: 12, topics: 8 },
  { id: "n2", title: "Share Capital & Debentures", subject: "Accountancy", pages: 18, topics: 12 },
  { id: "n3", title: "Financial Analysis & Ratios", subject: "Accountancy", pages: 10, topics: 6 },
  { id: "n4", title: "Business Environment", subject: "Business Studies", pages: 8, topics: 5 },
  { id: "n5", title: "Principles of Management", subject: "Business Studies", pages: 14, topics: 10 },
  { id: "n6", title: "National Income & GDP", subject: "Economics", pages: 15, topics: 9 },
  { id: "n7", title: "Money & Banking", subject: "Economics", pages: 11, topics: 7 },
  { id: "n8", title: "Cash Flow Statement", subject: "Accountancy", pages: 9, topics: 5 },
];

const tabs = [
  { id: "all", label: "ALL" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
];

export default function NotesPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Reference</Label>
          </div>
          <Heading as="h1">NCERT Notes</Heading>
          <Meta className="mt-1.5">
            Concise, exam-focused study material for fast revision
          </Meta>
        </div>

        <div className="animate-in animate-in-delay-1">
          <FilterTabs tabs={tabs} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-2">
          {notes.map((note) => (
            <Card key={note.id} variant="interactive">
              <div className="space-y-4">
                <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                  <Notepad size={22} weight="fill" className="text-brand-accent-dark" />
                </div>
                <div>
                  <Heading as="h5">{note.title}</Heading>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <FileText size={13} weight="fill" className="text-text-muted" />
                      <Body size="meta" muted>{note.pages} pages</Body>
                    </div>
                    <Body size="meta" muted>{note.topics} topics</Body>
                  </div>
                </div>
                <Badge variant="accent" size="sm">{note.subject}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
