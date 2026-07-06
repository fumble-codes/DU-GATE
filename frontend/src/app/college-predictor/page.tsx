"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  Sliders,
  Buildings,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

const subjects = ["Accountancy", "Economics", "Business Studies", "English"] as const;

export default function CollegePredictorPage() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(subjects.map((s) => [s, 0]))
  );

  function updateScore(subject: string, value: number) {
    setScores((prev) => ({ ...prev, [subject]: Math.max(0, Math.min(250, value)) }));
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const subjectMeta = [
    { subject: "Accountancy", icon: "A" },
    { subject: "Economics", icon: "E" },
    { subject: "Business Studies", icon: "B" },
    { subject: "English", icon: "En" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="animate-in">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={16} weight="fill" className="text-brand-accent" />
            <Label>Planning</Label>
          </div>
          <Heading as="h1">College Predictor</Heading>
          <Meta className="mt-1.5">
            Predict your college based on CUET scores using 2025 CSAS cutoff data
          </Meta>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-in animate-in-delay-1">
          <Card variant="default" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Heading as="h5">Score Calculator</Heading>
                <Badge variant="gold" size="md">
                  <Sliders size={12} weight="fill" />
                  Adjust scores
                </Badge>
              </div>

              <div className="space-y-5">
                {subjectMeta.map(({ subject, icon }) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-[6px] bg-brand-accent-subtle flex items-center justify-center text-brand-accent-dark text-[10px] font-bold">
                          {icon}
                        </div>
                        <Body size="sm">{subject}</Body>
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={250}
                          value={scores[subject]}
                          onChange={(e) => updateScore(subject, Number(e.target.value))}
                          className="w-16 text-right rounded-[6px] border border-border px-2 py-1 text-[13px] font-semibold bg-surface-card text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                        />
                        <Body size="meta" muted>/ 250</Body>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={250}
                      value={scores[subject]}
                      onChange={(e) => updateScore(subject, Number(e.target.value))}
                      className="w-full h-2 rounded-full bg-text-primary/5 appearance-none cursor-pointer accent-brand-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-accent [&::-webkit-slider-thumb]:shadow-card-hover [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div>
                  <Meta>Total Score</Meta>
                  <Heading as="h2">{total} / 1000</Heading>
                </div>
                <Button variant="accent">
                  <Buildings size={16} weight="fill" />
                  Predict Colleges
                </Button>
              </div>
            </div>
          </Card>

          <Card padding="list" variant="default">
            <div className="space-y-5">
              <Heading as="h5">Filters</Heading>

              <div className="space-y-4">
                <div>
                  <Body size="sm" className="mb-1.5">Program</Body>
                  <select className="w-full rounded-[10px] border border-border px-3 py-2.5 text-[13px] font-semibold bg-surface-card text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                    <option>B.Com (Hons)</option>
                    <option>B.Com (Pass)</option>
                  </select>
                </div>
                <div>
                  <Body size="sm" className="mb-1.5">Category</Body>
                  <select className="w-full rounded-[10px] border border-border px-3 py-2.5 text-[13px] font-semibold bg-surface-card text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                    <option>UR</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>EWS</option>
                    <option>PwBD</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10 text-text-muted">
                <div className="size-14 rounded-[12px] bg-brand-accent-subtle flex items-center justify-center mb-3">
                  <Calculator size={24} weight="fill" className="text-brand-accent-dark" />
                </div>
                <Meta>Adjust your scores above</Meta>
                <Meta>and click Predict to see</Meta>
                <Meta>matching colleges</Meta>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center animate-in animate-in-delay-2">
          <Meta>
            Data source: CSAS 2025 official cutoff. Covers B.Com (Hons) & B.Com (Pass) across all categories.
          </Meta>
        </div>
      </div>
    </AppLayout>
  );
}
