import { cn } from "@/lib/utils"
import { IconMockTest, IconPYQ, IconOffline } from "@/components/landing/icons/icons"

const anchorFeatures = [
  {
    icon: IconMockTest,
    title: "Full-Length Mock Tests",
    description: "50-question exams replicating the real NTA CBT interface with a 60-minute timer and real-time scoring.",
  },
  {
    icon: IconPYQ,
    title: "21 Government PYQ Papers",
    description: "Official CUET 2025 papers across multiple shifts — Accountancy, Business Studies, and Economics.",
  },
  {
    icon: IconOffline,
    title: "100% Offline & Free",
    description: "No internet required after initial load. No ads, no subscriptions — one-time access, forever.",
  },
]

const iconBgColors = [
  "bg-brand-pop/10 text-brand-pop-dark",
  "bg-brand-accent/10 text-brand-accent-dark",
  "bg-status-success/10 text-status-success",
]

export function FeatureAnchorRow() {
  return (
    <section className="relative -mt-8 md:-mt-12 pb-16 md:pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {anchorFeatures.map((feat, i) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="flex items-start gap-4 p-6 rounded-[16px] border border-border bg-white shadow-card hover:shadow-card-hover hover:scale-[1.01] transition-all duration-300"
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm", iconBgColors[i])}>
                  <Icon />
                </div>
                <div>
                  <p className="font-bold text-sm text-text-primary mb-1">{feat.title}</p>
                  <p className="text-[12px] leading-[1.6] font-medium text-text-muted">{feat.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
