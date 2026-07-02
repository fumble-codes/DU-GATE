import { createClient } from "@/lib/db/supabase-server";
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { Card, MetricCard } from "@/components/ui/card";
import { Heading, Body, Label, Meta } from "@/components/ui/typography";
import {
  Question,
  Lightbulb,
  BookOpen,
  ClipboardText,
} from "@phosphor-icons/react/dist/ssr";

async function getMetrics() {
  const supabase = await createClient();

  const [questionsResult, conceptsResult, subjectsResult, mocksResult] =
    await Promise.all([
      supabase.from("questions").select("*", { count: "exact", head: true }),
      supabase
        .from("concepts")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("subjects")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("mock_tests")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true),
    ]);

  return {
    totalQuestions: questionsResult.count ?? 0,
    totalConcepts: conceptsResult.count ?? 0,
    activeSubjects: subjectsResult.count ?? 0,
    publishedMocks: mocksResult.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const metrics = await getMetrics();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <AdminBreadcrumbs items={[{ label: "Admin" }, { label: "Dashboard" }]} />
          <Heading as="h1" className="mt-1">
            Dashboard
          </Heading>
          <Meta className="mt-1">
            Overview of your question bank and content
          </Meta>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in animate-in-delay-1">
        <MetricCard
          label="Total Questions"
          value={metrics.totalQuestions}
          icon={<Question size={32} weight="duotone" />}
        />
        <MetricCard
          label="Active Concepts"
          value={metrics.totalConcepts}
          icon={<Lightbulb size={32} weight="duotone" />}
        />
        <MetricCard
          label="Active Subjects"
          value={metrics.activeSubjects}
          icon={<BookOpen size={32} weight="duotone" />}
        />
        <MetricCard
          label="Published Mocks"
          value={metrics.publishedMocks}
          icon={<ClipboardText size={32} weight="duotone" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in animate-in-delay-2">
        <Card variant="default" className="p-6">
          <Heading as="h5">Recent Imports</Heading>
          <Body size="meta" muted className="mt-1">
            No imports yet. Upload a DOCX file from the Imports page.
          </Body>
        </Card>

        <Card variant="default" className="p-6">
          <Heading as="h5">Recent Mocks</Heading>
          <Body size="meta" muted className="mt-1">
            No mocks created yet. Build one from the Mock Builder.
          </Body>
        </Card>
      </div>
    </div>
  );
}
