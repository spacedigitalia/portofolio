import { motion } from 'framer-motion'

import { MoveUpRight } from 'lucide-react'

import { achievementsAnimations } from '@/base/animations/animation'

export default function AchievementsCard({
    achievement,
    index,
    isCardsInView,
    onCardClick
}: AchievementsCardProps) {
    return (
        <motion.div
            key={`${achievement._id}-${index}`}
            className="group shrink-0 w-[380px] h-[220px] relative overflow-hidden rounded-2xl bg-background/40 hover:bg-background/60 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-500 shadow-lg hover:shadow-xl snap-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isCardsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Text Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div>
                    <motion.h2
                        className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3"
                        initial={achievementsAnimations.achievementTitle.initial}
                        animate={achievementsAnimations.achievementTitle.animate(isCardsInView)}
                        transition={achievementsAnimations.achievementTitle.transition(index)}
                        whileHover={achievementsAnimations.achievementTitle.whileHover}
                    >
                        {achievement.title}
                    </motion.h2>
                    <div className="h-1 w-24 bg-primary/30 group-hover:w-40 transition-all duration-500 ease-out" />
                </div>
                <motion.button
                    onClick={() => onCardClick(achievement)}
                    className="flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors duration-300 self-end cursor-pointer"
                    initial={achievementsAnimations.achievementButton.initial}
                    animate={achievementsAnimations.achievementButton.animate(isCardsInView)}
                    transition={achievementsAnimations.achievementButton.transition(index)}
                    whileHover={achievementsAnimations.achievementButton.whileHover}
                    whileTap={achievementsAnimations.achievementButton.whileTap}
                >
                    <span className="text-sm font-medium">View Details</span>
                    <MoveUpRight className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    )
}
