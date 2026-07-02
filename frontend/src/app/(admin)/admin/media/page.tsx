import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { Card } from "@/components/ui/card";
import { Heading, Body } from "@/components/ui/typography";
import { Image } from "@phosphor-icons/react/dist/ssr";

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div>
        <AdminBreadcrumbs
          items={[{ label: "Admin", href: "/admin" }, { label: "Media" }]}
        />
        <Heading as="h1" className="mt-1">
          Media
        </Heading>
        <Body size="meta" muted className="mt-1">
          View uploaded assets, preview, and manage unused files.
        </Body>
      </div>

      <Card variant="default" className="p-12 flex flex-col items-center justify-center text-center">
        <div className="size-12 rounded-xl bg-brand-accent-subtle flex items-center justify-center mb-4">
          <Image size={24} weight="fill" className="text-brand-accent-dark" />
        </div>
        <Heading as="h5">Coming in Phase 2</Heading>
        <Body size="meta" muted className="mt-2 max-w-md">
          The Media page will allow browsing, searching, previewing, and deleting unused assets.
        </Body>
      </Card>
    </div>
  );
}
