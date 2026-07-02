"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { NCERT_NOTES, type NcertNote } from "@/data/ncert-notes";
import {
  BookOpen,
  X,
  Sparkle,
  Clock,
  Article,
} from "@phosphor-icons/react/dist/ssr";

const subjectTabs = [
  { id: "all", label: "ALL" },
  { id: "accountancy", label: "ACCOUNTANCY" },
  { id: "business-studies", label: "BUSINESS STUDIES" },
  { id: "economics", label: "ECONOMICS" },
  { id: "english", label: "ENGLISH" },
];

const tagStyles: Record<string, string> = {
  important: "bg-brand-pop/10 text-brand-pop",
  definition: "bg-brand-accent/10 text-brand-accent-dark",
  formula: "bg-status-success/10 text-status-success",
  procedure: "bg-brand-accent/10 text-brand-accent-dark",
};

function NoteCard({ note, onOpen }: { note: NcertNote; onOpen: (id: string) => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Note: ${note.title}`}
      onClick={() => onOpen(note.id)}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(note.id); }}
      className="bg-surface-card border border-border rounded-[10px] p-[18px_20px] cursor-pointer transition-all duration-150 hover:border-brand-accent/30 hover:-translate-y-0.5"
    >
      <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-brand-accent mb-1.5">
        {note.kicker}
      </div>
      <h3 className="font-bold text-[15px] leading-[1.25] text-text-primary tracking-tight">
        {note.title}
      </h3>
      <div className="text-[11px] font-mono text-text-muted mt-0.5">
        {note.wordCount.toLocaleString()} words &middot; {note.readTime} min read
      </div>
      <div className="mt-2.5 pt-2.5 border-t border-border">
        <p className="text-[12px] leading-[1.6] text-text-muted line-clamp-2">
          {note.preview}
        </p>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5">
        {note.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-block text-[9px] font-mono font-semibold uppercase tracking-[0.06em] px-2 py-0.5 rounded-[3px] ${tagStyles[tag] || "bg-text-primary/5 text-text-muted"}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function NoteDetail({ note, onClose }: { note: NcertNote; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl max-h-[85vh] overflow-y-auto p-6">
        <div className="flex justify-end -mt-1 -mr-1 mb-1">
          <button
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-[6px] border border-border bg-white text-text-muted hover:bg-text-primary hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-brand-accent mb-1.5">
          {note.kicker}
        </div>

        <h2 className="font-black text-[22px] leading-[1.15] tracking-[-0.03em] text-text-primary mb-1">
          {note.title}
        </h2>

        <div className="text-[12px] font-mono text-text-muted mb-5">
          {note.wordCount.toLocaleString()} words &middot; {note.readTime} min read
        </div>

        {note.content.sections.map((section, si) => (
          <div key={si} className="mb-5">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-brand-accent pb-1 border-b border-border mb-2">
              {section.heading}
            </div>

            {section.paragraphs?.map((p, pi) => (
              <p key={pi} className="text-[13px] leading-[1.75] text-text-primary mb-2">
                {p}
              </p>
            ))}

            {section.formulas && section.formulas.length > 0 && (
              <div className="bg-text-primary text-white font-mono text-[12px] leading-[1.7] p-[10px_14px] rounded-[6px] mb-2 space-y-1">
                {section.formulas.map((f, fi) => (
                  <div key={fi}>{f}</div>
                ))}
              </div>
            )}

            {section.items && section.items.length > 0 && (
              <ul className="space-y-1 mb-2">
                {section.items.map((item, ii) => (
                  <li key={ii} className="text-[12px] leading-[1.65] text-text-primary flex items-start gap-2">
                    <span className="text-brand-accent mt-1 shrink-0">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-border">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-block text-[9px] font-mono font-semibold uppercase tracking-[0.06em] px-2 py-0.5 rounded-[3px] ${tagStyles[tag] || "bg-text-primary/5 text-text-muted"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NotesPage() {
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const selectedNote = useMemo(
    () => NCERT_NOTES.find((n) => n.id === selectedNoteId) ?? null,
    [selectedNoteId]
  );

  const filtered = useMemo(
    () =>
      subjectFilter === "all"
        ? NCERT_NOTES
        : NCERT_NOTES.filter((n) => n.subject.toLowerCase().replace(/\s+/g, "-") === subjectFilter),
    [subjectFilter]
  );

  const handleOpen = useCallback((id: string) => setSelectedNoteId(id), []);
  const handleClose = useCallback(() => setSelectedNoteId(null), []);

  return (
    <>
      <AppLayout>
        <div className="space-y-8">
          <div className="animate-in">
            <div className="flex items-center gap-2 mb-1">
              <Sparkle size={16} weight="fill" className="text-brand-accent" />
              <Label>Study Material</Label>
            </div>
            <Heading as="h1">NCERT Notes.</Heading>
            <p className="text-[13px] leading-[1.6] font-medium text-text-muted mt-1.5 max-w-lg">
              Concise, exam-mapped notes for every chapter. Built for fast revision.
            </p>
          </div>

          <div className="animate-in animate-in-delay-1">
            <FilterTabs tabs={subjectTabs} onChange={setSubjectFilter} />
          </div>

          <p className="text-[11px] font-medium text-text-muted animate-in animate-in-delay-1">
            Showing {filtered.length} note{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border-1.5 border-dashed border-border rounded-[10px] gap-2.5 animate-in animate-in-delay-2">
              <BookOpen size={28} weight="fill" className="text-text-muted" />
              <p className="text-[13px] font-semibold text-text-muted">No notes available</p>
              <p className="text-[12px] text-text-muted/60 max-w-[260px] text-center leading-[1.6]">
                Try selecting a different filter or check back soon for more content.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in animate-in-delay-2">
              {filtered.map((note) => (
                <NoteCard key={note.id} note={note} onOpen={handleOpen} />
              ))}
            </div>
          )}
        </div>
      </AppLayout>

      {selectedNote && <NoteDetail note={selectedNote} onClose={handleClose} />}
    </>
  );
}
