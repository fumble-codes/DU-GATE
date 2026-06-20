import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  PlayCircle,
  Clock,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

const mockTests = [
  { id: "mock-1", title: "Full Mock Test #1", questions: 50, time: "60 min", difficulty: "Medium" as const, best: "185/250" },
  { id: "mock-2", title: "Full Mock Test #2", questions: 50, time: "60 min", difficulty: "Hard" as const, best: "168/250" },
  { id: "mock-3", title: "Full Mock Test #3", questions: 50, time: "60 min", difficulty: "Easy" as const, best: "—" },
  { id: "mock-4", title: "Full Mock Test #4", questions: 50, time: "60 min", difficulty: "Medium" as const, best: "—" },
  { id: "mock-5", title: "Full Mock Test #5", questions: 50, time: "60 min", difficulty: "Hard" as const, best: "—" },
  { id: "mock-6", title: "Full Mock Test #6", questions: 50, time: "60 min", difficulty: "Medium" as const, best: "—" },
];

export default function MocksPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <Label>Practice</Label>
          <Heading as="h1">Mock Tests</Heading>
          <Meta className="mt-1.5">
            Full-length practice tests simulating the real CUET exam interface
          </Meta>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-1">
          {mockTests.map((mock) => (
            <Card key={mock.id} variant="interactive">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                    <Trophy size={22} weight="fill" className="text-brand-accent-dark" />
                  </div>
                  <Badge
                    variant={mock.difficulty === "Hard" ? "alert" : mock.difficulty === "Easy" ? "success" : "accent"}
                    size="sm"
                  >
                    {mock.difficulty}
                  </Badge>
                </div>
                <div>
                  <Heading as="h5">{mock.title}</Heading>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} weight="fill" className="text-text-muted" />
                      <Body size="meta" muted>{mock.time}</Body>
                    </div>
                    <Body size="meta" muted>{mock.questions} questions</Body>
                    <Body size="meta" muted>250 marks</Body>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <TrendUp size={12} weight="fill" className="text-brand-accent" />
                    <Body size="meta" muted>Best: {mock.best}</Body>
                  </div>
                </div>
                <Button size="sm" className="w-full" variant={mock.best !== "\u2014" ? "accent" : "primary"}>
                  <PlayCircle size={14} weight="fill" />
                  {mock.best !== "\u2014" ? "Retake Test" : "Start Test"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
