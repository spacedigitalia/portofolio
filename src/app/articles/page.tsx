import { Fragment } from 'react'

import ArticlesLayout from '@/hooks/articles/articles/ArticlesLayout'

import { fetchArticlesContents } from "@/utils/FetchArticles";

import HeroArticles from "@/hooks/articles/articles/HeroArticles"

import { ArticlesSchema, ArticlesBreadcrumbSchema } from "@/lib/Script";

import { generateMetadata as getArticlesMetadata } from '@/hooks/articles/articles/meta/metadata'

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getArticlesMetadata();
    return metadata;
}

export default async function ArticlesPage() {
    const articlesData = await fetchArticlesContents();
    return (
        <Fragment>
            <ArticlesBreadcrumbSchema />
            <ArticlesSchema articlesData={articlesData} />
            <HeroArticles />
            <ArticlesLayout articlesData={articlesData} />
        </Fragment>
    );
}