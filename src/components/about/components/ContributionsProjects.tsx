"use client"

import React, { useRef } from 'react'

import { motion, useInView } from 'framer-motion'

import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

import { ArrowUpRight, Users, FolderKanban } from 'lucide-react'

export default function ContributionsProjects() {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const cards = [
        {
            title: "Contributions",
            description: "Let's connect and collaborate. Reach out to discuss opportunities, partnerships, or just to say hello.",
            href: "/contacts",
            icon: Users,
            gradient: "from-blue-500/20 via-purple-500/20 to-pink-500/20",
            hoverGradient: "from-blue-500/30 via-purple-500/30 to-pink-500/30",
            iconColor: "text-blue-500",
            delay: 0.1
        },
        {
            title: "Projects",
            description: "Explore my portfolio of innovative projects, creative solutions, and technical achievements.",
            href: "/projects",
            icon: FolderKanban,
            gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
            hoverGradient: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
            iconColor: "text-emerald-500",
            delay: 0.2
        }
    ]

    return (
        <section className='w-full py-10 px-4 md:px-8 relative overflow-hidden bg-linear-to-b from-background to-background/95'>
            <div className="container mx-auto">
                <motion.div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {cards.map((card, index) => {
                        const Icon = card.icon
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: card.delay, ease: "easeOut" }}
                            >
                                <Link href={card.href} className="block h-full group">
                                    <Card className="relative h-full overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 cursor-pointer group">
                                        {/* Gradient Background */}
                                        <div className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                        {/* Content */}
                                        <CardContent className="relative p-8 lg:p-10 flex flex-col h-full">
                                            {/* Icon */}
                                            <motion.div
                                                className={`mb-6 w-16 h-16 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-all duration-500 ${card.iconColor} group-hover:scale-110 group-hover:rotate-3`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                <Icon className="w-8 h-8" strokeWidth={2} />
                                            </motion.div>

                                            {/* Title */}
                                            <motion.h3
                                                className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5, delay: card.delay + 0.1 }}
                                            >
                                                {card.title}
                                            </motion.h3>

                                            {/* Description */}
                                            <motion.p
                                                className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6 grow group-hover:text-foreground/90 transition-colors duration-300"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5, delay: card.delay + 0.2 }}
                                            >
                                                {card.description}
                                            </motion.p>

                                            {/* CTA Button */}
                                            <motion.div
                                                className="flex items-center gap-2 text-primary/70 group-hover:text-primary font-semibold transition-colors duration-300"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5, delay: card.delay + 0.3 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <span className="text-sm lg:text-base">Explore</span>
                                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={2.5} />
                                            </motion.div>

                                            {/* Decorative Elements */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500 -z-10" />
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500 -z-10" />
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
