import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { Badge } from "@/components/ui/badge"

export default function TechSkill({ skillsData, isInView }: TechSkillProps) {
    const skillsToShow = skillsData

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.6 }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1.8 }}
            >
                <h3 className="text-xl font-semibold text-foreground">Technical Skills</h3>
                <p className="text-muted-foreground text-sm">
                    Technologies and tools I work with to bring ideas to life
                </p>
            </motion.div>

            <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 2.0 }}
            >
                <div className="flex flex-wrap gap-3">
                    {skillsToShow.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 2.2 + (index * 0.05)
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotateX: 5,
                                rotateY: 5,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{ perspective: 1000 }}
                        >
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-2 px-4 py-2 h-auto cursor-pointer 
                                        bg-gradient-to-br from-secondary to-secondary/80
                                        shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_0_rgb(0,0,0,0.1)]
                                        active:shadow-[0_2px_0_rgb(0,0,0,0.1)] active:translate-y-[2px]
                                        transition-all duration-200 ease-out
                                        border border-black/10
                                        hover:bg-secondary/90"
                            >
                                <motion.div
                                    className="relative w-6 h-6"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 2.4 + (index * 0.05),
                                        ease: "backOut"
                                    }}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-contain drop-shadow-sm"
                                    />
                                </motion.div>
                                <motion.span
                                    className="text-sm font-medium drop-shadow-sm"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 2.6 + (index * 0.05)
                                    }}
                                >
                                    {item.title}
                                </motion.span>
                            </Badge>
                        </motion.div>
                    ))}
                </div>

                {/* Semua skills ditampilkan; tombol dan overlay dihapus */}
            </motion.div>

        </motion.div>
    )
}
