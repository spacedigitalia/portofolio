"use client"

import React, { Fragment } from 'react'

import { motion, useInView } from 'framer-motion'

import AboutPhoto from '@/components/about/components/AboutPhoto'

import AboutInformation from '@/components/about/components/AboutInformation'

import TechSkill from '@/components/about/components/TechSkill'

import Achievements from '@/components/achievements/Achievements'

import ContributionsProjects from '@/components/about/components/ContributionsProjects'

export default function About({ aboutData, skillsData, achievementsData }: { aboutData: AboutContentProps, skillsData: SkillsContentProps[], achievementsData: AchievementsContentProps[] }) {
    const containerRef = React.useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    return (
        <Fragment>
            <section className="py-10 overflow-hidden bg-linear-to-b from-background to-surface/20">
                <div className="container px-4 md:px-6">
                    <motion.div
                        ref={containerRef}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Photo Section - Left Side */}
                        <AboutPhoto
                            imageUrl={aboutData.card.imageUrl}
                            name={aboutData.card.name}
                            status={aboutData.card.status}
                            isInView={isInView}
                        />

                        {/* Content Section - Right Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            {/* Information Section */}
                            <AboutInformation
                                name={aboutData.card.name}
                                work={aboutData.card.work}
                                location={aboutData.card.location}
                                description={aboutData.description}
                                isInView={isInView}
                            />

                            {/* Skills Section */}
                            <TechSkill
                                skillsData={skillsData}
                                isInView={isInView}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Achievements achievementsData={achievementsData} />

            {/* Contributions & Projects Section */}
            <ContributionsProjects />
        </Fragment>
    )
}
