import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-semibold rounded-[8px]",
  {
    variants: {
      variant: {
        success: "bg-status-success-light text-status-success",
        alert: "bg-status-alert-light text-status-alert",
        accent: "bg-brand-accent-subtle text-brand-accent-dark",
        neutral: "bg-text-primary/5 text-text-muted",
        pop: "bg-brand-pop-subtle text-brand-pop-dark",
        gold: "bg-brand-pop-subtle text-brand-pop-dark",
      },
      size: {
        sm: "text-[11px] px-2.5 py-1",
        md: "text-[12px] px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({
  variant,
  size,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
}

export function StatusDot({
  variant = "success",
}: {
  variant?: "success" | "alert" | "accent" | "pop" | "gold";
}) {
  return (
    <span
      className={`inline-block size-2 rounded-full ${
        variant === "success"
          ? "bg-status-success"
          : variant === "alert"
          ? "bg-status-alert"
          : variant === "pop" || variant === "gold"
          ? "bg-brand-pop"
          : "bg-brand-accent-dark"
      }`}
    />
  );
}
