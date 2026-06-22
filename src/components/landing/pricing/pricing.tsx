import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function IconSubject({ className }: { className?: string }) {
  return (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v16H4V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconMocks({ className }: { className?: string }) {
  return (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPremium({ className }: { className?: string }) {
  return (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.5 5.5L20 8.5l-4 4.5 1 6L12 16l-5 3 1-6-4-4.5 5.5-1L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4 shrink-0", className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const plans = [
  {
    name: "Subject Only",
    price: "₹500",
    description: "Focused preparation material for a single subject — chapter notes, summaries, and practice questions.",
    badge: null,
    icon: IconSubject,
    features: [
      "Complete study material for 1 subject",
      "Chapter-wise notes & summaries",
      "Topic-wise practice questions",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
    iconColor: "text-brand-accent",
    iconBg: "bg-brand-accent/10",
    badgeColor: "",
  },
  {
    name: "Mocks Only",
    price: "₹1,000",
    description: "Full-length mock tests across all subjects with real NTA interface and detailed analytics.",
    badge: "Most Popular",
    icon: IconMocks,
    features: [
      "All subject mock tests",
      "Real NTA CBT interface",
      "60-minute timed sessions",
      "Detailed performance analysis",
    ],
    cta: "Get Started",
    ctaVariant: "pop" as const,
    iconColor: "text-brand-pop",
    iconBg: "bg-brand-pop/10",
    badgeColor: "bg-brand-pop text-white",
  },
  {
    name: "Full Package",
    price: "₹1,800",
    description: "Complete access — all subjects material, all mocks, 21 PYQ papers, and priority support.",
    badge: "Best Value",
    icon: IconPremium,
    features: [
      "All subjects study material",
      "All subject mock tests",
      "21 Government PYQ papers",
      "Detailed performance analytics",
      "Priority email support",
    ],
    cta: "Get Full Access",
    ctaVariant: "accent" as const,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    badgeColor: "bg-amber-400 text-amber-900",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#7C3AED_0%,_transparent_60%)]" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#FF4E88_0%,_transparent_60%)] absolute inset-0" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <div className="mb-4 inline-flex items-center px-3 py-0.5 rounded-full bg-brand-accent-subtle text-brand-accent-dark text-xs font-semibold">
            Simple pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">
            Pick the plan that fits
          </h2>
          <p className="text-[14px] font-medium text-text-muted max-w-lg mx-auto">
            One-time payment. Lifetime access. No subscriptions, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-[24px] border bg-white transition-all duration-300",
                  plan.badge === "Most Popular"
                    ? "border-brand-pop/20 shadow-elevated shadow-brand-pop/5 scale-[1.02] md:scale-105"
                    : "border-border shadow-card hover:shadow-card-hover",
                  "hover:translate-y-[-4px]"
                )}
              >
                {plan.badge && (
                  <div
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em]",
                      plan.badgeColor
                    )}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 pt-10 flex flex-col h-full">
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-5", plan.iconBg)}>
                    <Icon className={plan.iconColor} />
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-1">{plan.name}</h3>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-[40px] font-bold text-text-primary tracking-[-0.03em] leading-none">
                      {plan.price}
                    </span>
                    <span className="text-[13px] font-medium text-text-muted">one-time</span>
                  </div>

                  <p className="text-[13px] leading-[1.6] font-medium text-text-muted mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-[13px]">
                        <CheckIcon
                          className={cn(
                            "mt-0.5",
                            plan.badge === "Most Popular"
                              ? "text-brand-pop"
                              : plan.badge === "Best Value"
                                ? "text-amber-500"
                                : "text-brand-accent"
                          )}
                        />
                        <span className="text-text-secondary font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard" className="block w-full">
                    <Button variant={plan.ctaVariant} size="lg" className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center mt-10 text-[12px] font-medium text-text-muted">
          All plans include lifetime access · No recurring charges · Cancel anytime
        </p>
      </div>
    </section>
  )
}
