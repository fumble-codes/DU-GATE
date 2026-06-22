"use client";

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading, Body, Meta, Label } from "@/components/ui/typography"
import { Badge, StatusDot } from "@/components/ui/badge"
import { IconArrowRight } from "@/components/landing/icons/icons"
import { Architects_Daughter } from "next/font/google"

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
})
import { FeatureAnchorRow } from "@/components/landing/features"
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
  Gauge,
  ClipboardText,
  Archive,
  GraduationCap,
  FileText,
  Question,
  Gear,
  SignOut,
  Translate,
  Buildings,
  Clock,
} from "@phosphor-icons/react"

/* ─── Dashboard mockup helper components ─── */
const recentActivity = [
  { title: "Mock Test #12", score: "185/250", acc: 74, date: "Today" },
  { title: "Ch. Retirement & Death", score: "42/50", acc: 84, date: "Yesterday" },
  { title: "PYQ 2025 Shift 1", score: "168/250", acc: 67, date: "2 days ago" },
]

const subjectData = [
  { subject: "Accountancy", accuracy: 72, color: "bg-brand-accent", label: "Strong" as const },
  { subject: "Business Studies", accuracy: 65, color: "bg-brand-accent", label: "Good" as const },
  { subject: "Economics", accuracy: 58, color: "bg-brand-accent", label: "Needs Work" as const },
  { subject: "English", accuracy: 82, color: "bg-brand-accent", label: "Excellent" as const },
]

const weakTopics = [
  { topic: "Cash Flow Statement", acc: 45, bar: "bg-status-alert" },
  { topic: "Debentures", acc: 52, bar: "bg-brand-accent" },
  { topic: "Ratio Analysis", acc: 58, bar: "bg-status-success" },
]

const quickStats = [
  { label: "Tests", value: "12", icon: Books, trend: "+3 this week", up: true },
  { label: "Accuracy", value: "68%", icon: Target, trend: "+5%", up: true },
  { label: "Streak", value: "7d", icon: Fire, trend: "Best streak!", up: true },
  { label: "Solved", value: "845", icon: SquaresFour, trend: "+142", up: true },
]

const quickLinks = [
  { icon: PlayCircle, label: "Mock Tests", href: "/mocks" },
  { icon: BookOpen, label: "Chapter Practice", href: "/practice" },
  { icon: ClockCounterClockwise, label: "PYQ Bank", href: "/pyq" },
  { icon: Calculator, label: "College Predictor", href: "/college-predictor" },
]

const activityData = [
  12, 18, 25, 8, 4, 20, 28, 30, 22, 15,
  6, 10, 18, 26, 30, 28, 20, 14, 8, 12,
  22, 28, 30, 26, 18, 10, 6, 16, 24, 28,
]

