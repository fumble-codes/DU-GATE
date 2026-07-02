import Link from "next/link";
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading, Body } from "@/components/ui/typography";
import { ClipboardText, Plus } from "@phosphor-icons/react/dist/ssr";

export default function MockTestsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <AdminBreadcrumbs
            items={[{ label: "Admin", href: "/admin" }, { label: "Mock Builder" }]}
          />
          <Heading as="h1" className="mt-1">
            Mock Builder
          </Heading>
          <Body size="meta" muted className="mt-1">
            Create and manage mock tests.
          </Body>
        </div>
        <Link
          href="/admin/mocks/new"
          className="inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 bg-brand-accent text-white hover:bg-brand-accent-dark active:scale-[0.98] text-[13px] px-4 py-2 rounded-pill"
        >
          <Plus size={14} weight="bold" />
          New Mock
        </Link>
      </div>

      <Card variant="default" className="p-12 flex flex-col items-center justify-center text-center">
        <div className="size-12 rounded-xl bg-brand-accent-subtle flex items-center justify-center mb-4">
          <ClipboardText size={24} weight="fill" className="text-brand-accent-dark" />
        </div>
        <Heading as="h5">Coming in Phase 2</Heading>
        <Body size="meta" muted className="mt-2 max-w-md">
          The Mock Builder will include question picking, filtering by difficulty
          and concept, draft saving, and publishing.
        </Body>
      </Card>
    </div>
  );
}
