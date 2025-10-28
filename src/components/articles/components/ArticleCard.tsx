"use client"

import React from 'react'

import Image from 'next/image'

import { ArrowUpRight } from "lucide-react"

import { motion } from 'framer-motion'

import { articlesAnimations } from '@/base/animations/animation'

import { formatRelativeTime } from '@/lib/formatTime'

import { useRouter } from 'next/navigation'

import { useLoading } from '@/context/LoadingContext'

export default function ArticleCard({ article, index }: ArticleCardProps) {
    const router = useRouter()
    const { showLoading, hideLoading } = useLoading()

    const handleOpen = React.useCallback(() => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('routeLoadingPreTriggered', '1')
        }
        showLoading(article.title || 'Articles', 'articles')
        setTimeout(() => router.push(`/articles/${article.slug}`), 0)
    }, [router, showLoading, article.slug, article.title])
    return (
        <motion.div
            className='group cursor-pointer'
            initial={articlesAnimations.article.initial}
            whileInView={articlesAnimations.article.animate}
            viewport={{ once: true }}
            transition={articlesAnimations.article.transition(index)}
            whileHover={articlesAnimations.article.whileHover}
            onClick={handleOpen}
        >
            <motion.div
                className='relative aspect-[16/9] overflow-hidden rounded-lg'
                initial={articlesAnimations.articleImage.initial}
                whileInView={articlesAnimations.articleImage.animate}
                viewport={{ once: true }}
                transition={articlesAnimations.articleImage.transition(index)}
            >
                <Image src={article.thumbnail} alt={article.title} fill className='object-cover group-hover:scale-105 transition-transform duration-300' />

                <motion.div
                    className='absolute bottom-0 right-0 bg-background h-20 w-20 p-4 rounded-tl-4xl transition-colors duration-300'
                    initial={articlesAnimations.articleIcon.initial}
                    whileInView={articlesAnimations.articleIcon.animate}
                    viewport={{ once: true }}
                    transition={articlesAnimations.articleIcon.transition(index)}
                >
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-foreground group-hover:bg-gray-900 transition-all duration-300 shadow-lg group-hover:shadow-xl'>
                        <ArrowUpRight className='w-7 h-7 text-background group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 stroke-2 transition-all duration-300' />
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className='space-y-6 mt-6 py-2'
                initial={articlesAnimations.articleContent.initial}
                whileInView={articlesAnimations.articleContent.animate}
                viewport={{ once: true }}
                transition={articlesAnimations.articleContent.transition(index)}
            >
                <motion.div
                    className='inline-block'
                    initial={articlesAnimations.articleCategory.initial}
                    whileInView={articlesAnimations.articleCategory.animate}
                    viewport={{ once: true }}
                    transition={articlesAnimations.articleCategory.transition(index)}
                >
                    <span className='px-3 py-1 capitalize text-sm font-medium text-muted-foreground bg-muted rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300'>
                        {article.category}
                    </span>
                </motion.div>

                <motion.div
                    className='flex items-center gap-2 text-sm text-muted-foreground'
                    initial={articlesAnimations.articleMeta.initial}
                    whileInView={articlesAnimations.articleMeta.animate}
                    viewport={{ once: true }}
                    transition={articlesAnimations.articleMeta.transition(index)}
                >
                    <span className='w-1 h-1 bg-primary rounded-full'></span>
                    <span className='font-medium group-hover:text-foreground transition-colors duration-300'>Rizki</span>
                    <span className='w-1 h-1 bg-primary rounded-full'></span>
                    <span className='group-hover:text-foreground transition-colors duration-300'>{formatRelativeTime(article.createdAt)}</span>
                </motion.div>

                <motion.h1
                    className='text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300'
                    initial={articlesAnimations.articleTitle.initial}
                    whileInView={articlesAnimations.articleTitle.animate}
                    viewport={{ once: true }}
                    transition={articlesAnimations.articleTitle.transition(index)}
                >
                    {article.title}
                </motion.h1>
            </motion.div>
        </motion.div>
    )
}