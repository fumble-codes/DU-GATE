"use client";

import { cn } from "@/lib/utils";
import { useInView } from "./use-scroll-animation";
import { useRef } from "react";

type Feature = {
  icon: React.ComponentType;
  title: string;
  description: string;
  image?: string | null;
};

type Props = {
  feat: Feature;
  isActive: boolean;
};

/**
 * Renders a single feature card with scroll‑triggered slide‑up animation.
 * This is a client component because it uses React hooks.
 */
export function FeatureCard({ feat, isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const Icon = feat.icon;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500",
        isActive
          ? "p-5 rounded-xl bg-brand-accent-subtle border border-brand-accent/20"
          : "p-4 opacity-60 hover:opacity-90 flex items-center gap-4 cursor-default",
        inView ? "animate-slide-up" : "opacity-0"
      )}
    >
      <div className={cn("shrink-0", isActive ? "mb-3" : "")}> 
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            isActive
              ? "bg-brand-accent/15 text-brand-accent-dark"
              : "bg-text-primary/5 text-text-muted"
          )}
        >
          <Icon />
        </div>
      </div>

      <div className={isActive ? "" : "flex-1"}>
        <p className={cn(
          "font-semibold",
          isActive ? "text-sm text-text-primary mb-1.5" : "text-sm text-text-primary"
        )}>
          {feat.title}
        </p>
        {isActive && (
          <p className="text-[12px] leading-[1.7] font-medium text-text-muted">
            {feat.description}
          </p>
        )}
        {feat.image && (
          <img src={feat.image} alt={feat.title} className="mt-2 rounded-md shadow-md" />
        )}
      </div>
    </div>
  );
}
