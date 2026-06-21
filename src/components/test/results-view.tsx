"use client";

import { useMemo } from "react";
import Link from "next/link";
import type { TestAttempt, TestDefinition, Question } from "@/types";
import { getTestDefinition, getQuestion } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, XCircle, MinusCircle, Clock, ChartBar,
  ArrowLeft, ArrowRight, Repeat,
} from "@phosphor-icons/react/dist/ssr";

interface ResultsViewProps {
  attempt: TestAttempt;
}

export function ResultsView({ attempt }: ResultsViewProps) {
  const testDef = getTestDefinition(attempt.testId);
  const questions = testDef ? testDef.questionIds.map(id => getQuestion(id)).filter(Boolean) as Question[] : [];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  const percent = attempt.total > 0 ? Math.round((attempt.score / attempt.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top navigation */}
      <div className="flex items-center gap-2">
        <Link href={attempt.type === "mock" ? "/mocks" : "/pyq"}>
          <Button variant="outline" size="sm">
            <ArrowLeft size={13} weight="bold" />
            Back to {attempt.type === "mock" ? "Mocks" : "PYQ"}
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ChartBar size={13} weight="fill" />
            Dashboard
          </Button>
        </Link>
      </div>

      {/* Score Hero */}
      <Card variant="default" className="relative overflow-hidden bg-topo">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/8 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
        <div className="relative z-0 text-center py-8">
          <Label className="block mb-1">Test Completed</Label>
          <Heading as="h2" className="mb-1">{attempt.title}</Heading>
          <div className="mt-4">
            <span className="text-[56px] font-bold leading-[0.9] tracking-[-0.03em] text-text-primary">
              {attempt.score}
            </span>
            <span className="text-[24px] text-text-muted font-semibold"> / {attempt.total}</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-[16px] font-semibold text-text-secondary">{percent}%</span>
            <Badge variant={percent >= 70 ? "success" : percent >= 40 ? "accent" : "alert"} size="sm">
              {percent >= 70 ? "PASSED" : percent >= 40 ? "AVERAGE" : "NEEDS IMPROVEMENT"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card padding="compact" variant="default" className="flex items-center gap-3">
          <CheckCircle size={18} weight="fill" className="text-status-success shrink-0" />
          <div>
            <Label>Correct</Label>
            <p className="text-[20px] font-bold text-text-primary">{attempt.correct}</p>
          </div>
        </Card>
        <Card padding="compact" variant="default" className="flex items-center gap-3">
          <XCircle size={18} weight="fill" className="text-status-alert shrink-0" />
          <div>
            <Label>Incorrect</Label>
            <p className="text-[20px] font-bold text-text-primary">{attempt.incorrect}</p>
          </div>
        </Card>
        <Card padding="compact" variant="default" className="flex items-center gap-3">
          <MinusCircle size={18} weight="fill" className="text-text-muted shrink-0" />
          <div>
            <Label>Skipped</Label>
            <p className="text-[20px] font-bold text-text-primary">{attempt.skipped}</p>
          </div>
        </Card>
        <Card padding="compact" variant="default" className="flex items-center gap-3">
          <Clock size={18} weight="fill" className="text-brand-accent shrink-0" />
          <div>
            <Label>Time Taken</Label>
            <p className="text-[20px] font-bold text-text-primary">{formatTime(attempt.timeTaken)}</p>
          </div>
        </Card>
      </div>

      {/* Question Review */}
      <Card padding="list" variant="default">
        <Heading as="h5" className="mb-4">Question Review</Heading>
        <div className="divide-y divide-border">
          {questions.map((q, idx) => {
            const userAns = attempt.answers[q?.id ?? ""];
            const isCorrect = userAns === q?.correctAnswer;
            const isSkipped = userAns === null || userAns === undefined;
            const isMarked = attempt.markedForReview.includes(q?.id ?? "");
            return (
              <div key={q?.id ?? idx} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className={`size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
                    ${isSkipped ? "bg-text-primary/5 text-text-muted" : isCorrect ? "bg-status-success-light text-status-success" : "bg-status-alert-light text-status-alert"}`}>
                    {isSkipped ? <MinusCircle size={14} weight="fill" /> : isCorrect ? <CheckCircle size={14} weight="fill" /> : <XCircle size={14} weight="fill" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-semibold text-text-muted">Q{idx + 1}.</span>
                      {isMarked && <Badge variant="accent" size="sm">Marked</Badge>}
                    </div>
                    <p className="text-[13px] font-medium text-text-primary">{q?.text}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1.5">
                      {(q?.options ?? []).map((opt, oi) => {
                        const letter = String.fromCharCode(65 + oi);
                        const isUserAnswer = userAns === oi;
                        const isCorrectAnswer = q?.correctAnswer === oi;
                        return (
                          <div key={oi} className={`flex items-center gap-1.5 text-[12px]
                            ${isCorrectAnswer ? "text-status-success font-bold" : ""}
                            ${isUserAnswer && !isCorrect ? "text-status-alert font-bold" : ""}
                            ${!isUserAnswer && !isCorrectAnswer ? "text-text-secondary" : ""}`}>
                            <span>{letter}.</span>
                            <span className="truncate">{opt}</span>
                            {isCorrectAnswer && <CheckCircle size={10} weight="fill" className="shrink-0" />}
                            {isUserAnswer && !isCorrect && <XCircle size={10} weight="fill" className="shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                    {q?.explanation && (isSkipped || !isCorrect) && (
                      <p className="mt-2 text-[12px] text-text-secondary bg-text-primary/[0.02] rounded-[6px] p-2">
                        <span className="font-semibold">Explanation: </span>{q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

    </div>
  );
}
