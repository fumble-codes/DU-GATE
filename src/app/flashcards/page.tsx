"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFlashcardDecks } from "@/lib/store";
import type { FlashcardDeck } from "@/types";
import {
  GraduationCap,
  Stack,
  Sparkle,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";

const subjectMeta: Record<string, string> = {
  english: "ENGLISH",
  accountancy: "ACCOUNTANCY",
  "business-studies": "BUSINESS STUDIES",
  economics: "ECONOMICS",
};

export default function FlashcardsPage() {
  const router = useRouter();
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);

  useEffect(() => {
    setDecks(getFlashcardDecks());
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-1">
          {decks.map((deck) => (
            <Card key={deck.id} variant="interactive">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                    <GraduationCap size={22} weight="fill" className="text-brand-accent-dark" />
                  </div>
                  <Badge variant="accent" size="sm">New</Badge>
                </div>
                <div>
                  <Heading as="h5">{deck.title}</Heading>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Stack size={13} weight="fill" className="text-text-muted" />
                      <Body size="meta" muted>{deck.cardCount} cards</Body>
                    </div>
                    {deck.date && (
                      <div className="flex items-center gap-1.5">
                        <CalendarBlank size={13} weight="fill" className="text-text-muted" />
                        <Body size="meta" muted>{deck.date}</Body>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="neutral" size="sm">{subjectMeta[deck.subject] ?? deck.subject}</Badge>
                  <Button size="sm" onClick={() => router.push(`/flashcards/${deck.id}`)}>
                    Study Deck
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {decks.length === 0 && (
          <Card padding="compact" variant="default" className="text-center py-12">
            <Body muted>No flashcard decks available yet.</Body>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
