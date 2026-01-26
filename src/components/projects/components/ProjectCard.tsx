"use client"

import React from 'react'

import Image from 'next/image'

import { motion } from "framer-motion"

import { Card, CardTitle, CardDescription } from "@/components/ui/card"

import { projectsAnimations } from '@/base/animations/animation'

import ProjectActions from '@/components/projects/components/ProjectActions'

const ProjectCard = React.memo(function ProjectCard({
    project,
    index,
    isActive,
    onViewDetails,
    onPreview,
    onToggleActive,
    showLiveDemo = false,
    className = "",
    aspectRatio = "aspect-[16/9]",
    priority = false
}: ProjectCardProps) {
    const handleClick = () => {
        if (onToggleActive) {
            onToggleActive(isActive ? -1 : index)
        }
    }

    return (
        <motion.div
            initial={projectsAnimations.project.initial}
            whileInView={projectsAnimations.project.animate}
            viewport={{ once: true }}
            transition={projectsAnimations.project.transition(index)}
            className={`group w-full ${className}`}
            onClick={handleClick}
        >
            <Card className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 ${isActive ? 'bg-card/50' : 'hover:bg-card/50'
                } backdrop-blur-sm`}>
                <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, 1400px"
                        priority={priority}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/50 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Desktop overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 hidden md:block">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                                {`0${index + 1}`}
                            </span>
                            <CardTitle className="text-xl font-semibold tracking-tight line-clamp-1">
                                {project.title}
                            </CardTitle>
                        </div>

                        <CardDescription className="text-sm line-clamp-2 mb-4">
                            {project.description}
                        </CardDescription>

                        <ProjectActions
                            project={project}
                            onViewDetails={onViewDetails}
                            onPreview={onPreview}
                            showLiveDemo={showLiveDemo}
                        />
                    </div>
                </div>

                {/* Mobile content outside image */}
                <div className="px-4 pb-4 md:hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                            {`0${index + 1}`}
                        </span>
                        <CardTitle className="text-xl font-semibold tracking-tight line-clamp-1">
                            {project.title}
                        </CardTitle>
                    </div>

                    <CardDescription className="text-sm line-clamp-2 mb-4">
                        {project.description}
                    </CardDescription>

                    <ProjectActions
                        project={project}
                        onViewDetails={onViewDetails}
                        onPreview={onPreview}
                        showLiveDemo={showLiveDemo}
                    />
                </div>
            </Card>
        </motion.div>
    )
})

export default ProjectCard
