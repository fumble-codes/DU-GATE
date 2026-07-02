"use client";
import { useEffect, useState, RefObject } from "react";

/**
 * Hook that returns true when the referenced element enters the viewport.
 * It uses IntersectionObserver and stops observing after the first intersection.
 */
export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
