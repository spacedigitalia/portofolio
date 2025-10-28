"use client"

import React from 'react'

import Preview from '@/components/projects/modal/Priview'

import { useProjectsState } from '@/hooks/projects/useProjectsState'

import ProjectsHeader from '@/components/projects/components/ProjectsHeader'

import ProjectsGrid from '@/components/projects/components/ProjectsGrid'

import ProjectsMobile from '@/components/projects/components/ProjectsMobile'

const ProjectsContent = React.memo(function ProjectsContent({ projectsData }: { projectsData: ProjectsContentProps[] }) {
    const {
        activeIndex,
        setActiveIndex,
        selectedCategory,
        setSelectedCategory,
        previewProject,
        setPreviewProject,
        categories,
        displayedProjects,
        topProject,
        middleProjects,
        bottomProjects,
        handlePreview,
        handleViewDetails
    } = useProjectsState(projectsData, 'home');

    return (
        <section id="projects" className="py-16 bg-gradient-to-b from-background to-background/95">
            <div className="container px-4 md:px-6">
                <ProjectsHeader
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <ProjectsGrid
                    topProject={topProject}
                    middleProjects={middleProjects}
                    bottomProjects={bottomProjects}
                    activeIndex={activeIndex}
                    onViewDetails={handleViewDetails}
                    onPreview={handlePreview}
                />

                <ProjectsMobile
                    displayedProjects={displayedProjects}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    onViewDetails={handleViewDetails}
                    onPreview={handlePreview}
                />
            </div>

            <Preview previewProject={previewProject} setPreviewProject={setPreviewProject} />
        </section>
    )
})

export default ProjectsContent