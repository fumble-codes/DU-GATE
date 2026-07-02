"use client";

import { useState, useEffect, use, useCallback } from "react";
import Link from "next/link";
import { getFlashcardDeck, getFlashcards } from "@/lib/store";
import { Heading, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { FlashcardDeck, Flashcard } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  LockKey,
  Sparkle,
  ArrowsClockwise,
  CheckCircle,
  Translate,
} from "@phosphor-icons/react/dist/ssr";

const difficultyColors: Record<string, string> = {
  easy: "text-status-success bg-status-success-light",
  medium: "text-brand-accent bg-brand-accent-subtle",
  hard: "text-status-alert bg-status-alert-light",
};

export default function DeckStudyPage({ params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = use(params);
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  useEffect(() => {
    const d = getFlashcardDeck(deckId);
    const c = getFlashcards(deckId);
    setDeck(d ?? null);
    setCards(c);
  }, [deckId]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setFlipped(prev => !prev);
    }
    if (e.key === "ArrowRight") {
      setCurrentIdx(prev => Math.min(cards.length - 1, prev + 1));
      setFlipped(false);
    }
    if (e.key === "ArrowLeft") {
      setCurrentIdx(prev => Math.max(0, prev - 1));
      setFlipped(false);
    }
  }, [cards.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setFlipped(false);
  }, [currentIdx]);

  if (!deck) {
    return (
      <div className="p-6 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Body muted>Deck not found.</Body>
        <Link href="/flashcards">
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
  const masteredCount = mastered.size;
  const progress = total > 0 ? ((currentIdx + 1) / total) * 100 : 0;

  const handleMasterToggle = () => {
    if (!currentCard) return;
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(currentCard.id)) next.delete(currentCard.id);
      else next.add(currentCard.id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-canvas-bg flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/flashcards">
            <button className="size-9 rounded-full bg-text-primary/5 hover:bg-text-primary/10 flex items-center justify-center transition-colors">
              <ArrowLeft size={16} weight="bold" className="text-text-primary" />
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="neutral" size="sm">{deck.subject.toUpperCase()}</Badge>
            {deck.shift && <Badge variant="accent" size="sm">Shift {deck.shift}</Badge>}
            {deck.chapter && <Badge variant="accent" size="sm">{deck.chapter}</Badge>}
            {deck.date && <Badge variant="accent" size="sm">{deck.date}</Badge>}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col gap-5">
        {/* Header */}
        <div className="text-center">
          <Heading as="h4" className="text-[18px]">{deck.title}</Heading>
          <div className="flex items-center justify-center gap-3 mt-1.5">
            <Body size="meta" muted>
              {currentIdx + 1} / {total}
            </Body>
            <span className="text-text-muted/30">·</span>
            <Body size="meta" muted>
              {masteredCount} mastered
            </Body>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-text-primary/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="relative flex-1 flex items-center justify-center">
          {isLocked ? (
            <div className="w-full aspect-[4/3] rounded-2xl bg-white border border-border shadow-card flex flex-col items-center justify-center gap-4 p-8">
              <div className="size-16 rounded-full bg-brand-accent/10 flex items-center justify-center">
                <LockKey size={32} weight="fill" className="text-brand-accent" />
              </div>
              <Heading as="h4" className="text-center">Locked Card</Heading>
              <Body muted className="text-center max-w-xs">
                Unlock this deck to access all {total} cards
              </Body>
              <Button variant="primary" size="sm" className="mt-1">
                <Sparkle size={14} weight="fill" />
                Unlock Now — ₹49
              </Button>
              <Body size="meta" muted className="text-center">
                {freeCount} free card{freeCount > 1 ? "s" : ""} available
              </Body>
            </div>
          ) : currentCard ? (
            <div className="w-full">
              {/* Tap hint */}
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <ArrowsClockwise size={12} weight="regular" className="text-text-muted" />
                <Body size="meta" muted>
                  {flipped ? "Tap card or press Space to flip back" : "Tap card or press Space to flip"}
                </Body>
              </div>

              {/* Card */}
              <div
                className="relative w-full aspect-[4/3] cursor-pointer perspective-[1000px]"
                onClick={() => setFlipped(!flipped)}
              >
                <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flipped ? "rotate-y-180" : ""}`}>
                  {/* ── Front: Word ── */}
                  <div className="absolute inset-0 rounded-2xl bg-white border border-border shadow-elevated flex flex-col items-center justify-center p-8 backface-visibility-hidden">
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge variant="neutral" size="sm">Word</Badge>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] ${difficultyColors[currentCard.difficulty ?? "medium"]}`}>
                        {currentCard.difficulty}
                      </span>
                    </div>
                    <span className="text-[36px] md:text-[42px] font-bold text-text-primary text-center leading-[1.2] tracking-[-0.02em]">
                      {currentCard.front}
                    </span>
                    <Body size="meta" muted className="absolute bottom-5 flex items-center gap-1.5">
                      <Translate size={12} />
                      Tap for meaning
                    </Body>
                  </div>

                  {/* ── Back: Meaning ── */}
                  <div className="absolute inset-0 rounded-2xl bg-white border border-border shadow-elevated flex flex-col items-center justify-center p-8 backface-visibility-hidden rotate-y-180">
                    <Badge variant="neutral" size="sm" className="absolute top-4 left-4">Meaning</Badge>
                    <div className="flex flex-col items-center justify-center gap-3 max-w-full text-center">
                      <span className="text-[22px] md:text-[26px] font-bold text-text-primary leading-[1.3]">
                        {currentCard.front}
                      </span>
                      <div className="w-10 h-[2px] rounded-full bg-brand-accent/40" />
                      <span className="text-[18px] font-semibold text-text-secondary leading-[1.4]">
                        {currentCard.back}
                      </span>
                      {currentCard.backExtra && (
                        <div className="mt-1 px-4 py-2.5 bg-brand-accent-subtle rounded-[10px]">
                          <span className="text-[15px] text-text-primary leading-[1.5]">
                            {currentCard.backExtra}
                          </span>
                        </div>
                      )}
                    </div>
                    <Body size="meta" muted className="absolute bottom-5 flex items-center gap-1.5">
                      <Translate size={12} />
                      Tap for word
                    </Body>
                  </div>
                </div>
              </div>

              {/* Mastered toggle */}
              {flipped && (
                <div className="flex justify-center mt-4 animate-in">
                  <button
                    onClick={handleMasterToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all ${
                      mastered.has(currentCard.id)
                        ? "bg-status-success-light text-status-success"
                        : "bg-text-primary/[0.03] text-text-muted hover:bg-text-primary/[0.06]"
                    }`}
                  >
                    <CheckCircle size={16} weight={mastered.has(currentCard.id) ? "fill" : "regular"} />
                    {mastered.has(currentCard.id) ? "Mastered! Mark as learning" : "Mark as mastered"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl bg-white border border-border shadow-card flex items-center justify-center">
              <Body muted>No cards in this deck.</Body>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setCurrentIdx(prev => Math.max(0, prev - 1)); }}
            disabled={currentIdx === 0}
            className="flex-1"
          >
            <ArrowLeft size={14} weight="bold" />
            Previous
          </Button>
          <Body size="meta" muted className="text-center px-2 whitespace-nowrap">
            {currentIdx + 1} / {total}
          </Body>
          <Button
            variant="primary"
            size="sm"
            onClick={() => { setCurrentIdx(prev => Math.min(total - 1, prev + 1)); }}
            disabled={currentIdx === total - 1}
            className="flex-1"
          >
            Next
            <ArrowRight size={14} weight="bold" />
          </Button>
        </div>

        {/* Keyboard hint */}
        <Body size="meta" muted className="text-center">
          Use ← → arrow keys to navigate · Space to flip
        </Body>
      </div>
    </div>
  );
}
