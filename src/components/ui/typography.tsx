import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold text-text-primary tracking-tight", {
  variants: {
    as: {
      h1: "text-[42px] leading-[1.05] tracking-[-0.02em]",
      h2: "text-[32px] leading-[1.1] tracking-[-0.015em]",
      h3: "text-[22px] leading-[1.2]",
      h4: "text-[18px] leading-[1.25]",
      h5: "text-[15px] leading-[1.3]",
      h6: "text-[13px] leading-[1.3]",
    },
  },
  defaultVariants: {
    as: "h3",
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ as = "h3", className, children }: HeadingProps) {
  const Tag = as ?? "h3";
  return <Tag className={cn(headingVariants({ as }), className)}>{children}</Tag>;
}

const bodyVariants = cva("", {
  variants: {
    size: {
      base: "text-[14px] leading-[1.6] font-semibold text-text-primary",
      sm: "text-[14px] leading-[1.6] font-medium text-text-primary",
      meta: "text-[13px] leading-[1.5] font-medium",
    },
    muted: {
      true: "!text-text-muted",
      false: "",
    },
  },
  defaultVariants: {
    size: "base",
    muted: false,
  },
});

interface BodyProps extends VariantProps<typeof bodyVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Body({ size, muted, className, children }: BodyProps) {
  return <p className={cn(bodyVariants({ size, muted }), className)}>{children}</p>;
}

export function Meta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className="text-[13px] leading-[1.5] font-medium text-text-muted">{children}</p>
  );
}

export function HeroMetric({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className="text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary">
      {children}
    </p>
  );
}

export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
      {children}
    </span>
  );
}

export function Display({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className="text-[56px] font-bold leading-[0.95] tracking-[-0.03em] text-text-primary">
      {children}
    </h1>
  );
}
