"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import {
  Clock,
  Flag,
  CheckCircle,
  Circle,
  DotsNine,
  ArrowLeft,
  ArrowRight,
  BookmarkSimple,
  Bookmark,
  Robot,
  ChalkboardTeacher,
  Lightning,
  Sparkle,
  TrendUp,
  CalendarBlank,
  BookOpen,
  ChatCircleDots,
  Sliders,
  Buildings,
  Stack,
  LockKey
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────── */
/*  Feature definitions                                       */
/* ────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    badge: "Practice Engine",
    title: "NTA-Authentic Mock Tests",
    accent: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.06)",
    desc: "50-question exams that mirror the real CUET CBT interface. 60-minute countdown, +5/−1 marking, a live question palette and instant results.",
    bullets: ["Real NTA CBT replica UI", "Live question palette & timer", "Instant scoring & explanations"]
  },
  {
    badge: "Smart Study",
    title: "Flashcards & NCERT Notes",
    accent: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.06)",
    desc: "Spaced-repetition flashcards for English vocabulary and chapter decks. Concise NCERT notes across all subjects in a clean reader.",
    bullets: ["Spaced-repetition card rating", "Chapter-wise NCERT summaries", "Always offline-ready study logs"]
  },
  {
    badge: "Deep Analytics",
    title: "Performance Analysis",
    accent: "#22C55E",
    accentBg: "rgba(34, 197, 94, 0.06)",
    desc: "Subject-wise accuracy, chapter-level progress, 12-week activity heatmap and trend lines. Know exactly where you're losing marks.",
    bullets: ["Overall & subject accuracy meters", "12-week activity heatmap grid", "Weak topic prioritization lists"]
  },
  {
    badge: "College Predictor",
    title: "CSAS Cutoff Predictor",
    accent: "#FF4E88",
    accentBg: "rgba(255, 78, 136, 0.06)",
    desc: "Real 2025 CSAS data. Slide your subject scores and instantly see safe / borderline / tough predictions for top DU B.Com colleges.",
    bullets: ["Real 2025 cutoff data integration", "Live multi-subject sliders", "DU College safety category tags"]
  },
  {
    badge: "AI Powered",
    title: "Instant AI Doubt Solver",
    accent: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.06)",
    desc: "Ask anything about Accountancy, Economics or Business Studies and get curriculum-aligned step-by-step explanations in seconds.",
    bullets: ["Curriculum-aligned explanations", "Nominal entries & rule definitions", "Available 24/7 with zero waiting"]
  },
  {
    badge: "Community",
    title: "Live Study Council",
    accent: "#06B6D4",
    accentBg: "rgba(6, 182, 212, 0.06)",
    desc: "A moderated real-time space where students share notes, resolve doubts and cheer each other on — 100% CUET focused.",
    bullets: ["Real-time peer discussions", "Classroom channel navigations", "Moderated resources sharing feed"]
  }
];

/* ────────────────────────────────────────────────────────── */
/*  Mock UIs (Screenshots + Flipping Card + Styled Group)     */
/* ────────────────────────────────────────────────────────── */

// UI 0: Mock Tests (Screenshot mocktestui.png)
function UI0() {
  return (
    <div
      className="select-none flex items-center justify-center"
      style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}
    >
      <img
        src="/images/mocktestui.png"
        alt="Mock Test Interface"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
      />
    </div>
  );
}

