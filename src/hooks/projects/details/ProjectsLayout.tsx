"use client"

import React, { useCallback, useEffect, useState } from 'react'

import Image from 'next/image';

import Link from 'next/link';

import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { useRouter } from 'next/navigation'

import { useLoading } from '@/context/LoadingContext'

import ImagePreview from '@/hooks/projects/details/ImagePreview'

import { useLenis } from '@/lib/useLenis'

export default function ProjectsLayout({ productsData }: ProjectsLayoutProps) {
    const router = useRouter()

    const lenis = useLenis();

    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const { showLoading } = useLoading()

    const handleProjectNavigation = useCallback(async (slug: string, title?: string) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('routeLoadingPreTriggered', '1')
        }
        showLoading(title ? title : 'Loading project...', 'projects')
        setTimeout(() => router.push(`/projects/${slug}`), 0)
    }, [router, showLoading])

    const handleImageClick = (image: string, index: number) => {
        setSelectedImage(image)
    }

    useEffect(() => {
        if (selectedImage) {
            if (lenis) {
                lenis.stop();
            }

            return () => {
                if (lenis) {
                    lenis.start();
                }
            };
        }
    }, [selectedImage, lenis]);


    return (
        <section className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="group mb-8 sm:mb-12">
                    <Card className="relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 hover:bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl sm:rounded-3xl">
                        <div className="relative aspect-[16/9] md:aspect-[19/9] w-full overflow-hidden">
                            <Image
                                src={productsData.thumbnail}
                                alt={productsData.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <div className="max-w-4xl">
                                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 text-card-foreground drop-shadow-lg">
                                        {productsData.title}
                                    </CardTitle>
                                    <CardDescription className="text-base sm:text-lg md:text-xl lg:text-2xl line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 md:mb-8 max-w-3xl text-card-foreground/90 drop-shadow-md">
                                        {productsData.description}
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        {productsData.previewLink && (
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="gap-2 sm:gap-3 bg-primary/20 hover:bg-primary/30  border-0 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl"
                                                asChild
                                            >
                                                <Link href={productsData.previewLink} rel="noopener noreferrer">
                                                    View Project
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {productsData.frameworks.map((framework, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-2 px-4 py-2 h-auto cursor-pointer 
                                    bg-secondary/80 hover:bg-secondary
                                    text-secondary-foreground
                                    shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                                    active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                                    transition-all duration-200 ease-out
                                    border border-border/50
                                    rounded-lg hover:border-primary/50"
                            >
                                <div className="relative w-6 h-6">
                                    <Image
                                        src={framework.imageUrl}
                                        alt={framework.title}
                                        fill
                                        className="object-contain drop-shadow-sm"
                                        sizes="(max-width: 768px) 24px, 24px"
                                    />
                                </div>
                                <span className="text-sm font-medium drop-shadow-sm">
                                    {framework.title}
                                </span>
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8 sm:space-y-12">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="flex overflow-x-auto gap-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
                            {productsData.imageUrl.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative aspect-video w-[280px] sm:w-[400px] lg:w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/50 flex-shrink-0 cursor-pointer"
                                    onClick={() => handleImageClick(image, index)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${productsData.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Hover indicator untuk menunjukkan gambar bisa diklik */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: productsData.content }} className="prose prose-invert max-w-none text-sm md:text-base
                                            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 md:[&_p]:mb-4 [&_p:last-child]:mb-0 
                                            [&_span]:text-muted-foreground [&_span]:leading-relaxed
                                            [&_strong]:text-foreground [&_strong]:font-semibold
                                            [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-4 md:[&_h3]:mt-6 [&_h3]:mb-3 md:[&_h3]:mb-4
                                            [&_ol]:list-decimal [&_ol]:pl-4 md:[&_ol]:pl-6 [&_ol]:space-y-1.5 md:[&_ol]:space-y-2 [&_ol]:mb-3 md:[&_ol]:mb-4
                                            [&_li]:text-muted-foreground [&_li]:leading-relaxed
                                            [&_.ql-ui]:hidden
                                            prose-headings:text-foreground
                                            prose-strong:text-foreground
                                            prose-p:text-muted-foreground
                                            prose-li:text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Related Projects - Redesigned */}
                <div className="space-y-8 sm:space-y-12 mt-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient">
                            Related Projects
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Explore more projects that showcase similar technologies and concepts
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productsData.relatedProjects.map((project, index) => (
                            <div
                                key={index}
                                className="group relative"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div
                                    className="block h-full cursor-pointer"
                                    onClick={() => handleProjectNavigation(project.slug, project.title)}
                                >
                                    <Card className="relative overflow-hidden border-border/50 transition-all duration-500 hover:border-primary/50 p-0 hover:bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-card/95 to-card/90">
                                        {/* Image Container */}
                                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                                            <Image
                                                src={project.thumbnail}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Category Badge */}
                                            <div className="absolute bottom-4 left-4 bg-primary/20 backdrop-blur-md text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                {project.category}
                                            </div>

                                            {/* View Project Indicator */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="px-4 pb-4 bg-card/95 backdrop-blur-sm">
                                            <div className="space-y-3">
                                                <CardTitle className="text-base sm:text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                                                    {project.title}
                                                </CardTitle>

                                                <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                                    {project.description}
                                                </CardDescription>
                                            </div>
                                        </div>

                                        {/* Subtle Border Effect */}
                                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-primary/0 group-hover:border-primary/20 transition-colors duration-500 pointer-events-none" />
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            <ImagePreview
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                images={productsData.imageUrl}
            />
        </section>
    );
}
