import { Fragment } from "react";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminBreadcrumbsProps {
  items: Breadcrumb[];
}

export function AdminBreadcrumbs({ items }: AdminBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-[12px] font-medium text-text-muted">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={index}>
            {index > 0 && (
              <span className="text-text-muted/40 select-none">/</span>
            )}
            {isLast || !item.href ? (
              <span className={isLast ? "text-text-primary font-semibold" : ""}>
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