// UI 1: Flashcards & NCERT Notes (Interactive 3D auto-flipping card + notes)
function UI1() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col select-none"
      style={{ position: "absolute", inset: 0, background: "#FAFAFA", overflow: "hidden", padding: "16px", gap: "16px", fontFamily: "inherit" }}
    >
      {/* 3D Flashcard Wrapper */}
      <div className="relative w-full shrink-0" style={{ height: "180px", perspective: "1000px" }}>
        <div
          className="w-full h-full transition-transform duration-500 relative rounded-xl"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "none",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 bg-surface-card border border-border rounded-xl p-4 shadow-card flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-brand-pop uppercase tracking-wider">Flashcard Deck</span>
              <span className="text-[9px] font-mono text-text-muted">Card 17 / 50</span>
            </div>
            <div className="text-center py-2">
              <p className="text-[11px] font-bold text-text-primary leading-snug">
                What is the synonym of the word <strong className="text-brand-accent">"Ephemeral"</strong>?
              </p>
            </div>
            <div className="text-center">
              <span className="inline-block text-[9px] font-extrabold text-brand-accent border border-brand-accent/25 px-2.5 py-1 rounded bg-brand-accent-subtle">
                Tap to Reveal Answer
              </span>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 bg-brand-accent-subtle border border-brand-accent/20 rounded-xl p-4 shadow-card flex flex-col justify-between"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-brand-accent uppercase tracking-wider">Answer Revealed</span>
              <span className="text-[9px] font-mono text-text-muted">Good learning!</span>
            </div>
            <div className="text-center py-1">
              <p className="text-[10.5px] font-bold text-text-primary leading-relaxed">
                Synonym: <strong className="text-brand-accent">Transient, Fleeting, Short-lived</strong>
              </p>
              <p className="text-[8.5px] text-text-muted mt-1 italic">"The ephemeral joys of summer."</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1 select-none">
              <button className="py-1 rounded bg-[#EF4444] text-white text-[8px] font-bold">Again</button>
              <button className="py-1 rounded bg-brand-pop text-white text-[8px] font-bold">Hard</button>
              <button className="py-1 rounded bg-[#22C55E] text-white text-[8px] font-bold">Good</button>
            </div>
          </div>
        </div>
      </div>

      {/* NCERT Notes Sheet */}
      <div className="flex-1 bg-surface-card border border-border rounded-xl p-4 flex flex-col gap-2 overflow-hidden shadow-card">
        <div className="flex items-center gap-1.5 pb-1.5 border-b border-border shrink-0">
          <BookOpen size={13} className="text-brand-accent" />
          <span className="text-[9px] font-black text-text-muted uppercase tracking-wider">NCERT REVISION NOTES</span>
        </div>
        <div className="flex-1 overflow-hidden text-[10px] space-y-2">
          <div>
            <h4 className="font-bold text-text-primary text-[11px]">National Income Accounting</h4>
            <p className="text-text-muted text-[8.5px]">Chapter 2 &middot; 5 min read</p>
          </div>
          <div className="bg-text-primary text-white p-2.5 rounded font-mono text-[9px] leading-relaxed">
            <div className="text-brand-accent-light font-bold">GDP = C + I + G + (X - M)</div>
          </div>
          <ul className="space-y-1 text-text-secondary text-[9px]">
            <li className="flex gap-1.5 items-start">
              <span className="text-brand-accent mt-0.5">&#8226;</span>
              <span><strong>MPC (Marginal Propensity to Consume)</strong> + MPS = 1.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// UI 2: Performance Analysis (Screenshot analaysisui.png)
function UI2() {
  return (
    <div
      className="select-none flex items-center justify-center"
      style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}
    >
      <img
        src="/images/analaysisui.png"
        alt="Performance Analysis"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
      />
    </div>
  );
}

// UI 3: College Predictor (Screenshot collegepredictorui.png)
function UI3() {
  return (
    <div
      className="select-none flex items-center justify-center"
      style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}
    >
      <img
        src="/images/collegepredictorui.png"
        alt="College Predictor"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
      />
    </div>
  );
}

// UI 4: Instant AI Doubt Solver (Screenshot aidoubtui.png)
function UI4() {
  return (
    <div
      className="select-none flex items-center justify-center"
      style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}
    >
      <img
        src="/images/aidoubtui.png"
        alt="AI Doubt Solver"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", display: "block" }}
      />
    </div>
  );
}

