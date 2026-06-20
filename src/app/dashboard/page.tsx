"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card } from "@/components/ui/card";
import { Heading, Body, Meta, Label } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge, StatusDot } from "@/components/ui/badge";
import {
  Target,
  Fire,
  Books,
  PlayCircle,
  BookOpen,
  ClockCounterClockwise,
  ChartLineUp,
  WarningCircle,
  SquaresFour,
  ArrowRight,
  Calculator,
  TrendUp,
  TrendDown,
  Lightbulb,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import { getSession } from "@/lib/store";
import { useState, useEffect } from "react";

const recentActivity = [
  { title: "Mock Test #12", score: "185/250", acc: 74, date: "Today" },
  { title: "Ch. Retirement & Death", score: "42/50", acc: 84, date: "Yesterday" },
  { title: "PYQ 2025 Shift 1", score: "168/250", acc: 67, date: "2 days ago" },
];

const subjectData = [
  { subject: "Accountancy", accuracy: 72, color: "bg-brand-accent", label: "Strong" as const },
  { subject: "Business Studies", accuracy: 65, color: "bg-status-success", label: "Good" as const },
  { subject: "Economics", accuracy: 58, color: "bg-brand-accent", label: "Needs Work" as const },
  { subject: "English", accuracy: 82, color: "bg-text-primary", label: "Excellent" as const },
];

const weakTopics = [
  { topic: "Cash Flow Statement", acc: 45, bar: "bg-status-alert" },
  { topic: "Debentures", acc: 52, bar: "bg-brand-accent" },
  { topic: "Ratio Analysis", acc: 58, bar: "bg-status-success" },
];

const stats = [
  { label: "Tests", value: "12", icon: Books, trend: "+3 this week", up: true },
  { label: "Accuracy", value: "68%", icon: Target, trend: "+5%", up: true },
  { label: "Streak", value: "7d", icon: Fire, trend: "Best streak!", up: true },
  { label: "Solved", value: "845", icon: SquaresFour, trend: "+142", up: true },
];

const quickLinks = [
  { icon: PlayCircle, label: "Mock Tests", href: "/mocks" },
  { icon: BookOpen, label: "Chapter Practice", href: "/practice" },
  { icon: ClockCounterClockwise, label: "PYQ Bank", href: "/pyq" },
  { icon: Calculator, label: "College Predictor", href: "/college-predictor" },
];

const activityData = [
  12, 18, 25, 8, 4, 20, 28, 30, 22, 15,
  6, 10, 18, 26, 30, 28, 20, 14, 8, 12,
  22, 28, 30, 26, 18, 10, 6, 16, 24, 28,
];

function ActivityWave({ data }: { data: number[] }) {
  const w = 100;
  const h = 32;
  const pad = 2;
  const max = Math.max(...data, 1);
  const stepX = (w - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => ({
    x: pad + i * stepX,
    y: h - pad - ((v / max) * (h - pad * 2)),
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join("");

  const area = `${line}L${points[points.length - 1].x.toFixed(1)} ${h - pad}L${points[0].x.toFixed(1)} ${h - pad}Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" className="text-brand-accent" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" className="text-brand-accent" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#wave-grad)" />
      <path d={line} fill="none" stroke="currentColor" className="text-brand-accent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1].x.toFixed(1)} cy={points[points.length - 1].y.toFixed(1)} r="2" fill="currentColor" className="text-brand-accent" />
    </svg>
  );
}

function RadialProgress({ percent, size = 82, className }: { percent: number; size?: number; className?: string }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const half = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A043" />
          <stop offset="100%" stopColor="#E8C87A" />
        </linearGradient>
      </defs>
      <circle cx={half} cy={half} r={radius} fill="none" stroke="currentColor" className="text-text-primary/8" strokeWidth={strokeWidth} />
      <circle
        cx={half} cy={half} r={radius}
        fill="none" stroke="url(#bar-grad)"
        strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={offset}
        transform={`rotate(-90 ${half} ${half})`}
      />
      <text x={half} y={half} textAnchor="middle" dominantBaseline="central"
        className="fill-text-primary font-bold"
        fontSize={size * 0.22}
      >
        {percent}%
      </text>
    </svg>
  );
}

function getDaysUntil(target: Date): number {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function DashboardPage() {
  const [username, setUsername] = useState("Priyansh");
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const session = getSession();
    if (session?.username) setUsername(session.username);
  }, []);

  useEffect(() => {
    setDaysLeft(getDaysUntil(new Date("2027-05-15")));
  }, []);

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* ══ Welcome — col 1-2, row 1-2 ══ */}
        <Card variant="default" className="relative overflow-hidden md:col-span-2 md:row-span-2 bg-topo flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/8 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
          <div className="relative z-0 flex flex-col flex-1">
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-[30px] md:text-[36px] font-bold leading-[1.0] tracking-[-0.02em] text-text-primary">
                Good morning
              </p>
              <p className="text-[72px] md:text-[84px] font-bold leading-[0.9] tracking-[-0.03em] text-text-primary mt-0.5">
                {username}!
              </p>
            </div>
            <div className="border-t border-border" />
            <div className="grid grid-cols-2 gap-4 pt-4 pb-3">
              <div>
                <p className="text-[36px] font-bold leading-[1.0] tracking-[-0.02em] text-text-primary">
                  68<span className="text-[20px] text-text-muted">%</span>
                </p>
                <p className="text-[13px] font-semibold text-text-secondary mt-0.5">
                  Overall Accuracy — <span className="text-status-success">↑ 5%</span>
                </p>
              </div>
              <div>
                <p className="text-[32px] md:text-[36px] font-bold leading-[0.9] tracking-[-0.02em] text-text-primary">
                  {daysLeft}
                </p>
                <p className="text-[11px] font-semibold text-text-secondary mt-0.5 uppercase tracking-[0.08em]">
                  days until CUET UG 2027
                </p>
                <div className="mt-2 h-1.5 rounded-full bg-text-primary/5 overflow-hidden">
                  <div className="h-full rounded-full bg-brand-accent" style={{ width: `${Math.min(100, Math.max(0, 100 - daysLeft / 3.65))}%` }} />
                </div>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Rocket size={13} weight="fill" className="text-brand-accent" />
                  <Body size="meta">12 tests</Body>
                </div>
                <div className="flex items-center gap-1.5">
                  <Fire size={13} weight="fill" className="text-status-alert" />
                  <Body size="meta">7d streak</Body>
                </div>
                <div className="flex items-center gap-1.5">
                  <Books size={13} weight="fill" className="text-status-success" />
                  <Body size="meta">845Q</Body>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="accent">
                  <PlayCircle size={13} weight="fill" />
                  Start Mock
                </Button>
                <Button size="sm" variant="outline">
                  <BookOpen size={13} weight="fill" />
                  Practice
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* ══ Subject Performance — col 3, row 1 ══ */}
        <Card padding="list" variant="default" className="border-l-2 border-l-brand-accent">
          <div className="flex items-center gap-2 mb-3">
            <ChartLineUp size={16} weight="fill" className="text-brand-accent" />
            <Heading as="h5">Subject Performance</Heading>
          </div>
          <div className="space-y-3">
            {subjectData.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-0.5">
                  <Body size="meta">{s.subject}</Body>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold">{s.accuracy}%</span>
                    <Badge variant={s.label === "Excellent" ? "success" : s.label === "Strong" ? "accent" : "neutral"} size="sm">{s.label}</Badge>
                  </div>
                </div>
                <div className="h-1 rounded-full bg-text-primary/5 overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ══ Best Score — col 3, row 2, radial bar at top covering ~35% vertical ══ */}
        <Card variant="default" className="flex flex-col items-center justify-center gap-2 pt-5 pb-4">
          <div className="flex-1 flex items-center justify-center">
            <RadialProgress percent={74} size={82} className="shrink-0" />
          </div>
          <div className="text-center">
            <Label>Best Score</Label>
            <div className="flex items-center gap-2 mt-0.5 justify-center">
              <span className="text-[20px] font-bold text-text-primary leading-none">185 / 250</span>
              <Badge variant="success" size="sm">NEW PB</Badge>
            </div>
            <Body size="meta" muted className="text-[11px] mt-0.5">Mock Test #12 · 74% accuracy</Body>
          </div>
        </Card>

        {/* ══ Daily Tip — col 4, row 1 ══ */}
        <Card variant="default" className="border border-dashed border-brand-accent/25">
          <div className="flex items-start gap-2.5">
            <div className="size-8 rounded-[8px] bg-brand-accent/10 flex items-center justify-center shrink-0">
              <Lightbulb size={16} weight="fill" className="text-brand-accent" />
            </div>
            <div className="min-w-0">
              <Label>Today&apos;s Focus</Label>
              <Body size="meta" className="mt-1">
                Cash Flow Statement <span className="text-status-alert font-bold">· 45%</span>
              </Body>
              <Body size="meta" muted className="text-[11px]">2 more weak topics</Body>
              <Button variant="subtle" size="sm" className="mt-2">
                Practice <ArrowRight size={11} weight="bold" />
              </Button>
            </div>
          </div>
        </Card>

        {/* ══ Quick Links — col 4, row 2 (fills void under Daily Tip) ══ */}
        <Card padding="compact" variant="default">
          <div className="divide-y divide-border">
            {quickLinks.map((a) => (
              <div key={a.label} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0 cursor-pointer hover:opacity-70 transition-opacity">
                <a.icon size={14} weight="fill" className="text-brand-accent-dark shrink-0" />
                <Body size="meta">{a.label}</Body>
                <ArrowRight size={10} weight="bold" className="text-text-muted ml-auto" />
              </div>
            ))}
          </div>
        </Card>

        {/* ══ Recent Activity — col-span-4 full width ══ */}
        <Card padding="list" variant="default" className="md:col-span-4">
          <div className="flex items-center justify-between mb-3">
            <Heading as="h5">Recent Activity</Heading>
            <Badge variant="accent" size="sm">Last 7 days</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {recentActivity.map((item) => (
              <div key={item.title} className="p-2.5 rounded-[8px] bg-text-primary/[0.02]">
                <div className="flex items-center gap-1.5 mb-1">
                  <StatusDot variant="success" />
                  <Body size="meta" muted className="text-[11px]">{item.date}</Body>
                </div>
                <Body size="meta">{item.title}</Body>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[14px] font-bold text-text-primary">{item.score}</span>
                  <span className="text-[10px] font-semibold text-text-muted">{item.acc}% acc</span>
                </div>
              </div>
            ))}
            <div className="p-2.5 rounded-[8px] bg-text-primary/[0.02] flex flex-col justify-center">
              <div className="flex items-center justify-between mb-1">
                <Body size="meta" muted className="text-[11px]">30-Day Activity</Body>
                <Body size="meta" muted className="text-[11px] font-bold text-status-success">Strong</Body>
              </div>
              <ActivityWave data={activityData} />
            </div>
          </div>
        </Card>

        {/* ══ Needs Focus — col 1, row 4 ══ */}
        <Card padding="list" variant="default">
          <div className="flex items-center justify-between mb-3">
            <Heading as="h5">Needs Focus</Heading>
            <WarningCircle size={14} weight="fill" className="text-status-alert" />
          </div>
          <div className="space-y-3">
            {weakTopics.map((t) => (
              <div key={t.topic}>
                <div className="flex items-center justify-between mb-0.5">
                  <Body size="meta">{t.topic}</Body>
                  <span className="text-[11px] font-bold text-status-alert">{t.acc}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-text-primary/5 overflow-hidden">
                  <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${t.acc}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Button variant="subtle" size="sm" className="w-full mt-3">
            Practice <ArrowRight size={11} weight="bold" />
          </Button>
        </Card>

        {/* ══ Next Target — col 2-3, row 4 (wider) ══ */}
        <Card variant="default" className="md:col-span-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-[10px] bg-brand-accent-subtle flex items-center justify-center shrink-0">
              <Rocket size={20} weight="fill" className="text-brand-accent-dark" />
            </div>
            <div>
              <Label>Next Target</Label>
              <Body size="meta" className="mt-0.5">200 / 250 <span className="text-status-success font-bold">↑ 15pts</span></Body>
              <Body size="meta" muted className="text-[11px]">Beat your personal best</Body>
            </div>
          </div>
          <Button size="sm" variant="accent" shape="pill">
            <Target size={12} weight="fill" />
            Go for it
          </Button>
        </Card>

        {/* ══ Stats mini — col 4, row 4 ══ */}
        <Card padding="compact" variant="default">
          <div className="divide-y divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                <div className="flex items-center gap-1.5">
                  <stat.icon size={11} weight="fill" className="text-brand-accent" />
                  <Body size="meta">{stat.label}</Body>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[13px] font-bold text-text-primary">{stat.value}</span>
                  {stat.up
                    ? <TrendUp size={9} weight="fill" className="text-status-success" />
                    : <TrendDown size={9} weight="fill" className="text-status-alert" />
                  }
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </AppLayout>
  );
}
