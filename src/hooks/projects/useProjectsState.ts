"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

import { useLenis } from "@/lib/useLenis";

type ProjectsStateMode = "home" | "list";

export function useProjectsState(
  projectsData: ProjectsContentProps[] = [],
  mode: ProjectsStateMode = "list"
) {
  // Common: categories, filtering, displayed list
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const categories = React.useMemo(() => {
    const unique = Array.from(
      new Set((projectsData || []).map((p) => (p.category || "").toLowerCase()))
    ).filter(Boolean);
    return ["all", ...unique];
  }, [projectsData]);

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "all") return projectsData;
    return (projectsData || []).filter(
      (p) => (p.category || "").toLowerCase() === selectedCategory
    );
  }, [projectsData, selectedCategory]);

  // List mode: infinite scroll + hover UI state
  const [layoutMode, setLayoutMode] = React.useState<"grid" | "column">("grid");
  const [visibleCount, setVisibleCount] = React.useState<number>(6);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
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
            const max = (filteredProjects || []).length;
            return next > max ? max : next;
          });
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [layoutMode, filteredProjects]);

  const displayedProjects = React.useMemo(() => {
    return (filteredProjects || []).slice(
      0,
      Math.min(visibleCount, (filteredProjects || []).length)
    );
  }, [filteredProjects, visibleCount]);

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

  // Home mode: preview modal + split sections + lenis lock
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [previewProject, setPreviewProject] =
    React.useState<ProjectsContentProps | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (previewProject) {
      if (lenis) {
        lenis.stop();
      }

      return () => {
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, [previewProject, lenis]);

  const homeDisplayed = React.useMemo(
    () => (filteredProjects || []).slice(0, 6),
    [filteredProjects]
  );
  const topProject = homeDisplayed[0];
  const middleProjects = homeDisplayed.slice(1, 4);
  const bottomProjects = homeDisplayed.slice(4);

  const handlePreview = useCallback((project: ProjectsContentProps) => {
    setPreviewProject(project);
  }, []);

  // Navigation with loading overlay (used by home/projects sections)
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const handleViewDetails = useCallback(
    (slug: string, title?: string) => {
      if (!slug) return;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("routeLoadingPreTriggered", "1");
      }
      showLoading(title || "Projects", "projects");
      setTimeout(() => router.push(`/projects/${slug}`), 0);
    },
    [router, showLoading]
  );

  // Return superset to satisfy both modes' consumers
  return {
    // Common state
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredProjects,
    displayedProjects,

    // List mode specific
    layoutMode,
    setLayoutMode,
    visibleCount,
    setVisibleCount,
    sentinelRef,
    hoveredIndex,
    mousePosition,
    buttonSize,
    buttonRef,
    handleMouseMove,
    handleMouseLeave,

    // Home mode specific
    activeIndex,
    setActiveIndex,
    previewProject,
    setPreviewProject,
    topProject,
    middleProjects,
    bottomProjects,
    handlePreview,
    handleViewDetails,
  };
}
