"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { useLoading } from "@/context/LoadingContext";

export function useStateArticles(articlesData: Article[] = []) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [mousePosition, setMousePosition] = React.useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [buttonSize, setButtonSize] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const buttonRef = React.useRef<HTMLDivElement | null>(null);
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "column">("grid");
  const [visibleCount, setVisibleCount] = React.useState<number>(6);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const categories = React.useMemo(() => {
    const unique = Array.from(
      new Set((articlesData || []).map((a) => (a.category || "").toLowerCase()))
    ).filter(Boolean);
    return ["all", ...unique];
  }, [articlesData]);
  const filteredArticles = React.useMemo(() => {
    if (selectedCategory === "all") return articlesData;
    return (articlesData || []).filter(
      (a) => (a.category || "").toLowerCase() === selectedCategory
    );
  }, [articlesData, selectedCategory]);

  const displayedArticles = React.useMemo(() => {
    return (filteredArticles || []).slice(
      0,
      Math.min(visibleCount, (filteredArticles || []).length)
    );
  }, [filteredArticles, visibleCount]);

  React.useLayoutEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonSize({ width: rect.width, height: rect.height });
    }
  }, []);

  React.useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  React.useEffect(() => {
    if (layoutMode !== "grid") return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            const next = prev + 6;
            const max = (filteredArticles || []).length;
            return next > max ? max : next;
          });
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [layoutMode, filteredArticles]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    if (layoutMode !== "grid") return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredIndex(idx);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    if (layoutMode !== "grid") return;
    setHoveredIndex(null);
  };

  // Navigation with overlay for article details
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const handleViewDetails = React.useCallback(
    (slug: string, title?: string) => {
      if (!slug) return;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("routeLoadingPreTriggered", "1");
      }
      showLoading(title || "Articles", "articles");
      setTimeout(() => router.push(`/articles/${slug}`), 0);
    },
    [router, showLoading]
  );

  return {
    // State
    hoveredIndex,
    setHoveredIndex,
    mousePosition,
    setMousePosition,
    buttonSize,
    setButtonSize,
    buttonRef,
    layoutMode,
    setLayoutMode,
    visibleCount,
    setVisibleCount,
    sentinelRef,
    selectedCategory,
    setSelectedCategory,

    // Computed values
    categories,
    filteredArticles,
    displayedArticles,

    // Handlers
    handleMouseMove,
    handleMouseLeave,
    handleViewDetails,
  };
}
