import Image from 'next/image';

import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ArticlesLayout({ productsData }: ArticlesLayoutProps) {
    return (
        <section className='py-4 sm:py-6 md:py-8 lg:py-10'>
            <div className="container px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10 md:space-y-12">
                {/* Hero Image Section */}
                <div className='relative aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl group shadow-xl sm:shadow-2xl'>
                    <Image
                        src={productsData.thumbnail}
                        alt={productsData.title}
                        fill
                        className='object-cover transition-all duration-700 group-hover:scale-110'
                        priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                </div>

                {/* Article Header */}
                <div className='space-y-4 sm:space-y-6'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-muted-foreground'>
                        <span className='px-3 py-1 bg-primary/10 text-primary rounded-full font-medium w-fit'>
                            {productsData.category}
                        </span>
                        <span className='hidden sm:inline'>•</span>
                        <time dateTime={productsData.createdAt} className='text-xs sm:text-sm'>
                            {new Date(productsData.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>

                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight'>
                        {productsData.title}
                    </h1>
                </div>

                {/* Article Content */}
                <div className='prose prose-sm sm:prose-base md:prose-lg prose-slate dark:prose-invert max-w-none'>
                    <div
                        className='
                            prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                            prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4 sm:prose-h1:mb-6 prose-h1:mt-6 sm:prose-h1:mt-8 prose-h1:border-b prose-h1:border-border prose-h1:pb-2 sm:prose-h1:pb-3
                            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:mt-8 prose-h2:text-primary
                            prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:mt-4 sm:prose-h3:mt-6
                            prose-h4:text-base sm:prose-h4:text-lg md:prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-3 sm:prose-h4:mt-4
                            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 prose-p:text-sm sm:prose-p:text-base
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                            prose-strong:text-foreground prose-strong:font-semibold
                            prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 sm:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono
                            prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-3 sm:prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm
                            prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:pl-4 sm:prose-blockquote:pl-6 prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-4 sm:prose-blockquote:my-6 prose-blockquote:italic
                            prose-ul:my-3 sm:prose-ul:my-4 prose-ol:my-3 sm:prose-ol:my-4
                            prose-li:my-1 sm:prose-li:my-2 prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:text-sm sm:prose-li:text-base
                            prose-li[data-list="ordered"]:ml-3 sm:prose-li[data-list="ordered"]:ml-4 prose-li[data-list="ordered"]:list-decimal
                            prose-li[data-list="bullet"]:ml-3 sm:prose-li[data-list="bullet"]:ml-4 prose-li[data-list="bullet"]:list-disc
                            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4 sm:prose-img:my-6
                            prose-hr:border-border prose-hr:my-6 sm:prose-hr:my-8
                            prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden prose-table:text-xs sm:prose-table:text-sm
                            prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-2 sm:prose-th:px-4 prose-th:py-1.5 sm:prose-th:py-2 prose-th:font-semibold prose-th:text-foreground
                            prose-td:border prose-td:border-border prose-td:px-2 sm:prose-td:px-4 prose-td:py-1.5 sm:prose-td:py-2 prose-td:text-muted-foreground
                        '
                        dangerouslySetInnerHTML={{ __html: productsData.content }}
                    />
                </div>

                {/* Related Articles Section */}
                {productsData.relatedArticles.length > 0 && (
                    <div className='space-y-6 sm:space-y-8'>
                        <div className='border-t border-border pt-6 sm:pt-8'>
                            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2'>
                                Artikel Terkait
                            </h2>
                            <p className='text-sm sm:text-base text-muted-foreground'>
                                Jelajahi artikel menarik lainnya yang mungkin Anda sukai
                            </p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                            {productsData.relatedArticles.map((article: RelatedArticle, index: number) => (
                                <Link key={index} href={`/articles/${article.slug}`} className='group cursor-pointer'>
                                    <Card className='relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group-hover:-translate-y-1 p-0'>
                                        <CardContent className='relative aspect-[16/9] overflow-hidden p-0'>
                                            <Image
                                                src={article.thumbnail}
                                                alt={article.title}
                                                fill
                                                className='object-cover transition-all duration-500 group-hover:scale-110'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                                            <div className='absolute top-2 sm:top-3 left-2 sm:left-3'>
                                                <span className='px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-md'>
                                                    {article.category}
                                                </span>
                                            </div>
                                        </CardContent>

                                        <CardHeader className='p-3 sm:p-4 -mt-4 sm:-mt-5 space-y-2'>
                                            <CardTitle className='text-sm sm:text-base font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug'>
                                                {article.title}
                                            </CardTitle>
                                            <CardDescription className='text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed'>
                                                {article.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