// UI 5: Live Study Council (Coded live dashboard utilizing strictly brand colors)
function UI5() {
  const chs: [string, boolean][] = [
    ["# general-cuet", false],
    ["# bs-notes", false],
    ["# acc-doubts", true],
    ["# pyqs-share", false]
  ];
  return (
    <div
      className="flex"
      style={{ position: "absolute", inset: 0, background: "var(--color-canvas-bg)", color: "var(--color-text-primary)", fontFamily: "inherit", overflow: "hidden" }}
    >
      {/* Channels Sidebar */}
      <div className="border-r border-border bg-surface-elevated p-3 flex flex-col gap-3 shrink-0 select-none" style={{ width: "110px" }}>
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Study Rooms</span>
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
        </div>
        <div className="flex flex-col gap-1.5">
          {chs.map(([ch, active]) => (
            <div
              key={ch}
              className={cn(
                "px-2 py-1 rounded-lg text-[9px] font-bold truncate",
                active
                  ? "bg-brand-accent-subtle text-brand-accent-dark"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              {ch}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Pane */}
      <div className="flex-1 flex flex-col p-4 gap-3 min-w-0 bg-surface-card">
        <div className="flex items-center justify-between pb-2 border-b border-border shrink-0 select-none">
          <span className="text-[10px] font-black text-text-primary"># acc-doubts</span>
          <span className="text-[8px] font-bold bg-brand-accent-subtle text-brand-accent-dark px-2 py-0.5 rounded-full">142 ONLINE</span>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 flex flex-col gap-3 justify-end overflow-hidden pr-0.5 select-none">
          {[
            { user: "Aarav S.", color: "bg-brand-pop", text: "Does anyone have the formula sheet for partnership dissolution?" },
            { user: "Priya M.", color: "bg-brand-accent", text: "Yes! Check the pinned posts in #notes-share. I uploaded a 2-page summary." },
            { user: "Prof. Arjun", color: "bg-slate-800", tag: "Tutor", text: "Remember that realization expenses paid by a partner are credited to Partner's Capital Account." }
          ].map((msg, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0", msg.color)}>
                {msg.user[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[9.5px] font-black text-text-primary truncate">{msg.user}</span>
                  {msg.tag && (
                    <span className="bg-brand-accent-subtle text-brand-accent-dark border border-brand-accent/10 text-[6px] font-black px-1 rounded-sm">
                      {msg.tag}
                    </span>
                  )}
                </div>
                <p className="text-[9px] text-text-secondary leading-normal font-medium mt-0.5">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 bg-surface-elevated border border-border rounded-xl px-3 py-2 shrink-0 select-none">
          <input readOnly placeholder="Message #acc-doubts..." className="flex-1 text-[9px] font-medium bg-transparent outline-none text-text-muted" />
          <div className="w-6 h-6 rounded-md bg-brand-accent flex items-center justify-center text-white shrink-0">
            <ArrowRight size={12} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
}

const UIS = [UI0, UI1, UI2, UI3, UI4, UI5];

/* ────────────────────────────────────────────────────────── */
/*  Main Component                                            */
/* ────────────────────────────────────────────────────────── */
export function SplitFeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Use GSAP MatchMedia to handle responsive layouts and avoid breaks on window resize
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];

      // Set initial states
      cards.forEach((c, i) => {
        const indicator = c.querySelector("[data-indicator-line]") as HTMLElement;
        const dot = c.querySelector("[data-number-dot]") as HTMLElement;
        const badge = c.querySelector("[data-badge]") as HTMLElement;

        gsap.set(c, {
          opacity: i === 0 ? 1 : 0.25,
          scale: i === 0 ? 1.02 : 0.95,
        });

        if (indicator) gsap.set(indicator, { scaleY: i === 0 ? 1 : 0 });
        if (dot) {
          gsap.set(dot, {
            backgroundColor: i === 0 ? FEATURES[i].accent : "#FFFFFF",
            color: i === 0 ? "#FFFFFF" : "#71717A",
            borderColor: i === 0 ? FEATURES[i].accent : "rgba(9, 9, 11, 0.08)",
            boxShadow: i === 0 ? "0 4px 12px rgba(124, 58, 237, 0.15)" : "none",
          });
        }
        if (badge) {
          gsap.set(badge, {
            backgroundColor: i === 0 ? FEATURES[i].accentBg : "rgba(9, 9, 11, 0.04)",
            color: i === 0 ? FEATURES[i].accent : "#71717A",
          });
        }
      });

      panels.forEach((p, i) => {
        gsap.set(p, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
          scale: i === 0 ? 1 : 0.95,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      // Pin the right panel container inside the section block
      ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: rightPanelRef.current,
        start: "top top+=120", // Pin below the navigation bar
        end: "bottom bottom-=120",
        pinSpacing: false,
      });

      // Active card toggle hooks on scroll
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              go(i);
            }
          }
        });
      });

      function go(idx: number) {
        if (idx === activeRef.current) return;
        const prev = activeRef.current;
        activeRef.current = idx;

        // Transition Left Text Cards
        cards.forEach((c, i) => {
          const isCurrent = i === idx;
          const indicator = c.querySelector("[data-indicator-line]") as HTMLElement;
          const dot = c.querySelector("[data-number-dot]") as HTMLElement;
          const badge = c.querySelector("[data-badge]") as HTMLElement;

          gsap.to(c, {
            opacity: isCurrent ? 1 : 0.25,
            scale: isCurrent ? 1.02 : 0.95,
            duration: 0.4,
            ease: "power2.out"
          });

          if (indicator) {
            gsap.to(indicator, {
              scaleY: isCurrent ? 1 : 0,
              duration: 0.4,
              ease: "power2.out"
            });
          }

          if (dot) {
            gsap.to(dot, {
              backgroundColor: isCurrent ? FEATURES[i].accent : "#FFFFFF",
              color: isCurrent ? "#FFFFFF" : "#71717A",
              borderColor: isCurrent ? FEATURES[i].accent : "rgba(9, 9, 11, 0.08)",
              boxShadow: isCurrent ? "0 4px 12px rgba(124, 58, 237, 0.15)" : "none",
              duration: 0.4,
              ease: "power2.out"
            });
          }

          if (badge) {
            gsap.to(badge, {
              backgroundColor: isCurrent ? FEATURES[i].accentBg : "rgba(9, 9, 11, 0.04)",
              color: isCurrent ? FEATURES[i].accent : "#71717A",
              duration: 0.4,
              ease: "power2.out"
            });
          }
        });

        // Transition Right mockup panels (fade and slide)
        gsap.to(panels[prev], {
          opacity: 0,
          y: -30,
          scale: 0.95,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.in"
        });
        gsap.fromTo(panels[idx],
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.45,
            ease: "power2.out",
            delay: 0.05
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-canvas-bg text-text-primary py-24 overflow-visible"
    >
      <div className="mx-auto px-6 relative z-10" style={{ maxWidth: "1500px" }}>
        {/* ── Section Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span
            className="inline-block text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 border border-brand-accent/20 bg-brand-accent-subtle text-brand-accent-dark"
          >
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-5 text-text-primary">
            One platform. Six powerful tools.
          </h2>
          <p className="text-sm md:text-base text-text-muted font-medium max-w-lg mx-auto leading-relaxed">
            Every tool you need to ace the CUET — built to feel as good as it works.
          </p>
        </div>

        {/* ── Split Scroll Layout ── */}
        <div ref={triggerRef} className="relative w-full">
          {/* Desktop Pinned Scroll View */}
          <div className="hidden lg:flex gap-8 items-start w-full">
            {/* Left side: scrolling text cards */}
            <div className="flex flex-col relative shrink-0" style={{ width: "calc(35% - 16px)", gap: "35vh", paddingTop: "15vh", paddingBottom: "15vh", paddingLeft: "24px" }}>
              {/* Vertical timeline track line */}
              <div className="absolute top-0 bottom-0 w-[2px] bg-border" style={{ left: "29px" }} />

              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="relative py-4 transition-all duration-300 select-none"
                  style={{ willChange: "opacity, transform", paddingLeft: "48px" }}
                >
                  {/* Indicator Line */}
                  <div
                    className="absolute top-2 bottom-2 w-[4px] rounded-full transition-transform duration-300 origin-center"
                    style={{
                      backgroundColor: f.accent,
                      left: "4px"
                    }}
                    data-indicator-line
                  />

                  {/* Number Dot */}
                  <div
                    className="absolute top-[10px] w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 select-none border transition-all duration-300 z-10 bg-surface-card"
                    style={{ left: "-15px" }}
                    data-number-dot
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block text-[9px] font-black uppercase tracking-[0.14em] mb-2.5 px-2.5 py-1 rounded-full transition-colors duration-300"
                      data-badge
                    >
                      {f.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-text-primary mb-3 tracking-tight leading-snug">{f.title}</h3>
                    <p className="text-[13px] font-medium text-text-muted leading-relaxed mb-4">{f.desc}</p>
                    <ul className="flex flex-col gap-2">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[12px] font-bold text-text-secondary">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: f.accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: sticky visualization box */}
            <div className="flex justify-end shrink-0" style={{ width: "calc(65% - 16px)" }}>
              <div
                ref={rightPanelRef}
                className="w-full relative shrink-0"
                style={{ height: "530px" }}
              >
                {/* Browser Frame */}
                <div
                  className="w-full rounded-[24px] overflow-hidden flex flex-col border border-border shadow-elevated bg-surface-card"
                  style={{ height: "530px" }}
                >
                  {/* Mock Browser Header */}
                  <div
                    className="flex items-center gap-2 px-5 py-3.5 shrink-0 border-b border-border select-none bg-surface-elevated"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <div
                      className="flex-1 mx-3 h-6 rounded-md flex items-center px-3 gap-2 bg-surface-card border border-border"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      <span className="text-[9.5px] text-text-muted font-semibold truncate leading-none">dugate.app</span>
                    </div>
                  </div>

                  {/* Inner Screen Display (overlapping UIs) */}
                  <div className="relative flex-1 overflow-hidden bg-canvas-bg">
                    {UIS.map((UI, i) => (
                      <div
                        key={i}
                        ref={(el) => { panelRefs.current[i] = el; }}
                        className="absolute inset-0 animate-in-delay-1"
                        style={{
                          willChange: "opacity, transform",
                          opacity: i === 0 ? 1 : 0,
                          pointerEvents: i === 0 ? "auto" : "none",
                          transform: i === 0 ? "none" : "translateY(30px)"
                        }}
                      >
                        <UI />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Stacked View */}
          <div className="flex flex-col gap-16 lg:hidden">
            {FEATURES.map((f, i) => {
               const UI = UIS[i];
               return (
                 <div
                   key={f.title}
                   className="flex flex-col gap-6 p-6 rounded-2xl border border-border bg-surface-card shadow-card relative pl-10"
                 >
                   {/* Left Accent indicator line */}
                   <div
                     className="absolute left-0 top-6 bottom-6 w-[4px] rounded-r-full"
                     style={{ backgroundColor: f.accent }}
                   />

                   {/* Text Details */}
                   <div>
                     <span
                       className="inline-block text-[9px] font-black uppercase tracking-[0.14em] mb-2.5 px-2.5 py-1 rounded-full animate-in-delay-1"
                       style={{ backgroundColor: f.accentBg, color: f.accent }}
                     >
                       {f.badge}
                     </span>
                     <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug">{f.title}</h3>
                     <p className="text-[12.5px] font-medium text-text-muted leading-relaxed mb-3">{f.desc}</p>
                     <ul className="flex flex-col gap-1.5">
                       {f.bullets.map((b) => (
                         <li key={b} className="flex items-center gap-2 text-[11px] font-bold text-text-secondary">
                           <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: f.accent }} />
                           {b}
                         </li>
                       ))}
                     </ul>
                   </div>

                   {/* Mock Browser UI Container */}
                   <div
                     className="w-full rounded-xl overflow-hidden flex flex-col border border-border shadow-card bg-surface-card"
                     style={{ aspectRatio: "4 / 3.1" }}
                   >
                     {/* Mock Browser Header */}
                     <div
                       className="flex items-center gap-1.5 px-3.5 py-2.5 shrink-0 border-b border-border select-none bg-surface-elevated"
                     >
                       <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                       <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                       <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                       <div
                         className="flex-1 mx-2 h-4.5 rounded flex items-center px-2 gap-1.5 bg-surface-card border border-border"
                       >
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                         <span className="text-[8px] text-text-muted font-semibold truncate leading-none">dugate.app</span>
                       </div>
                     </div>

                     <div className="flex-1 relative overflow-hidden bg-canvas-bg">
                       <UI />
                     </div>
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </section>
  );
}
