"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type RepoActivity = {
  nameWithOwner: string;
  url: string;
  totalCount: number;
};

export const calendarTheme = {
  light: [
    "oklch(0.967 0.003 264.542)", // empty - muted
    "oklch(0.75 0.06 264)",
    "oklch(0.55 0.12 264)",
    "oklch(0.4 0.1 264)",
    "oklch(0.21 0.034 264.665)", // primary
  ],
  dark: [
    "oklch(0.278 0.033 256.848)", // empty - secondary
    "oklch(0.45 0.08 264)",
    "oklch(0.55 0.15 264)",
    "oklch(0.65 0.2 264)",
    "oklch(0.488 0.243 264.376)", // sidebar-primary
  ],
};

export const CURRENT_YEAR = new Date().getFullYear();
export const MAX_DOTS = 52; // max green dots per repo row
export const INITIAL_REPOS = 10; // show first N repos, then "Show more"
export const YEAR_OPTIONS: { value: "last" | number; label: string }[] = [
  { value: "last", label: "Last year" },
  ...Array.from({ length: 2 }, (_, i) => ({
    value: (CURRENT_YEAR - i) as number,
    label: String(CURRENT_YEAR - i),
  })),
];

const GITHUB_USERNAME = "rzkir";

function getDateRange(year: "last" | number): { from: string; to: string } {
  const to = new Date();
  if (year === "last") {
    const from = new Date(to);
    from.setDate(from.getDate() - 365);
    return {
      from: from.toISOString().slice(0, 10),
      to: to.toISOString().slice(0, 10),
    };
  }
  return {
    from: `${year}-01-01`,
    to: `${year}-12-31`,
  };
}

export type ActivityData = {
  totalCommitContributions: number;
  repos: RepoActivity[];
} | null;

export function useStateGithubCalender() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedYear, setSelectedYear] = useState<"last" | number>("last");
  const [activity, setActivity] = useState<ActivityData>(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [showAllRepos, setShowAllRepos] = useState(false);

  // Hindari hydration mismatch: colorScheme hanya dipakai setelah mount,
  // sehingga server dan first client render sama (light).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch contribution-by-repo when year changes (client-only).
  useEffect(() => {
    if (!mounted) return;
    const { from, to } = getDateRange(selectedYear);
    setActivityLoading(true);
    setActivityError(null);
    fetch(
      `/api/github-contributions?username=${GITHUB_USERNAME}&from=${from}&to=${to}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setActivityError(data.error);
          setActivity(null);
        } else {
          setActivity({
            totalCommitContributions: data.totalCommitContributions ?? 0,
            repos: data.repos ?? [],
          });
        }
      })
      .catch(() => {
        setActivityError("Failed to load activity");
        setActivity(null);
      })
      .finally(() => setActivityLoading(false));
  }, [mounted, selectedYear]);

  // Reset "show all" when year changes
  useEffect(() => {
    setShowAllRepos(false);
  }, [selectedYear]);

  const colorScheme: "light" | "dark" = !mounted
    ? "light"
    : resolvedTheme === "dark"
      ? "dark"
      : "light";

  const totalCountLabel =
    selectedYear === "last"
      ? "{{count}} contributions in the last year"
      : "{{count}} contributions in {{year}}";

  return {
    mounted,
    selectedYear,
    setSelectedYear,
    activity,
    activityLoading,
    activityError,
    showAllRepos,
    setShowAllRepos,
    colorScheme,
    totalCountLabel,
    githubUsername: GITHUB_USERNAME,
  };
}
