"use client"

import React from 'react'

import ProjectCard from '@/components/projects/components/ProjectCard'

const ProjectsGrid = React.memo(function ProjectsGrid({
    topProject,
    middleProjects,
    bottomProjects,
    activeIndex,
    onViewDetails,
    onPreview
}: ProjectsGridProps) {
    return (
        <div className='md:flex flex-col gap-8 hidden'>
            {/* Top Project - Featured */}
            {topProject && (
                <ProjectCard
                    project={topProject}
                    index={0}
                    isActive={activeIndex === 0}
                    onViewDetails={onViewDetails}
                    onPreview={onPreview}
                    aspectRatio="aspect-[16/9] md:aspect-[19/9]"
                    priority={true}
                />
            )}

            {/* Middle Projects - 3 columns */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {middleProjects.map((project, idx) => {
                    const actualIndex = idx + 1
                    return (
                        <ProjectCard
                            key={actualIndex}
                            project={project}
                            index={actualIndex}
                            isActive={activeIndex === actualIndex}
                            onViewDetails={onViewDetails}
                            onPreview={onPreview}
                            className="md:w-[calc(33.333%-15px)]"
                        />
                    )
                })}
            </div>

            {/* Bottom Projects - 2 columns */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {bottomProjects.map((project, idx) => {
                    const actualIndex = idx + 4
                    return (
                        <ProjectCard
                            key={actualIndex}
                            project={project}
                            index={actualIndex}
                            isActive={activeIndex === actualIndex}
                            onViewDetails={onViewDetails}
                            onPreview={onPreview}
                            className="md:w-[calc(50%-16px)]"
                        />
                    )
                })}
            </div>
        </div>
    )
})

export default ProjectsGrid