import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote: "The mock tests are incredibly accurate to the real NTA interface. Scored 92%ile in my actual CUET!",
    author: "Ananya Sharma",
    role: "B.Com (Hons) · SRCC",
  },
  {
    quote: "Being able to practice offline is a game-changer. No wifi? No problem. PYQ bank is a goldmine.",
    author: "Rahul Verma",
    role: "B.Com · Hindu College",
  },
  {
    quote: "The detailed analysis helped me pinpoint exactly where I was losing marks. Highly recommend!",
    author: "Priya Mehta",
    role: "B.Com (Hons) · KMC",
  },
]

export function TrustSection() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-canvas-bg">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#7C3AED_0%,_transparent_60%)]" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#FF4E88_0%,_transparent_60%)] absolute inset-0" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center px-3 py-0.5 rounded-full bg-brand-accent-subtle text-brand-accent-dark text-xs font-semibold">
            Trusted by aspirants
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            What our users say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={cn(
                "p-6 rounded-2xl border border-border bg-white shadow-card flex flex-col",
                i === 1 && "md:translate-y-4"
              )}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="size-4 text-[#F59E0B]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.97l-3.52 1.85.67-3.93L2.3 5.64l3.94-.57L8 1.5z" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] leading-[1.7] font-medium text-text-secondary flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-bold text-text-primary">{t.author}</p>
                <p className="text-[11px] font-medium text-text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-8 md:gap-14 px-8 py-6 rounded-2xl bg-text-primary text-white">
            <div className="text-center">
              <p className="text-3xl font-bold">1.8k+</p>
              <p className="text-[11px] font-medium text-white/60 mt-0.5">Active Users</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold">2,200+</p>
              <p className="text-[11px] font-medium text-white/60 mt-0.5">Questions</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold">100%</p>
              <p className="text-[11px] font-medium text-white/60 mt-0.5">Free & Offline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
