"use client";

import { useRef } from "react";

import { motion, useInView } from "framer-motion";

import { GitHubCalendar } from "react-github-calendar";

import Link from "next/link";

import {
  useStateGithubCalender,
  calendarTheme,
  YEAR_OPTIONS,
  INITIAL_REPOS,
  MAX_DOTS,
} from "@/services/useStateGithubCalender";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function GithubCalender() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const {
    selectedYear,
    setSelectedYear,
    activity,
    activityLoading,
    showAllRepos,
    setShowAllRepos,
    colorScheme,
    totalCountLabel,
    githubUsername,
  } = useStateGithubCalender();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-6"
      aria-labelledby="contributions-heading"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Calendar card */}
              <div className="flex flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground md:text-base">
                  {selectedYear === "last"
                    ? "Last 365 days"
                    : `Year ${selectedYear}`}
                </p>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="year-select"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Year
                  </label>
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSelectedYear(v === "last" ? "last" : Number(v));
                    }}
                    className="rounded-xl border border-border bg-card/80 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Select year"
                  >
                    {YEAR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.div
                className="overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 shadow-lg shadow-black/5 backdrop-blur-sm dark:shadow-none md:p-7 [&_.react-activity-calendar]:w-full! [&_.react-activity-calendar]>svg:!w-full [&_.react-activity-calendar]>svg:!max-w-full"
                initial={{ opacity: 0, y: 16 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GitHubCalendar
                  username={githubUsername}
                  year={selectedYear}
                  theme={calendarTheme}
                  colorScheme={colorScheme as "light" | "dark"}
                  className="scheme-light dark:scheme-dark"
                  blockSize={12}
                  blockRadius={4}
                  blockMargin={4}
                  fontSize={13}
                  showWeekdayLabels
                  labels={{
                    totalCount: totalCountLabel,
                    legend: {
                      less: "Less",
                      more: "More",
                    },
                  }}
                />

                {/* Profile link */}
                <p className="mt-6 text-center">
                  <Link
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                  >
                    View profile on GitHub
                    <span aria-hidden>→</span>
                  </Link>
                </p>
              </motion.div>

              {/* Activity by repository */}
              {activityLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex min-h-[200px] flex-col gap-3 rounded-2xl border border-border/80 bg-card/70 p-6 backdrop-blur-sm"
                >
                  <div className="h-5 w-48 animate-pulse rounded-lg bg-muted" />
                  <div className="flex flex-1 flex-col gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 animate-pulse rounded-lg bg-muted/80"
                        style={{ animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/20"
                  aria-hidden
                >
                  GitHub
                </span>
                <h2
                  id="contributions-heading"
                  className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  Contribution activity
                </h2>
              </div>

              {activity && !activityLoading && activity.repos.length > 0 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="mt-6 min-h-[280px] max-h-[460px] overflow-y-auto rounded-2xl border border-border/80 bg-card/70 p-5 shadow-lg shadow-black/5 backdrop-blur-sm dark:shadow-none md:p-6"
                  data-lenis-prevent
                >
                  <p className="mb-5 text-base font-medium text-foreground">
                    <span className="text-muted-foreground">Created</span>{" "}
                    <span className="font-semibold text-primary">
                      {activity.totalCommitContributions}
                    </span>{" "}
                    commits in{" "}
                    <span className="font-semibold text-primary">
                      {activity.repos.length}
                    </span>{" "}
                    repositories
                  </p>
                  <ul className="space-y-2">
                    {(showAllRepos
                      ? activity.repos
                      : activity.repos.slice(0, INITIAL_REPOS)
                    ).map((repo) => {
                      const dotCount = Math.min(repo.totalCount, MAX_DOTS);
                      return (
                        <motion.li
                          key={repo.nameWithOwner}
                          variants={itemVariants}
                          transition={{ duration: 0.25 }}
                          className="group flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-transparent bg-muted/30 px-3 py-2.5 text-sm transition-colors hover:border-border hover:bg-muted/50 dark:bg-muted/20 dark:hover:bg-muted/40"
                        >
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-0 flex-1 font-medium text-foreground underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                          >
                            {repo.nameWithOwner}
                          </a>
                          <span className="shrink-0 text-muted-foreground">
                            {repo.totalCount} commit
                            {repo.totalCount !== 1 ? "s" : ""}
                          </span>
                          <span
                            className="ml-auto flex shrink-0 items-center gap-0.5"
                            aria-hidden
                          >
                            {Array.from({ length: dotCount }).map((_, i) => (
                              <span
                                key={i}
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 transition-colors group-hover:bg-primary/80"
                              />
                            ))}
                          </span>
                        </motion.li>
                      );
                    })}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {activity.repos.length > INITIAL_REPOS && !showAllRepos && (
                      <button
                        type="button"
                        onClick={() => setShowAllRepos(true)}
                        className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background"
                      >
                        Show more activity
                      </button>
                    )}
                    {(showAllRepos ||
                      activity.repos.length <= INITIAL_REPOS) && (
                      <a
                        href={`https://github.com/${githubUsername}?tab=overview`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background"
                      >
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
