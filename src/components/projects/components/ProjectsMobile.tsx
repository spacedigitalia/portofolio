"use client"

import React from 'react'

import ProjectCard from '@/components/projects/components/ProjectCard'

const ProjectsMobile = React.memo(function ProjectsMobile({
    displayedProjects,
    activeIndex,
    setActiveIndex,
    onViewDetails,
    onPreview
}: ProjectsMobileProps) {
    const handleToggleActive = (index: number) => {
        setActiveIndex(index)
    }

    return (
        <div className='md:hidden'>
            <div className='flex flex-wrap gap-4 pb-4'>
                {displayedProjects.map((project, idx) => {
                    const isActive = activeIndex === idx
                    return (
                        <ProjectCard
                            key={idx}
                            project={project}
                            index={idx}
                            isActive={isActive}
                            onViewDetails={onViewDetails}
                            onPreview={onPreview}
                            onToggleActive={handleToggleActive}
                            showLiveDemo={true}
                            className="w-[calc(50%-10px)]"
                        />
                    )
                })}
            </div>
        </div>
    )
})

export default ProjectsMobile
