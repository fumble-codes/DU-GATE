import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  BookmarkSimple,
  MagnifyingGlass,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const tabs = [
  { id: "saved", label: "SAVED" },
  { id: "errors", label: "ERRORS" },
];

export default function LibraryPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>My Questions</Label>
          </div>
          <Heading as="h1">Question Library</Heading>
          <Meta className="mt-1.5">
            Review bookmarked questions and revisit your mistakes
          </Meta>
        </div>

        <div className="animate-in animate-in-delay-1">
          <FilterTabs tabs={tabs} />
        </div>

        <div className="flex items-center gap-3 animate-in animate-in-delay-2">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass size={16} weight="fill" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-surface-card text-[13px] font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-[10px] border border-border px-3 py-2.5 text-[12px] font-semibold bg-surface-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
              <option>All Subjects</option>
              <option>Accountancy</option>
              <option>Business Studies</option>
              <option>Economics</option>
            </select>
          </div>
        </div>

        <Card padding="list" variant="default" className="animate-in animate-in-delay-3">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="size-16 rounded-[14px] bg-brand-accent-subtle flex items-center justify-center mb-4">
              <BookmarkSimple size={28} weight="fill" className="text-brand-accent-dark" />
            </div>
            <Heading as="h4">No questions saved yet</Heading>
            <Meta className="mt-1.5 mb-5">
              Bookmark questions during tests or practice to review them here
            </Meta>
            <Button variant="accent" size="sm">
              Browse Mock Tests
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
