"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function QuestionRouteRefresher() {
  const router = useRouter();
  const lastRefreshRef = useRef(0);

  useEffect(() => {
    const handleRefresh = () => {
      const now = Date.now();
      // Throttling to avoid double trigger from simultaneous focus + visibilitychange
      if (now - lastRefreshRef.current > 1500) {
        lastRefreshRef.current = now;
        router.refresh();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handleRefresh();
      }
    };

    window.addEventListener("focus", handleRefresh);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleRefresh);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  return null;
}
