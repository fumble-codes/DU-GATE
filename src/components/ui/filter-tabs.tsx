"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface FilterTab {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function FilterTabs({
  tabs,
  defaultTab,
  onChange,
  className,
}: FilterTabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-surface-card rounded-[10px] p-1 border border-border shadow-card",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActive(tab.id);
            onChange?.(tab.id);
          }}
          className={cn(
            "px-4 py-2 text-[12px] font-bold tracking-[0.02em] rounded-[8px] transition-all duration-150",
            active === tab.id
              ? "bg-text-primary text-white shadow-sm"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
