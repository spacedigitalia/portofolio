"use client"

import React from 'react'

import Link from 'next/link'

import { motion, AnimatePresence } from "framer-motion"

import { Grid3x3 } from "lucide-react"

import { projectsAnimations } from '@/base/animations/animation'

const ProjectsHeader = React.memo(function ProjectsHeader({
    categories,
    selectedCategory,
    setSelectedCategory,
    showMoreCategories,
    setShowMoreCategories,
    hasMoreCategories,
    visibleCategories,
    hiddenCategories,
    isSelectedCategoryHidden,
    handleCategorySelect,
    headerDropdownRef,
    headerButtonRef
}: ProjectsHeaderProps) {

    return (
        <motion.div
            initial={projectsAnimations.header.initial}
            whileInView={projectsAnimations.header.animate}
            viewport={{ once: true }}
            transition={projectsAnimations.header.transition}
            className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-5'
        >
            <div className="relative flex flex-col gap-2 mb-5">
                <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary via-primary/80 to-primary animate-gradient uppercase tracking-tight'>
                    Featured Projects
                </h2>
                <Link
                    href="/projects"
                    className='text-sm bg-clip-text text-transparent bg-linear-to-r from-primary via-primary/80 to-primary animate-gradient uppercase tracking-tight'
                >
                    View More
                </Link>
            </div>

            <div className="relative mb-2 md:mb-5 w-full md:w-fit">
                <div className="overflow-x-auto flex items-center justify-start md:justify-center">
                    <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit md:max-w-full sm:min-w-0">
                        {visibleCategories.map((category) => (
                            <motion.button
                                key={category}
                                whileInView={projectsAnimations.category.whileInView}
                                viewport={{ once: true }}
                                transition={projectsAnimations.category.transition}
                                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category
                                    ? 'text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {selectedCategory === category && (
                                    <motion.div
                                        layoutId="activeProjectCategory"
                                        className="absolute inset-0 bg-primary rounded-lg"
                                        initial={false}
                                        transition={projectsAnimations.categoryActive.transition}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </motion.button>
                        ))}

                        {hasMoreCategories && (
                            <motion.button
                                ref={headerButtonRef}
                                whileInView={projectsAnimations.category.whileInView}
                                viewport={{ once: true }}
                                transition={projectsAnimations.category.transition}
                                className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center justify-center ${showMoreCategories || isSelectedCategoryHidden
                                    ? 'text-primary-foreground bg-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                onClick={() => setShowMoreCategories(!showMoreCategories)}
                            >
                                <Grid3x3 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </motion.button>
                        )}
                    </div>
                </div>

                {hasMoreCategories && (
                    <AnimatePresence>
                        {showMoreCategories && (
                            <motion.div
                                ref={headerDropdownRef}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full right-0 mt-2 p-2 bg-popover dark:bg-popover border border-border rounded-lg shadow-lg z-50 min-w-fit max-h-[300px] overflow-y-auto"
                            >
                                {hiddenCategories.map((category) => (
                                    <button
                                        key={category}
                                        className={`w-fit flex flex-col items-start justify-start mb-2 text-left px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize cursor-pointer ${selectedCategory === category
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    )
})

export default ProjectsHeader
