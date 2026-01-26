"use client"

import React from 'react'

import Link from 'next/link'

import { ExternalLink, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"

const ProjectActions = React.memo(function ProjectActions({
    project,
    onViewDetails,
    onPreview,
    showLiveDemo = false
}: ProjectActionsProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => onViewDetails(project.slug, project.title)}
            >
                <ExternalLink className="w-4 h-4" />
                Lihat Details
            </Button>

            <Button
                variant="secondary"
                size="sm"
                className="gap-2 bg-primary/10 hover:bg-primary/20 text-primary border-0 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => onPreview(project)}
            >
                <Eye className="w-4 h-4" />
                Preview
            </Button>
        </div>
    )
})

export default ProjectActions
