"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconLogo, IconArrowRight } from "@/components/landing/icons/icons"

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Practice", href: "#practice" },
  { label: "PYQ Bank", href: "#pyq" },
  { label: "Pricing", href: "#pricing" },
]

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500",
        isScrolled ? "pt-3 pb-1" : "pt-4 md:pt-6"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-out",
          /* Scrolled: compact floating pill */
          isScrolled
            ? "w-[calc(100%-1.5rem)] max-w-5xl h-12 px-4 bg-white/80 backdrop-blur-xl border border-border rounded-pill shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : /* At top: open, blends into the hero white backdrop */
              "w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] max-w-6xl h-14 px-5 md:px-6 bg-white/60 backdrop-blur-md border border-white/70 rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <IconLogo
              className={cn(
                "text-brand-accent transition-all duration-300",
                isScrolled ? "size-6" : "size-7"
              )}
            />
            {/* Subtle glow under logo on hover */}
            <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150" />
          </div>
          <div>
            <span
              className={cn(
                "font-bold text-text-primary leading-none block tracking-tight transition-all duration-300",
                isScrolled ? "text-[15px]" : "text-[17px]"
              )}
            >
              DUGATE
            </span>
            <span
              className={cn(
                "font-semibold uppercase tracking-[0.12em] text-brand-accent transition-all duration-300",
                isScrolled ? "text-[9px]" : "text-[10px]"
              )}
            >
              Exam Prep
            </span>
          </div>

        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "relative text-[13px] font-semibold text-text-secondary hover:text-brand-accent-dark transition-colors duration-200 rounded-[8px] group",
                isScrolled ? "px-3 py-1.5" : "px-3.5 py-2"
              )}
            >
              {/* Hover highlight pill */}
              <span className="absolute inset-0 rounded-[8px] bg-brand-accent/0 group-hover:bg-brand-accent/8 transition-all duration-200" />
              <span className="relative">{label}</span>
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="text-[13px] font-semibold text-text-secondary hover:text-text-primary transition-colors px-3 py-1.5 rounded-[8px] hover:bg-text-primary/5"
          >
            Log in
          </Link>
          <Link href="/dashboard" className="group">
            <Button
              variant="accent"
              size="sm"
              className={cn(
                "transition-all duration-300 shadow-sm hover:shadow-[0_0_16px_rgba(124,58,237,0.35)]",
                isScrolled ? "" : "text-[13px] px-4 py-2"
              )}
            >
              Get Started
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <IconArrowRight />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
