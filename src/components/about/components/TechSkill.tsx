"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "fe", label: "Frontend" },
  { key: "be", label: "Backend" },
  { key: "tools", label: "Tools" },
];

// Filter berdasarkan nama skill (tanpa perlu field category dari API)
const FE_KEYWORDS = [
  "react",
  "next",
  "vue",
  "angular",
  "svelte",
  "html",
  "css",
  "tailwind",
  "javascript",
  "typescript",
  "redux",
  "vite",
  "nuxt",
  "jquery",
  "bootstrap",
  "scss",
  "sass",
  "webpack",
  "vite",
];
const BE_KEYWORDS = [
  "node",
  "express",
  "python",
  "django",
  "fastapi",
  "php",
  "laravel",
  "go",
  "java",
  "spring",
  "nest",
  "postgres",
  "mysql",
  "mongodb",
  "prisma",
  "graphql",
  "redis",
  "supabase",
  "firebase",
  "strapi",
  "hono",
];
const TOOLS_KEYWORDS = [
  "git",
  "docker",
  "figma",
  "vscode",
  "linux",
  "aws",
  "vercel",
  "netlify",
  "postman",
  "npm",
  "yarn",
  "pnpm",
  "github",
  "gitlab",
  "jira",
  "figma",
];

function getCategory(item: SkillsContentProps): SkillCategory | "other" {
  if (item.category) return item.category;
  const t = item.title.toLowerCase();
  if (FE_KEYWORDS.some((k) => t.includes(k))) return "fe";
  if (BE_KEYWORDS.some((k) => t.includes(k))) return "be";
  if (TOOLS_KEYWORDS.some((k) => t.includes(k))) return "tools";
  return "other";
}

function SkillBadge({
  item,
  index,
  baseDelay,
}: {
  item: SkillsContentProps;
  index: number;
  baseDelay: number;
}) {
  const delay = baseDelay + index * 0.03;
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.95 }}
      style={{ perspective: 1000 }}
    >
      <Badge
        variant="secondary"
        className="flex items-center gap-2 px-4 py-2 h-auto cursor-pointer 
                        bg-linear-to-br from-secondary to-secondary/80
                        shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                        active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                        transition-all duration-200 ease-out
                        border border-black/10
                        hover:bg-secondary/90"
      >
        <motion.div
          className="relative w-6 h-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.2, delay: delay + 0.1, ease: "backOut" }}
        >
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain drop-shadow-sm"
          />
        </motion.div>
        <motion.span
          className="text-sm font-medium drop-shadow-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: delay + 0.15 }}
        >
          {item.title}
        </motion.span>
      </Badge>
    </motion.div>
  );
}

type SelectedSkillCategory = SkillCategory | "other";

export default function TechSkill({ skillsData }: TechSkillProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedSkillCategory>("fe");

  const grouped = React.useMemo(() => {
    const fe: SkillsContentProps[] = [];
    const be: SkillsContentProps[] = [];
    const tools: SkillsContentProps[] = [];
    const other: SkillsContentProps[] = [];
    skillsData.forEach((item) => {
      const cat = getCategory(item);
      if (cat === "fe") fe.push(item);
      else if (cat === "be") be.push(item);
      else if (cat === "tools") tools.push(item);
      else other.push(item);
    });
    return { fe, be, tools, other };
  }, [skillsData]);

  const filterTabs = [
    ...CATEGORIES.filter((c) => grouped[c.key].length > 0),
    ...(grouped.other.length > 0
      ? [{ key: "other" as const, label: "Lainnya" }]
      : []),
  ];

  const itemsToShow =
    selectedCategory === "other" ? grouped.other : grouped[selectedCategory];

  const baseDelay = 0.1;

  return (
    <motion.div
      className="space-y-6"
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 0 }}
    >
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <h3 className="text-xl font-semibold text-foreground">
          Technical Skills
        </h3>
        <p className="text-muted-foreground text-sm">
          Technologies and tools I work with to bring ideas to life
        </p>
      </motion.div>

      {/* Filter tabs - style seperti ProjectsHeader */}
      <motion.div
        className="relative w-full"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <div className="flex items-center justify-start overflow-x-auto">
          <div className="flex items-center justify-start gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit">
            {filterTabs.map(({ key, label }) => (
              <motion.button
                key={key}
                type="button"
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  selectedCategory === key
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                {selectedCategory === key && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-primary rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Daftar skill untuk kategori yang dipilih */}
      <motion.div
        className="relative"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-3">
          {itemsToShow.map((item, index) => (
            <SkillBadge
              key={item._id ?? item.title}
              item={item}
              index={index}
              baseDelay={baseDelay}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
