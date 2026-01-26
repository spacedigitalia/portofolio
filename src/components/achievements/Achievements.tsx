"use client"

import React, { useState, useEffect, useRef } from 'react'

import { motion, useInView } from 'framer-motion'

import { achievementsAnimations } from '@/base/animations/animation'

import AchievementsModal from '@/components/achievements/modal/AchievementsModal'

import AchievementsCard from '@/components/achievements/components/AchievementsCard'

export default function AchievementsContent({ achievementsData }: { achievementsData: AchievementsContentProps[] }) {
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementsContentProps | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const headingRef = React.useRef<HTMLHeadingElement>(null);
    const marqueeRef = React.useRef<HTMLDivElement>(null);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });

    const containerRef = React.useRef(null);
    const isCardsInView = useInView(containerRef, { once: true, margin: "-100px" });

    const handleInteraction = () => {
        setIsPaused(true);
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 500);
    };

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            handleInteraction();
            if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        const handleTouchStart = () => handleInteraction();
        const handleMouseDown = () => handleInteraction();
        const handleMouseEnter = () => handleInteraction();

        el.addEventListener('wheel', handleWheel, { passive: false });
        el.addEventListener('touchstart', handleTouchStart);
        el.addEventListener('mousedown', handleMouseDown);
        el.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            el.removeEventListener('wheel', handleWheel);
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('mousedown', handleMouseDown);
            el.removeEventListener('mouseenter', handleMouseEnter);
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, []);

    return (
        <section className="w-full py-10 px-4 md:px-8 relative overflow-hidden bg-linear-to-b from-background to-background/95">
            <div className="container relative">
                <div ref={containerRef} className="relative w-full overflow-hidden">
                    {/* Left fade overlay */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
                    {/* Right Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
                    {/* Marquee Container with scroll capability */}
                    <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <motion.div
                            ref={marqueeRef}
                            className="flex w-[200%] animate-marquee-left"
                            style={{
                                animationPlayState: isPaused ? 'paused' : 'running'
                            }}
                        >
                            {/* First set of cards */}
                            <div className="flex gap-4">
                                {achievementsData.map((achievement, index) => (
                                    <AchievementsCard
                                        key={`${achievement._id}-${index}`}
                                        achievement={achievement}
                                        index={index}
                                        isCardsInView={isCardsInView}
                                        onCardClick={setSelectedAchievement}
                                    />
                                ))}
                            </div>
                            {/* Duplicated set of cards for seamless loop */}
                            <div className="flex gap-4">
                                {achievementsData.map((achievement, index) => (
                                    <AchievementsCard
                                        key={`${achievement._id}-${index}-duplicate`}
                                        achievement={achievement}
                                        index={index + achievementsData.length}
                                        isCardsInView={isCardsInView}
                                        onCardClick={setSelectedAchievement}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Achievement Details Modal */}
            <AchievementsModal
                selectedAchievement={selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
        </section>
    )
}