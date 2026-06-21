"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Label } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkle,
  TrendUp,
  TrendDown,
  Exam,
  Star,
  Brain,
  NotePencil,
  DiceSix,
  BookmarkSimple,
  Info,
  ArrowRight,
  ChartLineUp,
  Clock,
  CaretDown,
  SmileyWink,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

const mockTestData = [
  { label: "TEST 1", score: 142, time: 42 },
  { label: "TEST 2", score: 178, time: 35 },
  { label: "TEST 3", score: 156, time: 38 },
  { label: "TEST 4", score: 212, time: 28 },
  { label: "TEST 5", score: 186, time: 30 },
  { label: "TEST 6", score: 224, time: 22 },
  { label: "TEST 7", score: 198, time: 26 },
  { label: "TEST 8", score: 204, time: 24 },
];

const recentAttempts = [
  { date: "15/06/2026", test: "29 May Shift 1 - English", score: 42, badge: "WEAK" as const },
  { date: "12/06/2026", test: "28 May Shift 2 - Accountancy", score: 78, badge: "AVERAGE" as const },
  { date: "10/06/2026", test: "27 May Shift 1 - Business Studies", score: 112, badge: "EXCELLENT" as const },
  { date: "08/06/2026", test: "26 May Shift 3 - Economics", score: 65, badge: "AVERAGE" as const },
  { date: "05/06/2026", test: "25 May Shift 1 - English", score: 38, badge: "WEAK" as const },
  { date: "03/06/2026", test: "24 May Shift 2 - Accountancy", score: 134, badge: "EXCELLENT" as const },
];

const subjects = ["ALL SUBJECTS", "ACCOUNTANCY", "BUSINESS STUDIES", "ECONOMICS", "ENGLISH"];

const redFlags = [
  { subject: "ECONOMICS", topic: "National Income Accounting", volume: 11, accuracy: 54 },
  { subject: "ENGLISH", topic: "Reading Comprehension — Inferences", volume: 8, accuracy: 62 },
  { subject: "ACCOUNTANCY", topic: "Cash Flow Statement (AS-3)", volume: 14, accuracy: 71 },
  { subject: "BUSINESS STUDIES", topic: "Financial Management", volume: 6, accuracy: 48 },
];

function accuracyColor(acc: number) {
  if (acc >= 75) return "stroke-status-success text-status-success";
  return "stroke-[#EAB308] text-[#EAB308]";
}

