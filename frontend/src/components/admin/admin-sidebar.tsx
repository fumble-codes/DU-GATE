"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/db/supabase-browser";
import {
  Gauge,
  Question,
  DownloadSimple,
  ClipboardText,
  Lightbulb,
  Image,
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
  { label: "Dashboard", href: "/admin", icon: Gauge },
  { label: "Question Bank", href: "/admin/questions", icon: Question },
  { label: "Imports", href: "/admin/imports", icon: DownloadSimple },
  { label: "Mock Builder", href: "/admin/mocks", icon: ClipboardText },
  { label: "Concepts", href: "/admin/concepts", icon: Lightbulb },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Settings", href: "/admin/settings", icon: Gear },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <aside className="w-[240px] h-full bg-surface-card border-r border-border flex flex-col shrink-0">
      <div className="px-5 pt-6 pb-5">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <img
            src="/logo.svg"
            alt="DUGATE"
            className="size-9 transition-transform duration-200 group-hover:scale-105"
          />
          <div>
            <span className="text-[17px] font-bold text-text-primary leading-none block">
              DUGATE
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-accent">
              Admin Panel
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
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-text-primary truncate">
              Admin
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-text-muted hover:text-text-secondary transition-colors"
            title="Sign out"
          >
            <SignOut size={16} weight="fill" />
          </button>
        </div>
      </div>
    </aside>
  );
}
