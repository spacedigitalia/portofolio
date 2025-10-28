"use client"

import React from 'react'

import ArticleCard from '@/components/articles/components/ArticleCard'

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
            {articles.map((article, index) => (
                <ArticleCard key={article.slug || index} article={article} index={index} />
            ))}
        </div>
    )
}