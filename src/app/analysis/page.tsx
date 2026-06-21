"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkle,
  TrendUp,
  TrendDown,
  ArrowRight,
  BookOpen,
  Clock,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";

type FilterMode = "all" | "mocks" | "chapters";

const subjects = [
  { name: "Accountancy", accuracy: 72 },
  { name: "Business Studies", accuracy: 68 },
  { name: "Economics", accuracy: 75 },
  { name: "English", accuracy: 82 },
];

const chapters = [
  { name: "Ch1-Partnership", pct: 42, correct: 12, total: 28 },
  { name: "Ch2-Admission", pct: 65, correct: 24, total: 37 },
  { name: "Ch3-Retirement", pct: 88, correct: 44, total: 50 },
  { name: "Ch4-Dissolution", pct: 82, correct: 41, total: 50 },
  { name: "Ch5-ShareCapital", pct: 25, correct: 8, total: 31 },
  { name: "Ch6-Debentures", pct: 15, correct: 5, total: 32 },
  { name: "Ch7-FinStatements", pct: 38, correct: 14, total: 37 },
  { name: "Ch8-Analysis", pct: 20, correct: 7, total: 35 },
  { name: "Ch9-Ratios", pct: 12, correct: 4, total: 33 },
  { name: "Ch10-CashFlow", pct: 0, correct: 0, total: 28 },
];

function generateHeatmap() {
  const cells: { day: number; week: number; level: number }[] = [];
  for (let w = 0; w < 12; w++) {
    for (let d = 0; d < 7; d++) {
      cells.push({ week: w, day: d, level: Math.floor(Math.random() * 5) });
    }
  }
  return cells;
}

const heatmapData = generateHeatmap();
const levelColors = [
  "bg-text-primary/5",
  "bg-brand-accent-subtle",
  "bg-brand-accent/20",
  "bg-brand-accent/40",
  "bg-brand-accent/70",
];

