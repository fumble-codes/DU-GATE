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
    <svg className={cn("size-5", className)} viewBox="0 0 832.93 829.12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="m.21,422.27c-.05-88.61-.47-177.22.07-265.83C.81,67.99,58.4,4.31,146.46,2.23,254.77-.32,363.52-1.96,471.55,4.67c168.8,10.35,320.29,154.83,353.48,328.37,32.76,171.22-37.77,336.27-186.79,429.69-18.35,11.5-50.34,19.32-66.68,10.85-16.2-8.39-27.9-39.22-28.87-60.78-3.56-79.13-.56-158.53-2.51-237.77-1.56-63.29-45.25-112.56-104.13-122.52-60.63-10.25-118.11,19.56-141.08,77.77-9.13,23.14-11.92,49.82-12.63,75.04-1.71,60.58-3.23,121.39.14,181.84,7.41,132.76-80.48,152.68-174.26,137.73C40.06,814.02.91,764.25.42,695.1c-.65-90.94-.16-181.88-.21-272.82Zm622.68,251.7c113.52-88.23,156.01-234.82,111.57-366.57-45.17-133.91-168.29-225.34-308.31-227.33-82.71-1.17-165.45-.27-248.18-.21-72.89.05-99.64,25.96-99.79,98.04-.35,165.46-.38,330.91-.14,496.37.02,12.58,1.25,25.85,5.36,37.6,10.89,31.17,45.33,43.04,92.96,34.28,31.62-5.82,26.85-30.36,26.94-51.97.33-73.4-1.36-146.86.64-220.21,3.52-128.73,121.21-223.72,245.11-199.72,107.58,20.84,173.17,102.3,173.78,216.35.32,58.99.06,117.98.06,183.37Z" />
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