function AccuracyGauge({ pct }: { pct: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const colorCls = pct >= 75 ? "stroke-status-success" : "stroke-[#EAB308]";
  return (
    <div className="relative size-16 flex items-center justify-center">
      <svg width="64" height="64" viewBox="0 0 64 64" className="transform -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-text-primary/5" />
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" className={colorCls} />
      </svg>
      <span className={`absolute text-[11px] font-bold font-mono ${pct >= 75 ? "text-status-success" : "text-[#EAB308]"}`}>
        {pct}%
      </span>
    </div>
  );
}

function SparkChart({ data, color, gradientId, suffix }: { data: { label: string; value: number }[]; color: string; gradientId: string; suffix?: string }) {
  const w = 600;
  const h = 180;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const vals = data.map((d) => d.value);
  const min = Math.min(...vals) - 10;
  const max = Math.max(...vals) + 20;
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = pad.left + (i / (data.length - 1)) * cw;
    const y = pad.top + ch - ((d.value - min) / range) * ch;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");
  const areaPath = `${linePath}L${points[points.length - 1].x},${pad.top + ch}L${points[0].x},${pad.top + ch}Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#09090B" stroke={color} strokeWidth="2" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={pad.top + ch + 18} textAnchor="middle" className="fill-text-muted text-[9px] font-mono">
          {p.label === "TEST 1" ? "T1" : p.label === "TEST 8" ? "T8" : i === 0 || i === data.length - 1 ? p.label : ""}
        </text>
      ))}
      {[min, max].map((v) => (
        <text key={v} x={pad.left - 8} y={pad.top + ch - ((v - min) / range) * ch + 4} textAnchor="end" className="fill-text-muted text-[9px] font-mono">
          {v}{suffix || ""}
        </text>
      ))}
      {points.filter((_, i) => i % 2 === 0).map((p, idx) => (
        <text key={idx} x={p.x + 8} y={p.y - 8} className="fill-text-secondary text-[10px] font-bold font-mono">
          {p.value}{suffix || ""}
        </text>
      ))}
    </svg>
  );
}

const BadgePerf: Record<string, { variant: "alert" | "success" | "neutral"; cls: string }> = {
  WEAK: { variant: "alert", cls: "bg-status-alert-light text-status-alert" },
  AVERAGE: { variant: "neutral", cls: "bg-[#FEF9C3] text-[#854D0E]" },
  EXCELLENT: { variant: "success", cls: "bg-status-success-light text-status-success" },
};

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<"mocks" | "pyqs">("mocks");
  const [selectedSubject, setSelectedSubject] = useState("ALL SUBJECTS");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="animate-in flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkle size={16} weight="fill" className="text-brand-accent" />
              <Label>Analytics</Label>
            </div>
            <Heading as="h1">PERFORMANCE ANALYSIS</Heading>
            <p className="text-[13px] leading-[1.6] font-medium text-text-muted mt-1.5 max-w-2xl">
              This Advanced Analytics Helps You Track Your Consistency And Progress Over Time. Custom Mock Drills Are A More Exciting Feature Than Your Girlfriend, I Mean It! <SmileyWink size={14} weight="fill" className="inline-block text-brand-pop -mt-0.5" />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap animate-in animate-in-delay-1">
          <div className="flex bg-text-primary/5 rounded-[10px] p-0.5 gap-0.5">
            <button
              onClick={() => setActiveTab("mocks")}
              className={`px-5 py-2 text-[12px] font-bold font-mono uppercase tracking-[0.06em] rounded-[8px] transition-all ${
                activeTab === "mocks" ? "bg-surface-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              MOCKS
            </button>
            <button
              onClick={() => setActiveTab("pyqs")}
              className={`px-5 py-2 text-[12px] font-bold font-mono uppercase tracking-[0.06em] rounded-[8px] transition-all ${
                activeTab === "pyqs" ? "bg-surface-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              PYQS
            </button>
          </div>
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none rounded-[10px] border border-border px-4 py-2 pr-8 text-[12px] font-semibold font-mono bg-surface-card text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent/20 cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <CaretDown size={12} weight="bold" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 animate-in animate-in-delay-1">
          <Card className="!p-5">
            <Label>Current Form</Label>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-[36px] font-bold leading-[1] tracking-[-0.02em] text-text-primary">186</span>
              <span className="flex items-center gap-0.5 text-status-success text-[13px] font-semibold mb-1.5">
                <TrendUp size={14} weight="bold" />
                +28
              </span>
            </div>
            <p className="text-[11px] font-medium text-text-muted mt-1">vs last 5 tests</p>
          </Card>
          <Card className="!p-5">
            <Label>Tests Taken</Label>
            <p className="text-[36px] font-bold leading-[1] tracking-[-0.02em] text-text-primary mt-1">42</p>
            <p className="text-[11px] font-medium text-text-muted mt-1">across 4 subjects</p>
          </Card>
          <Card className="!p-5 !bg-[#FEF9C3] !border-[#EAB308]/20">
            <Label>Avg. Score</Label>
            <div className="flex items-end gap-1.5 mt-1">
              <span className="text-[36px] font-bold leading-[1] tracking-[-0.02em] text-text-primary">186</span>
              <span className="text-[18px] font-bold leading-[1.2] text-text-muted mb-1">/ 250</span>
            </div>
          </Card>
          <Card className="!p-5">
            <Label>Green Flag Subject</Label>
            <p className="text-[15px] font-bold leading-[1.2] text-status-success mt-1">Accountancy</p>
            <p className="text-[11px] font-medium text-text-muted mt-1">Avg. 82% accuracy</p>
          </Card>
          <Card className="!p-5">
            <Label>Red Flag Subject</Label>
            <p className="text-[15px] font-bold leading-[1.2] text-status-alert mt-1">English</p>
            <p className="text-[11px] font-medium text-text-muted mt-1">Avg. 54% accuracy</p>
          </Card>
        </div>

        <Card className="animate-in animate-in-delay-1" padding="none">
          <div className="p-5 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Brain size={16} weight="fill" className="text-brand-accent" />
              <Label>Revision Radar</Label>
            </div>
            <Heading as="h4">Flagged Areas</Heading>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-border">
            {[
              { icon: Brain, label: "Concept Doubts", value: 12, color: "text-brand-accent", bg: "bg-brand-accent-subtle" },
              { icon: NotePencil, label: "Need Revision", value: 8, color: "text-[#EAB308]", bg: "bg-[#FEF9C3]" },
              { icon: DiceSix, label: "Total Guesses", value: 23, color: "text-brand-pop", bg: "bg-brand-pop-subtle" },
              { icon: BookmarkSimple, label: "Very Important", value: 5, color: "text-status-success", bg: "bg-status-success-light" },
            ].map((item) => (
              <div key={item.label} className="p-5 border-r border-border last:border-r-0">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-[10px] ${item.bg} flex items-center justify-center`}>
                    <item.icon size={20} weight="fill" className={item.color} />
                  </div>
                  <div>
                    <p className="text-[22px] font-bold leading-[1] text-text-primary">{item.value}</p>
                    <p className="text-[11px] font-medium text-text-muted mt-0.5">{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end px-5 py-3 border-t border-border">
            <Button variant="ghost" size="sm" shape="default">
              GO TO LIBRARY <span className="text-[14px]">📚</span>
              <ArrowRight size={12} weight="bold" />
            </Button>
          </div>
        </Card>

        <Card className="animate-in animate-in-delay-2" padding="none">
          <div className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} weight="fill" className="text-brand-accent" />
                <Label>Action Plan: Red Flags</Label>
                <Info size={13} weight="fill" className="text-text-muted opacity-50" />
              </div>
              <Badge variant="alert" size="sm">HIGH PRIORITY</Badge>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <Heading as="h4">Weak Sub-topics</Heading>
              <span className="text-[11px] font-mono font-semibold text-text-muted">LIMIT: 4 DRILLS / MONTH</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
            {redFlags.map((rf) => (
              <Card key={rf.topic} variant="default" padding="none" className="!p-4 flex items-center gap-4">
                <AccuracyGauge pct={rf.accuracy} />
                <div className="flex-1 min-w-0">
                  <Badge variant="neutral" size="sm">{rf.subject}</Badge>
                  <p className="text-[14px] font-bold leading-[1.2] text-text-primary mt-1">{rf.topic}</p>
                  <p className="text-[10px] font-mono font-semibold text-text-muted mt-0.5">BASED ON {rf.volume} ATTEMPTED QUESTIONS</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <span className="text-[12px] font-mono font-semibold text-text-muted">LIMIT [ 0/4 ]</span>
            <Button variant="primary" size="sm">START CUSTOM DRILL</Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in animate-in-delay-2">
          <Card padding="none">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChartLineUp size={16} weight="fill" className="text-brand-accent" />
                  <Label>Score Trajectory</Label>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-text-muted">GRAPH AVG.</span>
                  <span className="text-[18px] font-bold leading-[1] text-text-primary">186</span>
                  <Badge variant="neutral" size="sm">MARKS</Badge>
                </div>
              </div>
            </div>
            <div className="px-4 pt-2 pb-4">
              <SparkChart
                data={mockTestData.map((d) => ({ label: d.label, value: d.score }))}
                color="#7C3AED"
                gradientId="scoreGrad"
              />
            </div>
          </Card>
          <Card padding="none">
            <div className="p-5 pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock size={16} weight="fill" className="text-brand-pop" />
                  <Label>Time Management</Label>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-semibold text-text-muted">AVG. TIME</span>
                  <span className="text-[18px] font-bold leading-[1] text-text-primary">26m 28s</span>
                  <Badge variant="pop" size="sm">MINUTES</Badge>
                </div>
              </div>
            </div>
            <div className="px-4 pt-2 pb-4">
              <SparkChart
                data={mockTestData.map((d) => ({ label: d.label, value: d.time }))}
                color="#FF4E88"
                gradientId="timeGrad"
              />
            </div>
          </Card>
        </div>

        <Card className="animate-in animate-in-delay-3" padding="none">
          <div className="p-5 pb-0">
            <div className="flex items-center gap-2">
              <Exam size={16} weight="fill" className="text-brand-accent" />
              <Label>Recent Attempts</Label>
            </div>
            <Heading as="h5" className="mt-0.5">Latest test history</Heading>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left mt-3">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-text-muted px-5 py-3">Date</th>
                  <th className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-text-muted px-5 py-3">Test Name</th>
                  <th className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-text-muted px-5 py-3">Score</th>
                  <th className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-text-muted px-5 py-3 text-right">Performance</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0 hover:bg-text-primary/[0.02] transition-colors">
                    <td className="px-5 py-4 text-[13px] font-mono font-medium text-text-secondary">{row.date}</td>
                    <td className="px-5 py-4 text-[13px] font-semibold text-text-primary">{row.test}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[13px] font-bold font-mono ${
                        row.score >= 100 ? "text-status-success" : row.score >= 60 ? "text-[#EAB308]" : "text-status-alert"
                      }`}>{row.score}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-block text-[11px] font-bold font-mono uppercase tracking-[0.04em] px-3 py-1 rounded-[6px] ${BadgePerf[row.badge].cls}`}>
                        {row.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
