"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { AppLayout } from "@/components/layout/app-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heading, Body } from "@/components/ui/typography"

/* ─── Teacher definitions ─── */
interface Teacher {
  id: string
  name: string
  subject: string
  emoji: string
  tagline: string
  color: string
  bgClass: string
}

const teachers: Teacher[] = [
  {
    id: "accountancy",
    name: "Prof. Aanya",
    subject: "Accountancy",
    emoji: "\u{1F4CA}",
    tagline: "Partnerships, ratios, and journal entries mastered here.",
    color: "from-brand-accent to-brand-accent-dark",
    bgClass: "bg-brand-accent/10 text-brand-accent-dark",
  },
  {
    id: "business-studies",
    name: "Prof. Kabir",
    subject: "Business Studies",
    emoji: "\u{1F4BC}",
    tagline: "Management, marketing, and business strategy simplified.",
    color: "from-brand-pop to-brand-pop-dark",
    bgClass: "bg-brand-pop/10 text-brand-pop-dark",
  },
  {
    id: "economics",
    name: "Prof. Meera",
    subject: "Economics",
    emoji: "\u{1F4C8}",
    tagline: "Micro, macro, and Indian economy — clear as day.",
    color: "from-emerald-500 to-emerald-700",
    bgClass: "bg-status-success/10 text-status-success",
  },
  {
    id: "english",
    name: "Prof. James",
    subject: "English",
    emoji: "\u{1F4DD}",
    tagline: "Grammar, vocabulary, and reading comprehension made easy.",
    color: "from-amber-500 to-amber-700",
    bgClass: "bg-amber-50 text-amber-700",
  },
  {
    id: "general",
    name: "Prof. Arjun",
    subject: "General CUET",
    emoji: "\u{1F393}",
    tagline: "Exam strategy, time management, and everything CUET.",
    color: "from-violet-500 to-violet-700",
    bgClass: "bg-violet-50 text-violet-700",
  },
]

/* ─── Chat message type ─── */
interface Message {
  role: "user" | "assistant"
  content: string
}

/* ─── Page ─── */
export default function CouncilPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function selectTeacher(t: Teacher) {
    if (selectedTeacher?.id === t.id) return
    setSelectedTeacher(t)
    setMessages([
      {
        role: "assistant",
        content: `Hello! I'm ${t.name}, your ${t.subject} tutor. Ask me anything about ${t.subject.toLowerCase()} and I'll help you prepare for CUET.`,
      },
    ])
    setInput("")
    setError(null)
  }

  async function handleSend() {
    if (!input.trim() || !selectedTeacher || isLoading) return
    const question = input.trim()
    setInput("")
    setError(null)

    setMessages((prev) => [...prev, { role: "user", content: question }])
    setIsLoading(true)

    try {
      const res = await fetch("/api/doubt/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          subject: selectedTeacher.id === "general" ? "CUET" : selectedTeacher.subject,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Something went wrong")

      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response")
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-in">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Heading as="h1">AI Teachers</Heading>
              <Badge variant="accent" size="sm">Beta</Badge>
            </div>
            <Body size="meta" muted>
              Dedicated subject experts powered by AI to guide your CUET preparation.
            </Body>
          </div>
          {selectedTeacher && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedTeacher(null)
                setMessages([])
              }}
            >
              All Teachers
            </Button>
          )}
        </div>

        {!selectedTeacher ? (
          /* ─── Teacher selection grid ─── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {teachers.map((t) => (
              <Card
                key={t.id}
                variant="interactive"
                padding="uniform"
                onClick={() => selectTeacher(t)}
                className="group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center gap-3 py-2">
                  <div
                    className={cn(
                      "size-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110",
                      t.bgClass
                    )}
                  >
                    {t.emoji}
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-text-primary">{t.name}</p>
                    <p className="text-[11px] font-semibold text-text-muted mt-0.5">{t.subject}</p>
                  </div>
                  <p className="text-[11px] leading-[1.5] font-medium text-text-muted line-clamp-2">
                    {t.tagline}
                  </p>
                  <div className={cn("w-full h-1 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity", t.color)} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* ─── Chat interface ─── */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Teacher sidebar */}
            <div className="lg:col-span-1 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Switch Teacher
              </p>
              {teachers.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectTeacher(t)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150",
                    selectedTeacher?.id === t.id
                      ? "bg-brand-accent-subtle border border-brand-accent/20"
                      : "bg-transparent border border-transparent hover:bg-text-primary/5"
                  )}
                >
                  <div className={cn("size-9 rounded-xl flex items-center justify-center text-lg shrink-0", t.bgClass)}>
                    {t.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-text-primary truncate">{t.name}</p>
                    <p className="text-[10px] font-medium text-text-muted truncate">{t.subject}</p>
                  </div>
                  {selectedTeacher?.id === t.id && (
                    <span className="size-2 rounded-full bg-brand-accent shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Chat panel */}
            <div className="lg:col-span-3 flex flex-col">
              <Card variant="default" padding="none" className="flex-1 flex flex-col overflow-hidden">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <div className={cn("size-10 rounded-xl flex items-center justify-center text-xl", selectedTeacher.bgClass)}>
                    {selectedTeacher.emoji}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-text-primary">{selectedTeacher.name}</p>
                    <p className="text-[11px] font-medium text-text-muted">{selectedTeacher.subject} Tutor</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[400px] max-h-[500px]">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-3",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.role === "assistant" && (
                        <div className={cn("size-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5", selectedTeacher.bgClass)}>
                          {selectedTeacher.emoji}
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-[1.7]",
                          msg.role === "user"
                            ? "bg-brand-accent text-white rounded-br-md"
                            : "bg-canvas-bg border border-border text-text-primary rounded-bl-md"
                        )}
                      >
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div className="size-8 rounded-xl bg-text-primary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                          U
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className={cn("size-8 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5", selectedTeacher.bgClass)}>
                        {selectedTeacher.emoji}
                      </div>
                      <div className="max-w-[75%] rounded-2xl rounded-bl-md px-4 py-3 bg-canvas-bg border border-border">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="size-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="size-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex justify-center">
                      <div className="bg-status-alert/10 border border-status-alert/20 text-status-alert text-[12px] font-medium px-4 py-2.5 rounded-xl flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M7 4.5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        {error}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="px-5 py-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask ${selectedTeacher.name} about ${selectedTeacher.subject.toLowerCase()}...`}
                      disabled={isLoading}
                      className="flex-1 bg-canvas-bg border border-border rounded-xl px-4 py-2.5 text-[13px] font-medium text-text-primary placeholder:text-text-muted/60 outline-none focus:border-brand-accent/40 focus:ring-2 focus:ring-brand-accent/10 transition-all disabled:opacity-50"
                    />
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      shape="default"
                      className="shrink-0"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 8l12-6-4 6 4 6-12-6z" fill="currentColor" />
                        <path d="M6 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
