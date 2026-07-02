import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconArrowUp, IconArrowRight } from "@/components/landing/icons/icons"

const stats = [
  { value: "2,200+", label: "Practice Questions" },
  { value: "21", label: "Government Papers" },
  { value: "100%", label: "Free & Offline" },
]

export function StatsSection() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-text-primary text-white">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_#7C3AED_0%,_transparent_60%)]" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_#FF4E88_0%,_transparent_60%)] absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-grain opacity-[0.12]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-4 mx-auto flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold">
            <span className="size-1.5 rounded-full bg-status-success animate-pulse" />
            Built by CUET aspirants, for CUET aspirants
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-14 md:mb-16 tracking-tight text-center text-white">
          Your success is our mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-2xl flex flex-col items-center text-center justify-center bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] backdrop-blur-lg"
            >
              <div className="w-8 h-8 opacity-60 mb-4">
                <IconArrowUp />
              </div>
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link href="/auth/signup">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-text-primary hover:bg-white/90 text-[15px] px-10 py-3.5"
            >
              Start Your Journey
              <IconArrowRight />
            </Button>
          </Link>
          <p className="mt-4 text-[12px] font-medium text-white/40">
            No credit card required &bull; 100% free &bull; Works offline
          </p>
        </div>
      </div>
    </section>
  )
}
