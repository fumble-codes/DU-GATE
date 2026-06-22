import Link from "next/link"

const productLinks = [
  { label: "Mock Tests", href: "/mocks" },
  { label: "PYQ Bank", href: "/pyq" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "College Predictor", href: "/college-predictor" },
  { label: "Doubt Solver", href: "/doubt" },
]

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

const resourceLinks = [
  { label: "CUET Syllabus", href: "/resources/syllabus" },
  { label: "Exam Guide", href: "/resources/guide" },
  { label: "NCERT Notes", href: "/notes" },
  { label: "Help Center", href: "/help" },
]

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
]

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  }
  return <>{icons[name] ?? null}</>
}

export function Footer() {
  return (
    <footer className="relative">
      <div className="max-w-6xl mx-auto px-6 border-t border-border bg-white rounded-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/[0.02] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-pop/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 pb-12 border-b border-border">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="size-9 rounded-[10px] bg-brand-accent flex items-center justify-center text-white font-extrabold text-[15px] transition-transform duration-200 group-hover:scale-105">
                D
              </div>
              <div>
                <span className="text-[17px] font-bold text-text-primary leading-none block">DUGATE</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">Exam Prep</span>
              </div>
            </Link>
            <p className="text-[13px] leading-relaxed font-medium text-text-muted max-w-xs mb-6">
              {"India's"} most authentic CUET practice platform — built by aspirants, for aspirants. 100% free, offline-first.
            </p>
            <div className="flex items-center gap-3">
              {["twitter", "youtube", "instagram", "linkedin"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="size-9 rounded-lg border border-border bg-canvas-bg flex items-center justify-center text-text-muted hover:text-brand-accent hover:border-brand-accent/30 hover:bg-brand-accent-subtle transition-all duration-200"
                  aria-label={s}
                >
                  <SocialIcon name={s} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-semibold text-text-secondary hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-semibold text-text-secondary hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-semibold text-text-secondary hover:text-brand-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-12 md:col-start-6 md:row-start-2 md:mt-2">
            <div className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-[12px] font-medium text-text-muted hover:text-text-secondary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-medium text-text-muted">
            {"©"} {new Date().getFullYear()} DUGATE. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] font-medium text-text-muted">
            <span className="size-1.5 rounded-full bg-status-success animate-pulse" />
            Built with care for CUET aspirants
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
