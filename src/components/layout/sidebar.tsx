"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Gauge,
  ClipboardText,
  Archive,
  BookOpen,
  GraduationCap,
  FileText,
  ChartLineUp,
  Question,
  Books,
  Calculator,
  Gear,
  SignOut,
  type Icon,
} from "@phosphor-icons/react";

interface NavItem {
  label: string;
  href: string;
  icon: Icon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Mock Tests", href: "/mocks", icon: ClipboardText },
  { label: "PYQ Bank", href: "/pyq", icon: Archive },
  { label: "Chapter Practice", href: "/practice", icon: BookOpen },
  { label: "Flashcards", href: "/flashcards", icon: GraduationCap },
  { label: "NCERT Notes", href: "/notes", icon: FileText },
  { label: "Analysis", href: "/analysis", icon: ChartLineUp },
  { label: "Ask a Doubt", href: "/doubt", icon: Question },
  { label: "Question Library", href: "/library", icon: Books },
  { label: "College Predictor", href: "/college-predictor", icon: Calculator },
  { label: "Settings", href: "/settings", icon: Gear },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] h-full bg-surface-card border-r border-border flex flex-col shrink-0">
      <div className="px-5 pt-6 pb-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 group"
        >
          <div className="size-9 rounded-[10px] bg-brand-accent flex items-center justify-center shadow-glow transition-transform duration-200 group-hover:scale-105">
            <img src="/logo.svg" alt="DUGATE" className="size-6" />
          </div>
          <div>
            <span className="text-[17px] font-bold text-text-primary leading-none block">
              DUGATE
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
              Exam Prep
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all duration-150 relative",
                isActive
                  ? "bg-brand-accent-subtle text-brand-accent-dark"
                  : "text-text-secondary hover:bg-text-primary/5 hover:text-text-primary"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-brand-accent" />
              )}
              <Icon
                size={18}
                weight={isActive ? "fill" : "regular"}
                className={cn(
                  "shrink-0 transition-all",
                  isActive && "text-brand-accent"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-[10px]">
          <div className="size-8 rounded-full bg-brand-accent-subtle flex items-center justify-center text-brand-accent-dark font-bold text-[12px]">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-text-primary truncate">
              User
            </p>
            <p className="text-[11px] font-medium text-text-muted truncate">
              priyanshgfounder1501
            </p>
          </div>
          <button className="text-text-muted hover:text-text-secondary transition-colors">
            <SignOut size={16} weight="fill" />
          </button>
        </div>
      </div>
    </aside>
  );
}
