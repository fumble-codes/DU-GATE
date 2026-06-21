"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { getFlashcardDeck, getFlashcards } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FlashcardDeck, Flashcard } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  LockKey,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

export default function DeckStudyPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const d = getFlashcardDeck(deckId);
    const c = getFlashcards(deckId);
    setDeck(d ?? null);
    setCards(c);
  }, [deckId]);

  if (!deck) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Body muted>Deck not found.</Body>
        <Link href="/flashcards" className="mt-4 inline-block">
          <Button variant="outline" size="sm">
            <ArrowLeft size={13} weight="bold" />
            Back to Flashcards
          </Button>
        </Link>
      </div>
    );
  }

  const currentCard = cards[currentIdx];
  const isLocked = deck.isPremium && currentIdx >= deck.freeCardCount;
  const total = cards.length;
  const freeCount = deck.freeCardCount;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link href="/flashcards">
          <Button variant="outline" size="sm">
            <ArrowLeft size={13} weight="bold" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">{deck.subject.toUpperCase()}</Badge>
          {deck.date && <Badge variant="accent" size="sm">{deck.date}</Badge>}
        </div>
      </div>

      {/* Progress */}
      <div className="text-center">
        <Heading as="h3">{deck.title}</Heading>
        <Body size="meta" muted className="mt-1">
          Card {currentIdx + 1} of {total}
        </Body>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-text-primary/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="relative">
        <div
          className="relative w-full aspect-[3/2] cursor-pointer perspective-[1000px]"
          onClick={() => !isLocked && setFlipped(!flipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
            {/* Front */}
            <div className="absolute inset-0 rounded-card bg-surface-card border border-border shadow-card flex flex-col items-center justify-center p-8 backface-visibility-hidden">
              {isLocked ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <LockKey size={32} weight="fill" className="text-brand-accent" />
                  </div>
                  <Heading as="h4" className="text-center">Locked Card</Heading>
                  <Body muted className="text-center">
                    Unlock this deck to access all {total} cards
                  </Body>
                  <Button variant="primary" size="sm" className="mt-2">
                    <Sparkle size={14} weight="fill" />
                    Unlock Now — ₹49
                  </Button>
                  <Body size="meta" muted className="text-center">
                    {freeCount} free card{freeCount > 1 ? "s" : ""} available. Unlock to access all {total} cards.
                  </Body>
                </div>
              ) : currentCard ? (
                <>
                  <Badge variant="neutral" size="sm" className="absolute top-4 left-4">
                    {flipped ? "Meaning" : "Word"}
                  </Badge>
                  <span className="text-[28px] font-bold text-text-primary text-center leading-[1.3]">
                    {flipped ? currentCard.back : currentCard.front}
                  </span>
                  {flipped && currentCard.backExtra && (
                    <span className="mt-4 text-[16px] text-text-secondary text-center leading-[1.5]">
                      {currentCard.backExtra}
                    </span>
                  )}
                  {!flipped && (
                    <Body size="meta" muted className="absolute bottom-4">
                      Tap to reveal meaning
                    </Body>
                  )}
                  {flipped && (
                    <Body size="meta" muted className="absolute bottom-4">
                      Tap to see word
                    </Body>
                  )}
                </>
              ) : (
                <Body muted>No cards in this deck.</Body>
              )}
            </div>

            {/* Back (same as front since we flip via 3D transform) */}
            <div className="absolute inset-0 rounded-card bg-surface-card border border-border shadow-card flex flex-col items-center justify-center p-8 backface-visibility-hidden rotate-y-180">
              {currentCard && !isLocked && (
                <>
                  <Badge variant="neutral" size="sm" className="absolute top-4 left-4">
                    {flipped ? "Word" : "Meaning"}
                  </Badge>
                  <span className="text-[28px] font-bold text-text-primary text-center leading-[1.3]">
                    {flipped ? currentCard.front : currentCard.back}
                  </span>
                  {!flipped && currentCard.backExtra && (
                    <span className="mt-4 text-[16px] text-text-secondary text-center leading-[1.5]">
                      {currentCard.backExtra}
                    </span>
                  )}
                  {flipped ? (
                    <Body size="meta" muted className="absolute bottom-4">
                      Tap to see meaning
                    </Body>
                  ) : (
                    <Body size="meta" muted className="absolute bottom-4">
                      Tap to see word
                    </Body>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setCurrentIdx(prev => Math.max(0, prev - 1)); setFlipped(false); }}
          disabled={currentIdx === 0}
        >
          <ArrowLeft size={13} weight="bold" />
          Previous
        </Button>
        <Body size="meta" muted>
          {currentIdx + 1} / {total}
          {isLocked && ` · Free cards: ${freeCount}`}
        </Body>
        <Button
          variant="primary"
          size="sm"
          onClick={() => { setCurrentIdx(prev => Math.min(total - 1, prev + 1)); setFlipped(false); }}
          disabled={currentIdx === total - 1}
        >
          Next
          <ArrowRight size={13} weight="bold" />
        </Button>
      </div>
    </div>
  );
}
