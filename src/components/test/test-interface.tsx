"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Question, TestDefinition, TestAttempt } from "@/types";
import { getQuestions, saveAttempt, submitAttempt } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Heading, Body } from "@/components/ui/typography";
import {
  Clock,
  Flag,
  CheckCircle,
  Circle,
  DotsNine,
  ArrowLeft,
  ArrowRight,
  PaperPlaneTilt,
  StopCircle,
} from "@phosphor-icons/react/dist/ssr";

interface TestInterfaceProps {
  testDef: TestDefinition;
}

export function TestInterface({ testDef }: TestInterfaceProps) {
  const router = useRouter();
  const questions = getQuestions(testDef.questionIds);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(testDef.duration * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const attemptIdRef = useRef(`attempt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  const startTimeRef = useRef(Date.now());
  const [attemptSaved, setAttemptSaved] = useState(false);

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.values(answers).filter(a => a !== null && a !== undefined).length;
  const markedCount = markedForReview.length;
  const unansweredCount = Object.keys(answers).filter(k => answers[k] === null || answers[k] === undefined).length;

  /* Save attempt on mount */
  useEffect(() => {
    if (attemptSaved) return;
    const attempt: TestAttempt = {
      id: attemptIdRef.current,
      testId: testDef.id,
      type: testDef.type,
      title: testDef.title,
      status: "in-progress",
      startedAt: new Date(startTimeRef.current).toISOString(),
      answers: {},
      markedForReview: [],
      score: 0,
      total: testDef.totalMarks,
      correct: 0,
      incorrect: 0,
      skipped: totalQ,
      timeTaken: 0,
    };
    saveAttempt(attempt);
    setAttemptSaved(true);
  }, [testDef, attemptSaved, totalQ]);

  /* Timer */
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleClear = () => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: null }));
  };

  const handleMarkReview = () => {
    setMarkedForReview(prev =>
      prev.includes(currentQ.id) ? prev.filter(id => id !== currentQ.id) : [...prev, currentQ.id],
    );
    if (currentIdx < totalQ - 1) setCurrentIdx(prev => prev + 1);
  };

  const handleSaveNext = () => {
    if (currentIdx < totalQ - 1) setCurrentIdx(prev => prev + 1);
  };

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const attemptId = attemptIdRef.current;
    submitAttempt(attemptId, answers, markedForReview, timeTaken);
    router.push(`/results/${attemptId}`);
  }, [isSubmitted, answers, markedForReview, router]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getPaletteStatus = (q: Question): "unseen" | "unanswered" | "answered" | "review" => {
    const isAnswered = q.id in answers && answers[q.id] !== null && answers[q.id] !== undefined;
    const isMarked = markedForReview.includes(q.id);
    if (isMarked && isAnswered) return "review";
    if (isAnswered) return "answered";
    if (isMarked) return "review";
    if (q.id in answers) return "unanswered";
    return "unseen";
  };

  const paletteDot = (status: string) => {
    switch (status) {
      case "answered": return "bg-status-success";
      case "review": return "bg-brand-accent";
      case "unanswered": return "bg-status-alert";
      default: return "bg-text-primary/10";
    }
  };

  if (!currentQ) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Body>No questions available for this test.</Body>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-32px)] rounded-card bg-surface-card border border-border shadow-card overflow-hidden">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-elevated shrink-0">
        <div className="flex items-center gap-2.5">
          <Clock size={16} weight="fill" className={`${timeLeft < 300 ? "text-status-alert" : "text-text-muted"}`} />
          <span className={`text-[15px] font-bold font-mono ${timeLeft < 300 ? "text-status-alert" : "text-text-primary"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <Heading as="h5" className="text-center">{testDef.title}</Heading>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-text-muted">Q</span>
          <span className="text-[15px] font-bold text-text-primary">{currentIdx + 1}</span>
          <span className="text-[13px] text-text-muted">/ {totalQ}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Question Palette (left sidebar) ── */}
        <div className="w-[200px] shrink-0 border-r border-border bg-surface-elevated/50 overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-3">
            <DotsNine size={14} weight="fill" className="text-text-muted" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-muted">Questions</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const status = getPaletteStatus(q);
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`size-[32px] rounded-[6px] text-[12px] font-bold flex items-center justify-center transition-all
                    ${isCurrent ? "ring-2 ring-brand-accent ring-offset-1" : ""}
                    ${status === "answered" ? "bg-status-success text-white" : ""}
                    ${status === "review" ? "bg-brand-accent text-white" : ""}
                    ${status === "unanswered" ? "bg-status-alert/10 text-status-alert border border-status-alert/30" : ""}
                    ${status === "unseen" && !isCurrent ? "bg-text-primary/[0.03] text-text-secondary border border-border" : ""}
                  `}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-border space-y-1.5">
            {[
              { color: "bg-status-success", label: "Answered" },
              { color: "bg-brand-accent", label: "Marked" },
              { color: "bg-status-alert/10 border border-status-alert/30", label: "Not answered" },
              { color: "bg-text-primary/10", label: "Not visited" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`size-3 rounded-[3px] ${l.color}`} />
                <span className="text-[10px] text-text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Question Area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-2">
              <span className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.06em]">
                Q{currentIdx + 1}. {currentQ.chapter} · {currentQ.difficulty}
              </span>
            </div>
            <p className="text-[16px] font-semibold text-text-primary leading-[1.6] mb-6">
              {currentQ.text}
            </p>
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = answers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-[10px] text-left transition-all
                      ${isSelected
                        ? "bg-brand-accent/10 border-2 border-brand-accent"
                        : "bg-text-primary/[0.02] border-2 border-transparent hover:border-border-hover"
                      }`}
                  >
                    <span className={`size-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0
                      ${isSelected ? "bg-brand-accent text-white" : "bg-text-primary/5 text-text-secondary"}`}>
                      {letter}
                    </span>
                    <span className={`text-[14px] font-medium ${isSelected ? "text-text-primary" : "text-text-primary"}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Bottom Controls ── */}
          <div className="border-t border-border bg-surface-elevated/50 p-4 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4 text-[12px] font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={13} weight="fill" className="text-status-success" />
                  Answered: {answeredCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flag size={13} weight="fill" className="text-brand-accent" />
                  Marked: {markedCount}
                </span>
                <span className="flex items-center gap-1.5">
                  <Circle size={13} weight="fill" className="text-text-muted" />
                  Left: {totalQ - answeredCount}
                </span>
              </div>
              <Button
                size="sm"
                variant="alert"
                shape="pill"
                onClick={handleSubmit}
              >
                <StopCircle size={13} weight="fill" />
                Submit
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  shape="pill"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant={markedForReview.includes(currentQ.id) ? "accent" : "outline"}
                  shape="pill"
                  onClick={handleMarkReview}
                >
                  <Flag size={12} weight={markedForReview.includes(currentQ.id) ? "fill" : "regular"} />
                  {markedForReview.includes(currentQ.id) ? "Unmark" : "Mark for Review"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  shape="pill"
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                >
                  <ArrowLeft size={12} weight="bold" />
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  shape="pill"
                  onClick={handleSaveNext}
                  disabled={currentIdx === totalQ - 1}
                >
                  Save & Next
                  <ArrowRight size={12} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
