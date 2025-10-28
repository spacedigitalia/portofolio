"use client"

import React from 'react'

import ArticlesHeader from '@/components/articles/components/ArticlesHeader'

import ArticlesGrid from '@/components/articles/components/ArticlesGrid'

export default function Articles({ articlesData }: { articlesData: Article[] }) {
    return (
        <section className='py-10'>
            <div className="container space-y-16 px-6">
                <ArticlesHeader />

                <ArticlesGrid
                    articles={articlesData}
                />
            </div>
        </section>
    )
}