function Heatmap() {
  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <div className="flex gap-1">
        {Array.from({ length: 12 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => {
              const cell = heatmapData.find((c) => c.week === w && c.day === d);
              const lvl = cell?.level ?? 0;
              return (
                <div
                  key={d}
                  className={`size-3 rounded-[3px] ${levelColors[lvl]} transition-colors duration-150 hover:ring-1 hover:ring-brand-accent/40 cursor-default`}
                  title={`Week ${w + 1}, Day ${d + 1} — ${lvl === 0 ? "No activity" : `${lvl * 10} questions`}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function SubjectBar({ name, pct }: { name: string; pct: number }) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-border last:border-b-0">
      <span className="w-[130px] shrink-0 text-[14px] font-semibold text-text-primary">{name}</span>
      <div className="flex-1 h-[6px] rounded-full bg-text-primary/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-light transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-[34px] text-right text-[13px] font-mono font-bold text-brand-accent-dark">{pct}%</span>
    </div>
  );
}

function ChapterRow({ ch }: { ch: typeof chapters[number] }) {
  const barColor = ch.pct >= 80 ? "bg-status-success" : ch.pct >= 40 ? "bg-brand-accent" : "bg-brand-pop/60";
  return (
    <div
      className="group flex items-center gap-3 px-4 py-2.5 rounded-[8px] transition-colors duration-150 hover:bg-text-primary/[0.03] cursor-pointer"
      title="Click to practice this chapter"
    >
      <span className="w-[150px] shrink-0 text-[13px] font-semibold text-text-primary group-hover:text-text-secondary transition-colors">
        {ch.name}
      </span>
      <div className="flex-1 h-[7px] rounded-full bg-text-primary/5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${ch.pct}%` }} />
      </div>
      <span className="w-[38px] text-right text-[13px] font-mono font-bold text-brand-accent-dark">{ch.pct}%</span>
      <span className="w-[50px] text-right text-[12px] font-mono font-medium text-text-muted">{ch.correct}/{ch.total}</span>
    </div>
  );
}

const filters: { key: FilterMode; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "mocks", label: "MOCKS" },
  { key: "chapters", label: "CHAPTERS" },
];

export default function AnalysisPage() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>("all");

  return (
    <AppLayout>
      <div className="space-y-7">

        <div className="animate-in">
          <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-brand-accent mb-1.5">
            Performance
          </p>
          <h1 className="text-[30px] leading-[1.1] font-black tracking-[-0.02em] text-text-primary">
            Analyse your prep.
          </h1>
          <p className="text-[14px] leading-[1.6] font-medium text-text-muted mt-1 max-w-xl">
            Accuracy by chapter, trending, strong &amp; weak topics at a glance.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap animate-in animate-in-delay-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-[12px] font-bold font-mono uppercase tracking-[0.06em] rounded-[8px] transition-all ${
                activeFilter === f.key
                  ? "bg-text-primary text-white shadow-sm"
                  : "border border-border text-text-muted hover:text-text-secondary hover:border-border-hover"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in animate-in-delay-1">
          <div className="bg-surface-card rounded-card border border-border shadow-card p-5 border-b-3 border-b-brand-accent">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Overall Accuracy
            </p>
            <p className="text-[30px] font-black leading-[1] tracking-[-0.02em] text-text-primary mt-1.5">
              72%
            </p>
            <p className="text-[12px] font-medium text-text-muted mt-1">vs. 70% last week</p>
          </div>
          <div className="bg-surface-card rounded-card border border-border shadow-card p-5 border-b-3 border-b-brand-accent">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Questions Attempted
            </p>
            <p className="text-[30px] font-black leading-[1] tracking-[-0.02em] text-text-primary mt-1.5">
              856
            </p>
            <p className="text-[12px] font-medium text-text-muted mt-1">+124 this week</p>
          </div>
          <div className="bg-surface-card rounded-card border border-border shadow-card p-5 border-b-3 border-b-brand-pop">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Mocks Completed
            </p>
            <p className="text-[30px] font-black leading-[1] tracking-[-0.02em] text-text-primary mt-1.5">
              12
            </p>
            <p className="text-[12px] font-medium text-text-muted mt-1">3 pending review</p>
          </div>
          <div className="bg-surface-card rounded-card border border-border shadow-card p-5 border-b-3 border-b-status-success">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Chapters Mastered
            </p>
            <p className="text-[30px] font-black leading-[1] tracking-[-0.02em] text-text-primary mt-1.5">
              6/13
            </p>
            <p className="text-[12px] font-medium text-text-muted mt-1">46% complete</p>
          </div>
        </div>

        <Card className="animate-in animate-in-delay-2">
          <div className="flex items-center gap-2 mb-3">
            <CalendarBlank size={16} weight="fill" className="text-brand-accent" />
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Activity — Last 12 Weeks
            </p>
          </div>
          <Heatmap />
          <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-border">
            <span className="text-[10px] font-medium text-text-muted">Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`size-3 rounded-[3px] ${c}`} />
            ))}
            <span className="text-[10px] font-medium text-text-muted">More</span>
          </div>
        </Card>

        <div className="animate-in animate-in-delay-2">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} weight="fill" className="text-brand-accent" />
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Subject-wise Accuracy
            </p>
          </div>
          <Card padding="none" className="!px-5 !py-1">
            {subjects.map((s) => (
              <SubjectBar key={s.name} name={s.name} pct={s.accuracy} />
            ))}
          </Card>
        </div>

        <div className="animate-in animate-in-delay-3">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} weight="fill" className="text-brand-accent" />
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
              Chapter-wise Breakdown
            </p>
          </div>
          <Card padding="none" className="!py-1">
            <div className="divide-y divide-border">
              {chapters.map((ch) => (
                <ChapterRow key={ch.name} ch={ch} />
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in animate-in-delay-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <TrendUp size={15} weight="fill" className="text-status-success" />
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
                Strongest Topics
              </p>
            </div>
            <ul className="space-y-3">
              <li>
                <p className="text-[14px] font-bold text-text-primary">Ch3-Retirement</p>
                <p className="text-[12px] font-medium text-text-muted">88% accuracy — 3 mocks completed</p>
              </li>
              <li>
                <p className="text-[14px] font-bold text-text-primary">Ch4-Dissolution</p>
                <p className="text-[12px] font-medium text-text-muted">82% accuracy — 2 mocks completed</p>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <TrendDown size={15} weight="fill" className="text-status-alert" />
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
                Weakest Topics
              </p>
            </div>
            <ul className="space-y-3">
              <li>
                <p className="text-[14px] font-bold text-text-primary">Ch10-CashFlow</p>
                <p className="text-[12px] font-medium text-text-muted">
                  0% — not started. <span className="text-status-alert font-semibold">High priority</span>
                </p>
              </li>
              <li>
                <p className="text-[14px] font-bold text-text-primary">Ch9-Ratios</p>
                <p className="text-[12px] font-medium text-text-muted">12% — 4 questions attempted</p>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Sparkle size={15} weight="fill" className="text-brand-accent" />
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-text-muted">
                Recent Trends
              </p>
            </div>
            <ul className="space-y-3">
              <li>
                <p className="text-[14px] font-bold text-text-primary">
                  Accuracy improving{" "}
                  <TrendUp size={13} weight="bold" className="inline-block text-status-success -mt-0.5" />
                </p>
                <p className="text-[12px] font-medium text-text-muted">70% → 72% → 74% (last 3 weeks)</p>
              </li>
              <li>
                <p className="text-[14px] font-bold text-text-primary">Most active on weekends</p>
                <p className="text-[12px] font-medium text-text-muted">5-6 hrs/weekend vs 1-2 hrs/weekday</p>
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}