function ActivityWave({ data }: { data: number[] }) {
  const w = 100; const h = 32; const pad = 2
  const max = Math.max(...data, 1)
  const stepX = (w - pad * 2) / (data.length - 1)
  const points = data.map((v, i) => ({ x: pad + i * stepX, y: h - pad - ((v / max) * (h - pad * 2)) }))
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("")
  const area = `${line}L${points[points.length - 1].x.toFixed(1)} ${h - pad}L${points[0].x.toFixed(1)} ${h - pad}Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" className="text-brand-accent" stopOpacity="0.25" /><stop offset="100%" stopColor="currentColor" className="text-brand-accent" stopOpacity="0.02" /></linearGradient></defs>
      <path d={area} fill="url(#wg)" />
      <path d={line} fill="none" stroke="currentColor" className="text-brand-accent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1].x.toFixed(1)} cy={points[points.length - 1].y.toFixed(1)} r="2" fill="currentColor" className="text-brand-accent" />
    </svg>
  )
}

function RadialProgress({ percent, size = 82 }: { percent: number; size?: number }) {
  const sw = 10; const r = (size - sw) / 2; const circ = 2 * Math.PI * r; const off = circ - (percent / 100) * circ; const h = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="currentColor" className="text-brand-pop" /><stop offset="100%" stopColor="currentColor" className="text-brand-pop-light" /></linearGradient></defs>
      <circle cx={h} cy={h} r={r} fill="none" stroke="currentColor" className="text-text-primary/8" strokeWidth={sw} />
      <circle cx={h} cy={h} r={r} fill="none" stroke="url(#bg)" strokeWidth={sw} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} transform={`rotate(-90 ${h} ${h})`} />
      <text x={h} y={h} textAnchor="middle" dominantBaseline="central" className="fill-text-primary font-bold" fontSize={size * 0.22}>{percent}%</text>
    </svg>
  )
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const username = "Priyansh"
  const daysLeft = 325

  return (
    <>
      <section className="relative w-full overflow-hidden isolate pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Backdrop */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 bottom-[240px] md:bottom-[320px] bg-white rounded-[32px] md:rounded-[56px] border border-border/40 overflow-hidden pointer-events-none -z-10 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <div className="absolute bottom-[-30%] left-[-10%] w-[550px] h-[550px] md:w-[850px] md:h-[850px] rounded-full bg-brand-accent/35 blur-[100px] md:blur-[140px]" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[550px] h-[550px] md:w-[850px] md:h-[850px] rounded-full bg-brand-pop/40 blur-[100px] md:blur-[140px]" />
          <div className="absolute top-0 left-0 bottom-0 w-[8%] bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-[8%] bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes float-slow-1 { 0%,100% { transform:translateY(0) rotate(.5deg) } 50% { transform:translateY(-10px) rotate(-.5deg) } }
            @keyframes float-slow-2 { 0%,100% { transform:translateY(0) rotate(-.5deg) } 50% { transform:translateY(10px) rotate(.5deg) } }
            @keyframes flip-card-loop { 0%,35% { transform:rotateY(0deg) } 45%,85% { transform:rotateY(180deg) } 95%,100% { transform:rotateY(0deg) } }
            @keyframes progress-fill-loop { 0% { width:10% } 100% { width:90% } }
            .animate-float-1 { animation:float-slow-1 8s ease-in-out infinite }
            .animate-float-2 { animation:float-slow-2 9s ease-in-out infinite }
            .animate-flip-loop { animation:flip-card-loop 6s ease-in-out infinite; transform-style:preserve-3d }
            .animate-progress-loop { animation:progress-fill-loop 3s ease-in-out infinite alternate }
          `}} />

          {/* Animated widgets - Flashcards / Score / Countdown / Mock / College */}
          <div className="absolute top-[145px] left-[-135px] xl:left-[-150px] 2xl:left-[-180px] hidden xl:flex items-center gap-1 select-none z-30 text-brand-pop pointer-events-none">
            <span className={`${architectsDaughter.className} text-[15px] font-bold rotate-[-6deg] tracking-wide text-brand-pop`}>flashcard</span>
            <svg className="w-10 h-10 -mt-3 text-brand-pop" fill="none" viewBox="0 0 48 48"><path d="M6 32C16 32 28 26 34 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 14L34 14L34 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          <div className="absolute top-[-20px] left-[-70px] xl:left-[-90px] 2xl:left-[-120px] hidden xl:block w-[230px] aspect-[4/3] perspective-[1000px] select-none cursor-pointer animate-float-1 z-20">
            <div className="w-full h-full transition-transform duration-500 animate-flip-loop relative transform-style-3d">
              <div className="absolute inset-0 rounded-[16px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated flex flex-col justify-between p-4 backface-visibility-hidden">
                <div className="flex items-center justify-between w-full"><span className="text-[9px] font-bold text-brand-accent bg-brand-accent/10 px-1.5 py-0.5 rounded">ENGLISH</span><span className="text-[9px] font-semibold text-status-success bg-status-success/10 px-1.5 py-0.5 rounded">Medium</span></div>
                <div className="text-center font-bold text-[18px] text-text-primary leading-tight">Loquacious</div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-text-muted"><Translate size={11} /><span>Meaning flips...</span></div>
              </div>
              <div className="absolute inset-0 rounded-[16px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated flex flex-col justify-between p-4 backface-visibility-hidden rotate-y-180">
                <div className="flex items-center justify-between w-full"><span className="text-[9px] font-semibold text-text-secondary bg-text-primary/5 px-1.5 py-0.5 rounded">Meaning</span></div>
                <div className="flex flex-col items-center justify-center text-center mt-1 flex-1"><span className="text-[12px] font-bold text-text-primary">Loquacious</span><div className="w-6 h-[1px] bg-border my-1" /><span className="text-[10px] font-medium text-text-secondary leading-tight">Tending to talk a great deal; talkative</span></div>
                <div className="text-center text-[10px] text-brand-accent font-bold">Baatuni · बातूनी</div>
              </div>
            </div>
          </div>

          <div className="absolute top-[140px] left-[30px] xl:left-[20px] 2xl:left-[-10px] hidden xl:block w-[185px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated rounded-[16px] p-4 flex flex-col items-center text-center animate-float-2 z-25 select-none">
            <RadialProgress percent={74} size={72} />
            <span className="text-[9px] font-bold uppercase tracking-[0.08em] text-text-muted mt-2 block">score analaysis</span>
            <div className="flex items-center gap-1.5 justify-center mt-1 w-full"><span className="text-[15px] font-black text-text-primary leading-none">185 / 250</span><span className="text-[8px] font-bold text-brand-pop bg-brand-pop/8 px-1 py-0.5 rounded-[4px] shrink-0">NEW PB</span></div>
            <span className="text-[9px] font-medium text-text-muted mt-1 block leading-none">Mock Test #12 · 74% acc</span>
          </div>

          <div className="absolute top-[125px] left-[185px] xl:left-[165px] 2xl:left-[135px] hidden xl:flex flex-col items-start select-none z-30 text-brand-pop pointer-events-none">
            <span className={`${architectsDaughter.className} text-[15px] font-bold rotate-[-4deg] tracking-wide text-brand-pop ml-4`}>score analaysis</span>
            <svg className="w-12 h-12 -mt-1 text-brand-pop" fill="none" viewBox="0 0 48 48"><path d="M36 6C26 8 16 16 10 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 26L10 26L10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          <div className="absolute top-[290px] left-[-30px] xl:left-[-50px] 2xl:left-[-80px] hidden xl:block w-[240px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated rounded-[16px] p-4 flex flex-col gap-2.5 animate-float-2 z-20 text-left">
            <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><Fire size={15} weight="fill" className="text-brand-pop" /><span className="text-[11px] font-bold text-text-secondary">CUET UG 2027</span></div><span className="text-[11px] font-black text-brand-pop">{daysLeft} Days</span></div>
            <div className="w-full h-1.5 bg-text-primary/5 rounded-full overflow-hidden"><div className="h-full bg-brand-accent rounded-full animate-progress-loop" style={{ width: '70%' }} /></div>
            <div className="flex items-center justify-between pt-1 border-t border-border/60"><div className="flex items-center gap-1 text-[10px] text-text-muted"><Rocket size={11} weight="fill" className="text-brand-accent" /><span>12 mocks</span></div><span className="text-[10px] font-extrabold text-status-success">7d streak 🔥</span></div>
          </div>

          <div className="absolute top-[20px] xl:top-[30px] right-[-90px] xl:right-[-110px] 2xl:right-[-140px] hidden xl:flex items-center gap-1 select-none z-30 text-brand-pop pointer-events-none">
            <svg className="w-10 h-10 -mt-3 text-brand-pop" fill="none" viewBox="0 0 48 48"><path d="M42 12C32 12 20 18 14 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 20L14 30L24 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className={`${architectsDaughter.className} text-[15px] font-bold rotate-[6deg] tracking-wide text-brand-pop`}>mock test</span>
          </div>

          <div className="absolute top-[60px] right-[-60px] xl:right-[-80px] 2xl:right-[-110px] hidden xl:block w-[260px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated rounded-[16px] p-5 flex flex-col gap-4.5 animate-float-1 z-20 text-left">
            <div className="flex items-start justify-between"><div className="flex items-center gap-2.5"><div className="size-9 rounded-[8px] bg-brand-accent/10 flex items-center justify-center text-[18px]">📊</div><div><span className="text-[13px] font-bold text-text-primary block leading-none">Accountancy Mock</span><span className="text-[10px] text-text-muted mt-1 block">50 Qs · 60 mins</span></div></div><span className="text-[10px] font-bold text-status-success bg-status-success/10 px-1.5 py-0.5 rounded shrink-0">185/250</span></div>
            <div className="w-full h-[1px] bg-border/40" />
            <div className="flex items-center gap-2.5 text-[10px] text-text-muted"><Clock size={12} weight="fill" className="text-brand-accent-dark" /><span>60 minutes</span><span className="text-text-muted/40">·</span><ChartLineUp size={12} weight="fill" className="text-brand-accent-dark" /><span>250 marks</span></div>
            <button className="w-full bg-brand-accent hover:bg-brand-accent-dark text-white text-[12px] font-bold py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 transition-all shadow-sm animate-pulse-glow cursor-pointer mt-1"><PlayCircle size={15} weight="fill" /><span>Start Practicing</span></button>
          </div>

          <div className="absolute top-[220px] right-[20px] xl:right-[40px] 2xl:right-[-70px] hidden xl:block w-[240px] bg-white/95 backdrop-blur-sm border border-border shadow-elevated rounded-[16px] p-4 flex flex-col gap-2.5 animate-float-2 z-20 text-left">
            <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><Buildings size={14} weight="fill" className="text-brand-accent" /><span className="text-[11px] font-bold text-text-secondary">College Predictor</span></div><span className="text-[9px] font-bold bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded">UR</span></div>
            <div className="bg-text-primary/[0.02] p-2 rounded-[8px] border border-border/40"><span className="text-[10px] text-text-muted block">Top Target</span><span className="text-[12px] font-extrabold text-text-primary block mt-0.5">SRCC · B.Com (Hons)</span><div className="flex items-center gap-1.5 mt-1"><div className="h-1.5 w-16 bg-text-primary/5 rounded-full overflow-hidden"><div className="h-full bg-status-success rounded-full" style={{ width: '98%' }} /></div><span className="text-[9px] font-bold text-status-success">98% match</span></div></div>
            <div className="flex items-center justify-between text-[10px] text-text-muted"><span>Required: 762/1000</span><span className="font-bold text-brand-accent">CSAS Cutoff</span></div>
          </div>

          <div className="absolute top-[325px] right-[215px] xl:right-[195px] 2xl:right-[165px] hidden xl:flex items-center gap-1.5 select-none z-30 text-brand-pop pointer-events-none">
            <div className="flex flex-col text-right leading-none rotate-[-4deg]"><span className={`${architectsDaughter.className} text-[15px] font-bold tracking-wide text-brand-pop`}>college</span><span className={`${architectsDaughter.className} text-[15px] font-bold tracking-wide text-brand-pop mt-1`}>predictor</span></div>
            <svg className="w-12 h-12 -mt-2 text-brand-pop" fill="none" viewBox="0 0 48 48"><path d="M6 12C14 26 26 30 36 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M28 20L36 16L34 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>

          {/* Social proof */}
          <div className="mb-8 flex items-center gap-2.5 bg-white/80 px-4 py-1.5 rounded-full shadow-card border border-border backdrop-blur-sm">
            <div className="flex -space-x-2.5">
              {["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&auto=format&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&auto=format&q=80","https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&auto=format&q=80"].map((url, i) => (
                <img key={i} src={url} alt="" className="size-6 rounded-full border-2 border-white object-cover shrink-0" />
              ))}
            </div>
            <div className="w-[1px] h-3.5 bg-border mx-0.5" />
            <span className="text-[12px] font-semibold text-text-muted">1.8k+ CUET aspirants joined</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-[56px] font-extrabold tracking-[-0.03em] text-text-primary max-w-md md:max-w-[700px] mx-auto mb-6 leading-[1.1]">
            Master the CUET with India&apos;s Most Authentic Practice Platform
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.7] font-medium text-text-muted max-w-2xl mx-auto mb-10">
            21 official government papers, 2,200+ questions, and an NTA-authentic exam interface —
            all completely offline and free. Built by CUET aspirants, for CUET aspirants.
          </p>

          <div className="flex items-center gap-4 mb-16">
            <Link href="/dashboard"><Button variant="primary" size="lg" className="text-[15px] px-10 py-3.5 shadow-md">Start Practicing Free<IconArrowRight /></Button></Link>
            <Link href="#features"><Button variant="ghost" size="lg" className="text-[15px] px-8 py-3.5">Explore Features</Button></Link>
          </div>

          {/* Dashboard mockup */}
          <div className="w-full max-w-6xl mx-auto rounded-[24px] shadow-elevated border border-white/80 bg-white/40 backdrop-blur-sm p-2 md:p-3">
            <div className="rounded-[18px] overflow-hidden bg-surface-card border border-border flex flex-col">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-canvas-bg/50">
                <span className="size-2.5 rounded-full bg-status-alert" /><span className="size-2.5 rounded-full bg-[#FBBF24]" /><span className="size-2.5 rounded-full bg-status-success" />
                <span className="ml-3 text-[11px] font-medium text-text-muted">dugate.app/dashboard</span>
              </div>
              <div className="flex flex-1 min-h-[500px] max-h-[600px] overflow-hidden">
                <div className="hidden md:flex w-[240px] bg-surface-card border-r border-border flex-col shrink-0 text-left">
                  <div className="px-5 pt-6 pb-5"><div className="flex items-center gap-2.5"><img src="/logo.svg" alt="DUGATE" className="size-9" /><div><span className="text-[17px] font-bold text-text-primary leading-none block">DUGATE</span><span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent mt-0.5 block">Exam Prep</span></div></div></div>
                  <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                    {[{label:"Dashboard",icon:Gauge,active:true},{label:"Mock Tests",icon:ClipboardText},{label:"PYQ Bank",icon:Archive},{label:"Chapter Practice",icon:BookOpen},{label:"Flashcards",icon:GraduationCap},{label:"NCERT Notes",icon:FileText},{label:"Analysis",icon:ChartLineUp},{label:"Ask a Doubt",icon:Question},{label:"Question Library",icon:Books},{label:"College Predictor",icon:Calculator},{label:"Settings",icon:Gear}].map(item => { const I=item.icon; return (
                      <div key={item.label} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all relative cursor-pointer",item.active?"bg-brand-accent-subtle text-brand-accent-dark":"text-text-secondary hover:bg-text-primary/5 hover:text-text-primary")}>
                        {item.active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-brand-accent" />}
                        <I size={18} weight={item.active?"fill":"regular"} className={cn("shrink-0",item.active&&"text-brand-accent")} /><span>{item.label}</span>
                      </div>
                    )})}
                  </nav>
                  <div className="px-3 py-4 border-t border-border mt-auto"><div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px]"><div className="size-8 rounded-full bg-brand-accent-subtle flex items-center justify-center text-brand-accent-dark font-bold text-[12px]">U</div><div className="flex-1 min-w-0"><p className="text-[12px] font-semibold text-text-primary truncate">User</p><p className="text-[11px] font-medium text-text-muted truncate">priyanshgfounder1501</p></div><button className="text-text-muted hover:text-text-secondary transition-colors"><SignOut size={16} weight="fill" /></button></div></div>
                </div>
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-canvas-bg text-left">
                  <div className="max-w-[1400px] mx-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card variant="default" className="relative overflow-hidden md:col-span-2 md:row-span-2 bg-topo flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.03] to-transparent" /><div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/8 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
                        <div className="relative z-0 flex flex-col flex-1">
                          <div className="flex-1 flex flex-col justify-center py-4"><p className="text-[30px] md:text-[36px] font-bold leading-[1.0] tracking-[-0.02em] text-text-primary">Good morning</p><p className="text-[72px] md:text-[84px] font-bold leading-[0.9] tracking-[-0.03em] text-text-primary mt-0.5">{username}!</p></div>
                          <div className="border-t border-border" /><div className="grid grid-cols-2 gap-4 pt-4 pb-3"><div className="bg-surface-elevated rounded-card p-3"><p className="text-[36px] font-black leading-[1.0] tracking-[-0.02em] text-text-primary">68<span className="text-[20px] text-text-muted">%</span></p><p className="text-[13px] font-semibold text-text-secondary mt-0.5">Overall Accuracy — <span className="text-status-success">↑ 5%</span></p></div><div className="bg-surface-elevated rounded-card p-3"><p className="text-[32px] md:text-[36px] font-black leading-[0.9] tracking-[-0.02em] text-text-primary">{daysLeft}</p><p className="text-[11px] font-semibold text-text-secondary mt-0.5 uppercase tracking-[0.08em]">days until CUET UG 2027</p><div className="mt-2 h-2.5 rounded-full bg-text-primary/5 overflow-hidden"><div className="h-full rounded-full bg-brand-accent" style={{width:`${Math.min(100,Math.max(0,100-daysLeft/3.65))}%`}} /></div></div></div>
                          <div className="border-t border-border" /><div className="pt-4 space-y-3"><div className="flex items-center gap-3"><div className="flex items-center gap-1.5"><Rocket size={13} weight="fill" className="text-brand-accent" /><Body size="meta">12 tests</Body></div><div className="flex items-center gap-1.5"><Fire size={13} weight="fill" className="text-brand-pop" /><Body size="meta" className="text-brand-pop font-extrabold">7d streak</Body></div><div className="flex items-center gap-1.5"><Books size={13} weight="fill" className="text-status-success" /><Body size="meta">845Q</Body></div></div><div className="flex items-center gap-2"><Button size="sm" variant="accent"><PlayCircle size={13} weight="fill" />Start Mock</Button><Button size="sm" variant="outline"><BookOpen size={13} weight="fill" />Practice</Button></div></div>
                        </div>
                      </Card>
                      <Card padding="list" variant="default" className="border-l-2 border-l-brand-accent"><div className="flex items-center gap-2 mb-3"><ChartLineUp size={16} weight="fill" className="text-brand-accent" /><Heading as="h5">Subject Performance</Heading></div><div className="space-y-3">{subjectData.map(s=><div key={s.subject}><div className="flex items-center justify-between mb-0.5"><Body size="meta">{s.subject}</Body><div className="flex items-center gap-1.5"><span className="text-[11px] font-bold">{s.accuracy}%</span><Badge variant={s.label==="Excellent"?"success":s.label==="Strong"?"accent":"neutral"} size="sm">{s.label}</Badge></div></div><div className="h-2.5 rounded-full bg-text-primary/5 overflow-hidden"><div className="h-full rounded-full bg-brand-accent" style={{width:`${s.accuracy}%`}} /></div></div>)}</div></Card>
                      <Card variant="default" className="border-l-2 border-l-brand-pop flex flex-col items-center justify-center gap-2 pt-5 pb-4"><div className="flex-1 flex items-center justify-center"><RadialProgress percent={74} size={82} /></div><div className="text-center"><Label>Score Analaysis</Label><div className="flex items-center gap-2 mt-0.5 justify-center"><span className="text-[20px] font-black text-text-primary leading-none">185 / 250</span><Badge variant="pop" size="sm">NEW PB</Badge></div><Body size="meta" muted className="text-[11px] mt-0.5">Mock Test #12 · 74% accuracy</Body></div></Card>
                      <Card variant="default" className="border border-dashed border-brand-pop/25"><div className="flex items-start gap-2.5"><div className="size-8 rounded-[8px] bg-brand-pop/10 flex items-center justify-center shrink-0"><Lightbulb size={16} weight="fill" className="text-brand-pop" /></div><div className="min-w-0"><Label>Today&apos;s Focus</Label><Body size="meta" className="mt-1">Cash Flow Statement <span className="text-status-alert font-bold">· 45%</span></Body><Body size="meta" muted className="text-[11px]">2 more weak topics</Body><Button variant="subtle" size="sm" className="mt-2">Practice <ArrowRight size={11} weight="bold" /></Button></div></div></Card>
                      <Card padding="compact" variant="default"><div className="divide-y divide-border">{quickLinks.map(a=><div key={a.label} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0 cursor-pointer hover:opacity-70 transition-opacity"><a.icon size={14} weight="fill" className="text-brand-accent-dark shrink-0" /><Body size="meta">{a.label}</Body><ArrowRight size={10} weight="bold" className="text-text-muted ml-auto" /></div>)}</div></Card>
                      <Card padding="list" variant="default" className="border-l-2 border-l-brand-accent md:col-span-4"><div className="flex items-center justify-between mb-3"><Heading as="h5">Recent Activity</Heading><Badge variant="accent" size="sm">Last 7 days</Badge></div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">{recentActivity.map(item=><div key={item.title} className="p-2.5 rounded-[8px] bg-text-primary/[0.02]"><div className="flex items-center gap-1.5 mb-1"><StatusDot variant="success" /><Body size="meta" muted className="text-[11px]">{item.date}</Body></div><Body size="meta">{item.title}</Body><div className="flex items-center gap-2 mt-0.5"><span className="text-[14px] font-black text-text-primary">{item.score}</span><span className="text-[10px] font-semibold text-text-muted">{item.acc}% acc</span></div></div>)}<div className="p-2.5 rounded-[8px] bg-text-primary/[0.02] flex flex-col justify-center"><div className="flex items-center justify-between mb-1"><Body size="meta" muted className="text-[11px]">30-Day Activity</Body><Body size="meta" muted className="text-[11px] font-bold text-status-success">Strong</Body></div><ActivityWave data={activityData} /></div></div></Card>
                      <Card padding="list" variant="default"><div className="flex items-center justify-between mb-3"><Heading as="h5">Needs Focus</Heading><WarningCircle size={14} weight="fill" className="text-status-alert" /></div><div className="space-y-3">{weakTopics.map(t=><div key={t.topic}><div className="flex items-center justify-between mb-0.5"><Body size="meta">{t.topic}</Body><span className="text-[11px] font-bold text-status-alert">{t.acc}%</span></div><div className="h-2.5 rounded-full bg-text-primary/5 overflow-hidden"><div className={`h-full rounded-full ${t.bar}`} style={{width:`${t.acc}%`}} /></div></div>)}</div><Button variant="subtle" size="sm" className="w-full mt-3">Practice <ArrowRight size={11} weight="bold" /></Button></Card>
                      <Card variant="default" className="border-l-2 border-l-brand-pop md:col-span-2 flex items-center justify-between"><div className="flex items-center gap-3"><div className="size-10 rounded-[10px] bg-brand-pop-subtle flex items-center justify-center shrink-0"><Rocket size={20} weight="fill" className="text-brand-pop-dark" /></div><div><Label>Next Target</Label><Body size="meta" className="mt-0.5">200 / 250 <span className="text-status-success font-bold">↑ 15pts</span></Body><Body size="meta" muted className="text-[11px]">Beat your personal best</Body></div></div><Button size="sm" variant="pop" shape="pill"><Target size={12} weight="fill" />Go for it</Button></Card>
                      <Card padding="compact" variant="default"><div className="divide-y divide-border">{quickStats.map(s=><div key={s.label} className="flex items-center justify-between py-2 first:pt-0 last:pb-0"><div className="flex items-center gap-1.5"><s.icon size={11} weight="fill" className={s.label==="Streak"?"text-brand-pop":"text-brand-accent"} /><Body size="meta">{s.label}</Body></div><div className="flex items-center gap-1"><span className="text-[13px] font-black text-text-primary">{s.value}</span>{s.up?<TrendUp size={9} weight="fill" className="text-status-success"/>:<TrendDown size={9} weight="fill" className="text-status-alert"/>}</div></div>)}</div></Card>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureAnchorRow />
    </>
  )
}
