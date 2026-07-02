"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IconMockTest, IconFlashcards, IconAnalysis, IconCollege } from "@/components/landing/icons/icons";
import { useEffect, useRef, useState } from "react";

const splitFeatures = [
  {
    icon: IconMockTest,
    title: "Mock Tests",
    description:
      "Full-length practice tests simulating the real CUET exam. 50 MCQs per test, 60-minute timer, 250 marks total with +5/-1 scoring. Instant results with detailed explanations for every question.",
  },
  {
    icon: IconFlashcards,
    title: "Flashcards & NCERT Notes",
    description:
      "Spaced-repetition flashcards for English vocabulary and chapter-wise decks. Concise NCERT revision notes across all 4 subjects in an easy-to-digest format.",
  },
  {
    icon: IconAnalysis,
    title: "Performance Analysis",
    description:
      "Track accuracy, subject-wise breakdowns, chapter progress, and an activity heatmap. Identify strong and weak topics for targeted preparation.",
  },
  {
    icon: IconCollege,
    title: "College Predictor",
    description:
      "Real 2025 CSAS cutoff data for B.Com programs. Adjust score sliders across 4 subjects and get instant college predictions with safety and risk assessment.",
  },
  {
    icon: IconMockTest,
    title: "Instant AI Doubt",
    description:
      "Ask AI-powered doubts instantly and receive quick, accurate explanations.",
  },
  {
    icon: IconCollege,
    title: "Council",
    description:
      "Collaborative council discussions and resource sharing for peer learning.",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = height - viewportHeight;
      const scrolled = -top;
      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      const index = Math.min(5, Math.floor(progress * 6));
      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="practice" ref={containerRef} className="relative h-[600vh] bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-12 md:py-0">
        <div className="max-w-6xl mx-auto w-full px-6">
          <div className="text-center mb-10 md:mb-12 transition-all duration-500">
            <div className="mb-3 inline-flex items-center px-3 py-0.5 rounded-full bg-brand-accent-subtle text-brand-accent-dark text-xs font-semibold">
              Everything you need
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              One platform, six powerful tools
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="md:col-span-5 flex flex-col gap-4 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border rounded-full hidden md:block" />
              <div 
                className="absolute left-6 w-0.5 bg-brand-accent rounded-full transition-all duration-500 hidden md:block"
                style={{ top: '24px', height: `${(activeIndex / 5) * 100}%`, maxHeight: 'calc(100% - 48px)' }}
              />

              {splitFeatures.map((feat, i) => {
                const Icon = feat.icon;
                const isActive = i === activeIndex;
                return (
                  <div key={feat.title} className={cn("flex items-start gap-5 transition-all duration-700 ease-out relative z-10", isActive ? "opacity-100 scale-100" : "opacity-40 scale-95 cursor-default")}>
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all duration-500", isActive ? "bg-brand-accent/15 text-brand-accent-dark" : "bg-surface-card text-text-muted border border-border")}>
                      {i === 4 ? <span className="text-xl">✨</span> : i === 5 ? <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div className="pt-1">
                      <h3 className={cn("font-bold md:text-xl text-text-primary transition-all duration-500", isActive ? "text-xl mb-2" : "text-lg mb-0")}>{feat.title}</h3>
                      <div className={cn("grid transition-all duration-500", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <p className="text-sm leading-relaxed font-medium text-text-muted overflow-hidden">{feat.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="md:col-span-7 relative h-[380px] md:h-[460px] w-full perspective-1000">
              <div className="absolute inset-0 w-full h-full">
                {activeIndex === 0 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pop/5 blur-[80px] rounded-full pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none" />
                      <div className="w-full max-w-lg relative z-10">
                        <div className="flex items-center gap-2 mb-5">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">Mock Test Interface</span>
                          <Badge variant="accent" size="sm">NTA CBT Replica</Badge>
                        </div>
                        <div className="bg-surface-card rounded-xl border border-border shadow-card p-4 md:p-5">
                          <div className="flex justify-between items-center mb-4 border-b border-border pb-3">
                            <div className="font-medium text-sm text-text-primary">Q.12 of 50</div>
                            <div className="text-brand-pop font-mono text-sm font-semibold">45:12</div>
                          </div>
                          <div className="mb-4 text-sm text-text-primary font-medium">Which of the following is considered a primary source of data?</div>
                          <div className="space-y-2 mb-6">
                            {["A. Newspaper Article", "B. Survey Questionnaire", "C. History Textbook", "D. Review Paper"].map((opt, i) => (
                              <div key={i} className={cn("p-2.5 rounded-lg border text-sm transition-colors cursor-default", i === 1 ? "border-brand-accent bg-brand-accent/5 text-brand-accent-dark" : "border-border text-text-muted")}>{opt}</div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-auto pt-2">
                            <button className="px-4 py-1.5 rounded-md text-xs font-semibold text-text-muted hover:bg-surface-hover transition-colors border border-border cursor-default">Previous</button>
                            <button className="px-4 py-1.5 rounded-md text-xs font-semibold bg-brand-accent text-white hover:bg-brand-accent-dark transition-colors shadow-sm cursor-default">Save & Next</button>
                          </div>
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-white rounded-xl shadow-card border border-border px-3.5 py-2 flex items-center gap-2 z-10">
                          <span className="size-2 rounded-full bg-status-success animate-pulse" />
                          <span className="text-[10px] font-semibold text-text-muted">Auto-saved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === 1 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="flex flex-col items-center justify-center p-10 bg-surface-card rounded-xl border border-border shadow-card h-64 w-full max-w-sm">
                        <IconFlashcards className="w-16 h-16 text-brand-accent mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Spaced Repetition</h3>
                        <p className="text-sm text-text-muted text-center max-w-sm">Flip through concise NCERT notes and vocabulary lists tailored for quick revision.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === 2 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="flex flex-col items-center justify-center p-10 bg-surface-card rounded-xl border border-border shadow-card h-64 w-full max-w-sm">
                        <IconAnalysis className="w-16 h-16 text-brand-accent mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Detailed Analytics</h3>
                        <p className="text-sm text-text-muted text-center max-w-sm">Track your progress and pinpoint weaknesses with chapter-wise insights.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === 3 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="flex flex-col items-center justify-center p-10 bg-surface-card rounded-xl border border-border shadow-card h-64 w-full max-w-sm">
                        <IconCollege className="w-16 h-16 text-brand-accent mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Real CSAS Cutoffs</h3>
                        <p className="text-sm text-text-muted text-center max-w-sm">Get accurate college predictions based on real 2025 cutoff data.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === 4 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="bg-surface-card rounded-xl border border-border shadow-card p-4 md:p-5 w-full flex flex-col h-full max-h-[350px]">
                        <div className="flex items-center gap-3 mb-4 border-b border-border pb-3">
                          <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center"><span className="text-brand-accent text-lg">✨</span></div>
                          <div><div className="font-semibold text-sm text-text-primary">AI Teaching Assistant</div><div className="text-[10px] text-status-success font-medium">Online</div></div>
                        </div>
                        <div className="flex-1 overflow-hidden flex flex-col gap-3">
                          <div className="self-end bg-brand-accent text-white rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[85%] shadow-sm">Can you explain the Garner vs Murray rule?</div>
                          <div className="self-start bg-canvas-bg border border-border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-primary max-w-[90%] shadow-sm leading-relaxed">
                            <p className="mb-2"><strong>Garner vs Murray (1904)</strong> applies when a partnership is dissolved and one partner becomes insolvent.</p>
                            <ul className="list-disc pl-4 space-y-1 text-text-muted"><li>Solvent partners bear the deficiency.</li><li>Shared in their <strong>capital ratio</strong>.</li></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeIndex === 5 && (
                  <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-canvas-bg rounded-2xl p-6 md:p-8 flex items-center justify-center h-full border border-border relative overflow-hidden shadow-card">
                      <div className="bg-surface-card rounded-xl border border-border shadow-card p-4 md:p-5 w-full flex flex-col max-h-[350px]">
                        <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                          <div className="font-semibold text-sm text-text-primary flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-status-success animate-pulse" /> Live Council</div>
                          <div className="text-[10px] font-semibold text-text-muted bg-canvas-bg px-2 py-1 rounded-md border border-border">142 ONLINE</div>
                        </div>
                        <div className="space-y-3 flex-1 overflow-hidden">
                          {[{user:"Aarav S.",time:"2m ago",text:"Anyone have good notes for Business Studies Ch 4?"},{user:"Priya M.",time:"Just now",text:"Check the pinned messages, I uploaded my mindmaps there!"}].map((msg,i)=>(
                            <div key={i} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex-shrink-0 flex items-center justify-center text-xs font-bold text-brand-accent">{msg.user[0]}</div>
                              <div><div className="flex items-baseline gap-2"><span className="font-semibold text-xs text-text-primary">{msg.user}</span><span className="text-[10px] text-text-muted">{msg.time}</span></div><p className="text-xs text-text-muted mt-0.5">{msg.text}</p></div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-border flex items-center gap-2"><div className="flex-1 bg-canvas-bg border border-border rounded-full px-4 py-2 text-xs text-text-muted">Type a message...</div></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
