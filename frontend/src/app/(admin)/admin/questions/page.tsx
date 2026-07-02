import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Question } from "@phosphor-icons/react/dist/ssr";

export default function QuestionBankPage() {
  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={[{ label: "Admin", href: "/admin" }, { label: "Question Bank" }]}
        />
        <Heading as="h1" className="mt-1">
          Question Bank
        </Heading>
        <Body size="meta" muted className="mt-1">
          Search, filter, and manage all questions.
        </Body>
      </div>

      <Card variant="default" className="p-12 flex flex-col items-center justify-center text-center">
        <div className="size-12 rounded-xl bg-brand-accent-subtle flex items-center justify-center mb-4">
          <Question size={24} weight="fill" className="text-brand-accent-dark" />
        </div>
        <Heading as="h5">Coming in Phase 2</Heading>
        <Body size="meta" muted className="mt-2 max-w-md">
          The Question Bank will include server-side filtering, pagination, bulk actions,
          and inline editing.
        </Body>
      </Card>
    </div>
  );
}
