"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { getFlashcardDecks } from "@/lib/store";
import type { FlashcardDeck, Subject } from "@/types";
import {
  GraduationCap,
  Stack,
  Sparkle,
  CalendarBlank,
  LockKey,
  Building,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";

const subjectTabs: { id: string; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "english", label: "ENGLISH" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
];

export default function FlashcardsPage() {
  const router = useRouter();
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [secondaryFilter, setSecondaryFilter] = useState("all");

  useEffect(() => {
    setDecks(getFlashcardDecks());
  }, []);

  const secondaryTabs = useMemo(() => {
    const filtered = subjectFilter === "all" ? decks : decks.filter(d => d.subject === subjectFilter);
    const isEnglish = subjectFilter === "all" || subjectFilter === "english";

    if (isEnglish) {
      const shifts = [...new Set(filtered.map(d => d.shift).filter(Boolean))] as number[];
      shifts.sort((a, b) => b - a);
      return [
        { id: "all", label: "ALL SHIFTS" },
        ...shifts.map(s => ({ id: String(s), label: `SHIFT ${s}` })),
      ];
    }

    const chapters = [...new Set(filtered.map(d => d.chapter).filter(Boolean))] as string[];
    return [
      { id: "all", label: "ALL CHAPTERS" },
      ...chapters.map(c => ({ id: c, label: c.toUpperCase() })),
    ];
  }, [decks, subjectFilter]);

  useEffect(() => {
    setSecondaryFilter("all");
  }, [subjectFilter]);

  const filtered = useMemo(() => {
    let result = subjectFilter === "all" ? decks : decks.filter(d => d.subject === subjectFilter);
    if (secondaryFilter !== "all") {
      const isEnglish = subjectFilter === "all" || subjectFilter === "english";
      if (isEnglish) {
        result = result.filter(d => String(d.shift) === secondaryFilter);
      } else {
        result = result.filter(d => d.chapter === secondaryFilter);
      }
    }
    return result;
  }, [decks, subjectFilter, secondaryFilter]);

  const isEnglishActive = subjectFilter === "all" || subjectFilter === "english";

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

        <div className="space-y-3 animate-in animate-in-delay-1">
          <FilterTabs tabs={subjectTabs} onChange={setSubjectFilter} />
          {secondaryTabs.length > 1 && (
            <FilterTabs tabs={secondaryTabs} onChange={setSecondaryFilter} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in animate-in-delay-2">
          {filtered.map((deck) => {
            const isLocked = deck.isPremium && deck.freeCardCount === 0;
            return (
            <Card key={deck.id} variant={isLocked ? "default" : "interactive"} className="relative overflow-hidden">
              {isLocked && (
                <div className="absolute inset-0 bg-text-primary/[0.02] backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2">
                  <div className="size-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <LockKey size={24} weight="fill" className="text-brand-accent" />
                  </div>
                  <span className="text-[14px] font-bold text-text-primary">Premium Deck</span>
                  <Body size="meta" muted className="text-center px-6">
                    Unlock all cards to master this deck
                  </Body>
                  <Button size="sm" variant="primary" className="mt-1">
                    Unlock Now
                  </Button>
                </div>
              )}
              <div className={`space-y-4 ${isLocked ? "opacity-30" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="size-11 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center">
                    <GraduationCap size={22} weight="fill" className="text-brand-accent-dark" />
                  </div>
                  <Badge variant="accent" size="sm">{isLocked ? "Premium" : "Free"}</Badge>
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
                  <div className="flex items-center gap-3 mt-1.5">
                    <Badge variant="neutral" size="sm">
                      {deck.subject === "english" ? "ENGLISH" :
                       deck.subject === "accountancy" ? "ACCOUNTANCY" :
                       deck.subject === "business-studies" ? "BUSINESS STUDIES" : "ECONOMICS"}
                    </Badge>
                    {deck.shift && (
                      <div className="flex items-center gap-1">
                        <Building size={11} weight="fill" className="text-text-muted" />
                        <Body size="meta" muted>Shift {deck.shift}</Body>
                      </div>
                    )}
                    {deck.chapter && (
                      <div className="flex items-center gap-1">
                        <BookOpen size={11} weight="fill" className="text-text-muted" />
                        <Body size="meta" muted className="truncate max-w-[120px]">{deck.chapter}</Body>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {!isLocked && (
                    <Button size="sm" onClick={() => router.push(`/flashcards/${deck.id}`)}>
                      Study Deck
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <Card padding="compact" variant="default" className="text-center py-12">
            <Body muted>No flashcard decks match your filters.</Body>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
