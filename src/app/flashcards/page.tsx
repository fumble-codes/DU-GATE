import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import {
  GraduationCap,
  Stack,
  Sparkle,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

const decks = [
  { id: "eng-1", title: "English Vocabulary", subject: "English", cards: 100, year: "2025", mastered: 34 },
  { id: "acc-1", title: "Accountancy — Ch.3", subject: "Accountancy", cards: 50, year: "All", mastered: 20 },
  { id: "acc-2", title: "Accountancy — Ch.4", subject: "Accountancy", cards: 45, year: "All", mastered: 12 },
  { id: "bs-1", title: "Business Studies — Ch.1", subject: "Business Studies", cards: 35, year: "All", mastered: 8 },
  { id: "bs-2", title: "Business Studies — Ch.2", subject: "Business Studies", cards: 40, year: "All", mastered: 0 },
  { id: "ec-1", title: "Economics — National Income", subject: "Economics", cards: 30, year: "All", mastered: 0 },
];

const yearTabs = [
  { id: "all", label: "ALL YEARS" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
];

export default function FlashcardsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Study Tools</Label>
          </div>
          <Heading as="h1">Flashcards</Heading>
          <Meta className="mt-1.5">
            Spaced repetition learning with vocabulary and topic decks
          </Meta>
        </div>

        <div className="animate-in animate-in-delay-1">
          <FilterTabs tabs={yearTabs} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-2">
          {decks.map((deck) => (
            <Card key={deck.id} variant="interactive">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                    <GraduationCap size={22} weight="fill" className="text-brand-accent-dark" />
                  </div>
                  {deck.mastered > 0 && (
                    <Badge variant="success" size="sm">
                      <CheckCircle size={10} weight="fill" />
                      {deck.mastered} mastered
                    </Badge>
                  )}
                </div>
                <div>
                  <Heading as="h5">{deck.title}</Heading>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Stack size={13} weight="fill" className="text-text-muted" />
                    <Body size="meta" muted>{deck.cards} cards</Body>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="accent" size="sm">{deck.subject}</Badge>
                  <Button size="sm">Study Deck</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
