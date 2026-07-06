import { cn } from "@/lib/utils"

function IconBase({ children, className }: { children: React.ReactNode; className?: string }) {
  return <svg className={cn("size-5", className)} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">{children}</svg>
}

export function IconMockTest({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10h8M6 13h5M6 7h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconBase>
  )
}

export function IconPYQ({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M3 3h3v14H3V3zM8 3h3v14H8V3zM13 5h4v12h-4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </IconBase>
  )
}

export function IconOffline({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 4l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 8a2.5 2.5 0 004.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </IconBase>
  )
}

export function IconFlashcards({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconBase>
  )
}

export function IconAnalysis({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <rect x="2" y="12" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="7" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="2" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </IconBase>
  )
}

export function IconCollege({ className }: { className?: string }) {
  return (
    <IconBase className={className}>
      <path d="M10 2L2 7v1h16V7l-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 11v3h3v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 11v3h3v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconBase>
  )
}

export function IconLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("size-5", className)} viewBox="0 0 408.46 389.35" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="m296.87,337.31C345.37-40.78,38.38,51.45,110.8,379.16c5.98,17.08-55.48,7.29-88.15,8.31C-23.93,337.61,18.05,100.89,4.4,28.93c.03-10.71,8.95-19.2,19.64-18.77,237.9-53.14,529.39,108.27,302.48,342.55-12.49,8.7-29.64-.15-29.64-15.4Z" />
      <path d="m263.95,231.79c.24,16.4-25.52,16.4-25.28,0-.24-16.4,25.52-16.4,25.28,0Z" />
    </svg>
  )
}

export function IconArrowUp({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4", className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
