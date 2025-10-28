"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";

import { useTheme } from "next-themes";

import { useRouter } from "next/navigation";

import { useScrollTo, useLenis } from "@/lib/useLenis";

import { useLoading } from "@/context/LoadingContext";

import { useThemeSwitchOverlay } from "@/context/SwitchThemaOverlay";

import { navLink } from "@/components/layout/header/data/Header";

type UseStateHeaderResult = {
  // Theme related
  theme: string | undefined;
  setTheme: (newTheme: string) => void;
  mounted: boolean;

  // Loading state
  isInitialLoading: boolean;

  // Menu state
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;

  // Logo hover state
  hoveredIndex: number | null;
  setHoveredIndex: Dispatch<SetStateAction<number | null>>;

  // Theme overlay state
  isThemeOverlayVisible: boolean;
  hideThemeSwitchOverlay: () => void;

  // Functions
  handleSmoothScroll: (path: string) => void;
};

export const useStateHeader = (): UseStateHeaderResult => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { isOverlayVisible, showThemeSwitchOverlay, hideThemeSwitchOverlay } =
    useThemeSwitchOverlay();
  const lenis = useLenis();
  const scrollTo = useScrollTo();
  const { isInitialLoading } = useLoading();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      if (lenis) {
        lenis.stop();
      }

      return () => {
        if (lenis) {
          lenis.start();
        }
      };
    }
  }, [isMenuOpen, lenis]);

  const handleThemeChange = (newTheme: string) => {
    showThemeSwitchOverlay();
    setTheme(newTheme);
  };

  const handleSmoothScroll = (path: string) => {
    setIsMenuOpen(false);

    const getLabelForPath = (p: string) => {
      if (!p) return "Loading...";
      // direct match (for "/", "/projects", etc.)
      const direct = navLink.find((l) => l.path === p);
      if (direct) return direct.label;
      if (p === "/") return "Home";
      if (p.startsWith("/projects")) return "Projects";
      if (p.startsWith("/articles")) return "Articles";
      if (p.startsWith("/contacts")) return "Contacts";
      if (p.startsWith("#")) {
        const hash = navLink.find(
          (l) => l.path === p || l.path === p.replace(/^\/+/, "#")
        );
        if (hash) return hash.label;
      }
      const seg = p.split("/").filter(Boolean)[0];
      return seg ? seg[0].toUpperCase() + seg.slice(1) : "Loading...";
    };

    if (path === "/") {
      if (window.location.pathname === "/") {
        scrollTo("html", { duration: 1.5 });
      } else {
        setTimeout(() => router.push("/"), 400);
      }
    } else if (path.startsWith("#")) {
      if (window.location.pathname === "/") {
        scrollTo(path, {
          offset: -80,
        });
      } else {
        setTimeout(() => router.push(`/${path}`), 400);
      }
    } else {
      setTimeout(() => router.push(path), 400);
    }
  };

  return {
    // Theme related
    theme,
    setTheme: handleThemeChange,
    mounted,

    // Loading state
    isInitialLoading,

    // Menu state
    isMenuOpen,
    setIsMenuOpen,

    // Logo hover state
    hoveredIndex,
    setHoveredIndex,

    // Theme overlay state
    isThemeOverlayVisible: isOverlayVisible,
    hideThemeSwitchOverlay,

    // Functions
    handleSmoothScroll,
  };
};
