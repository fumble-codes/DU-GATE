import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("bg-surface-card rounded-card border border-border transition-all duration-200", {
  variants: {
    variant: {
      default: "shadow-card",
      elevated: "shadow-card-hover",
      interactive:
        "shadow-card hover:shadow-card-hover hover:border-border-hover cursor-pointer",
      ghost: "shadow-none border-transparent hover:border-border",
      glow: "shadow-card hover:shadow-glow hover:border-brand-accent/20",
    },
    padding: {
      uniform: "p-5",
      list: "px-6 py-5",
      compact: "p-3",
      none: "p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "uniform",
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Card({
  as: Tag = "div",
  variant,
  padding,
  className,
  children,
}: CardProps) {
  return (
    <Tag className={cn(cardVariants({ variant, padding }), className)}>
      {children}
    </Tag>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: "up" | "down";
    label: string;
  };
  className?: string;
  icon?: React.ReactNode;
}

export function MetricCard({ label, value, trend, className, icon }: MetricCardProps) {
  return (
    <Card variant="default" className={cn("relative overflow-hidden", className)}>
      {icon && (
        <div className="absolute top-4 right-4 text-brand-accent/15">
          {icon}
        </div>
      )}
      <div className="relative z-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          {label}
        </p>
        <p className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary mt-1.5">
          {value}
        </p>
        {trend && (
          <div className="flex items-center gap-1.5 mt-2.5">
            <span
              className={`inline-flex items-center gap-1 text-[12px] font-semibold ${
                trend.direction === "up"
                  ? "text-status-success"
                  : "text-status-alert"
              }`}
            >
              <span className="text-[14px] leading-none">
                {trend.direction === "up" ? "↑" : "↓"}
              </span>
              {trend.label}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
