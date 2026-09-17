"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function QuestionRouteRefresher() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    refresh();

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [router]);

  return null;
}
