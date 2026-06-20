import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-text-primary text-white hover:bg-text-primary/90 active:scale-[0.98]",
        accent: "bg-brand-accent text-white hover:bg-brand-accent-dark active:scale-[0.98]",
        ghost: "bg-transparent text-text-secondary hover:bg-text-primary/5 hover:text-text-primary",
        outline: "border border-border text-text-secondary hover:border-border-hover hover:text-text-primary",
        success: "bg-status-success text-white hover:bg-status-success/90 active:scale-[0.98]",
        alert: "bg-status-alert text-white hover:bg-status-alert/90 active:scale-[0.98]",
        subtle: "bg-brand-accent-subtle text-brand-accent-dark hover:bg-brand-accent/20 active:scale-[0.98]",
      },
      size: {
        sm: "text-[13px] px-4 py-2 gap-1.5",
        md: "text-[14px] px-6 py-2.5",
        lg: "text-[14px] px-8 py-3",
        icon: "size-9",
      },
      shape: {
        pill: "rounded-pill",
        default: "rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

export function Button({
  variant,
  size,
  shape,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, shape }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
