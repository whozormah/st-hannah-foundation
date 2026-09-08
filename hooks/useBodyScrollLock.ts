import { useEffect } from "react";

/**
 * Freezes the page behind an open overlay. Without it a phone keeps scrolling
 * the page underneath once the dialog's own content reaches its end.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
