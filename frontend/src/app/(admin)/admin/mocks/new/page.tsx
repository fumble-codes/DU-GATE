import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { Card } from "@/components/ui/card";
import { Heading, Body } from "@/components/ui/typography";

export default function NewMockPage() {
  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Mock Builder", href: "/admin/mocks" },
            { label: "New Mock" },
          ]}
        />
        <Heading as="h1" className="mt-1">
          New Mock Test
        </Heading>
        <Body size="meta" muted className="mt-1">
          Configure your mock test and pick questions.
        </Body>
      </div>

      <Card variant="default" className="p-12 flex flex-col items-center justify-center text-center">
        <Heading as="h5">Coming in Phase 2</Heading>
        <Body size="meta" muted className="mt-2 max-w-md">
          The mock builder form will include subject selection, question filtering,
          a question picker with selected count, and save/publish actions.
        </Body>
      </Card>
    </div>
  );
}
