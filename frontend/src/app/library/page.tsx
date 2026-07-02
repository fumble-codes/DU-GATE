"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterTabs } from "@/components/ui/filter-tabs";
import { getSavedQuestions, getErrorQuestions, toggleSavedQuestion, removeErrorQuestion, getQuestion } from "@/lib/store";
import type { Question, Subject } from "@/types";
import {
  BookmarkSimple,
  Bookmark,
  MagnifyingGlass,
  Sparkle,
  XCircle,
  Trash,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

const tabs = [
  { id: "saved", label: "SAVED" },
  { id: "errors", label: "ERRORS" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("saved");
  const [subjectFilter, setSubjectFilter] = useState<"all" | Subject>("all");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [errorIds, setErrorIds] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const load = () => {
    setSavedIds(getSavedQuestions());
    setErrorIds(getErrorQuestions());
  };

  useEffect(() => { load(); }, []);

  const ids = activeTab === "saved" ? savedIds : errorIds;
  const allQs = ids.map(id => getQuestion(id)).filter(Boolean) as Question[];

  const filtered = allQs.filter(q => {
    if (subjectFilter !== "all" && q.subject !== subjectFilter) return false;
    if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleToggleSave = (id: string) => {
    const newState = toggleSavedQuestion(id);
    if (!newState) setSavedIds(prev => prev.filter(s => s !== id));
    else setSavedIds(prev => [...prev, id]);
  };

  const handleRemoveError = (id: string) => {
    removeErrorQuestion(id);
    setErrorIds(prev => prev.filter(e => e !== id));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <Label>My Questions</Label>
          <Heading as="h1">Question Library</Heading>
          <Meta className="mt-1.5">
            Review bookmarked questions and revisit your mistakes
          </Meta>
        </div>

        <div className="flex items-center gap-3 animate-in animate-in-delay-1">
          <FilterTabs tabs={tabs} onChange={setActiveTab} defaultTab="saved" />
        </div>

        <div className="flex items-center gap-3 animate-in animate-in-delay-2">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass size={16} weight="fill" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-surface-card text-[13px] font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent/30 transition-all"
            />
          </div>
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value as "all" | Subject)}
            className="rounded-[10px] border border-border px-3 py-2.5 text-[12px] font-semibold bg-surface-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
          >
            <option value="all">All Subjects</option>
            <option value="accountancy">Accountancy</option>
            <option value="business-studies">Business Studies</option>
            <option value="economics">Economics</option>
            <option value="english">English</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <Card padding="list" variant="default" className="animate-in animate-in-delay-3">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="size-14 rounded-[12px] bg-brand-accent-subtle flex items-center justify-center mb-4">
                {activeTab === "saved"
                  ? <BookmarkSimple size={24} weight="fill" className="text-brand-accent-dark" />
                  : <XCircle size={24} weight="fill" className="text-status-alert" />
                }
              </div>
              <Heading as="h4">
                {activeTab === "saved" ? "No questions saved yet" : "No errors recorded yet"}
              </Heading>
              <Meta className="mt-1.5 mb-5 text-center max-w-sm">
                {activeTab === "saved"
                  ? "Bookmark questions during tests using the save button to review them here"
                  : "Questions you answer incorrectly in tests will automatically appear here"
                }
              </Meta>
              {activeTab === "saved" && (
                <Button variant="accent" size="sm" onClick={() => window.location.href = "/mocks"}>
                  Browse Mock Tests
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-3 animate-in animate-in-delay-3">
            <div className="flex items-center justify-between">
              <Body size="meta" muted>{filtered.length} question{filtered.length !== 1 ? "s" : ""}</Body>
            </div>
            {filtered.map((q) => {
              const isSaved = savedIds.includes(q.id);
              return (
                <Card key={q.id} padding="list" variant="default">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={q.bank === "pyq" ? "gold" : "accent"} size="sm">
                          {q.bank === "pyq" ? "PYQ" : "Mock"}
                        </Badge>
                        <Badge variant="neutral" size="sm">{q.subject}</Badge>
                        <Badge variant="neutral" size="sm">{q.chapter}</Badge>
                        {q.year && <Badge variant="neutral" size="sm">{q.year}</Badge>}
                      </div>
                      <p className="text-[14px] font-medium text-text-primary leading-[1.5]">{q.text}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                        {q.options.map((opt, oi) => (
                          <div key={oi} className={`flex items-center gap-1.5 text-[12px] ${q.correctAnswer === oi ? "text-status-success font-semibold" : "text-text-secondary"}`}>
                            <span>{String.fromCharCode(65 + oi)}.</span>
                            <span className="truncate">{opt}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[12px] text-text-secondary mt-2 bg-text-primary/[0.02] rounded-[6px] p-2">
                        <span className="font-semibold">Explanation: </span>{q.explanation}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleSave(q.id)}
                        className="size-8 rounded-[6px] flex items-center justify-center hover:bg-text-primary/5 transition-colors"
                        title={isSaved ? "Unsave" : "Save"}
                      >
                        <BookmarkSimple size={16} weight={isSaved ? "fill" : "regular"} className={isSaved ? "text-brand-accent" : "text-text-muted"} />
                      </button>
                      {activeTab === "errors" && (
                        <button
                          onClick={() => handleRemoveError(q.id)}
                          className="size-8 rounded-[6px] flex items-center justify-center hover:bg-status-alert/5 transition-colors"
                          title="Remove from errors"
                        >
                          <Trash size={14} className="text-status-alert" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
