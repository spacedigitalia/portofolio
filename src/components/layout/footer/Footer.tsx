"use client"

import { motion } from 'framer-motion'

import { footerAnimations } from '@/base/animations/animation'

import { useFooterState } from '@/components/layout/footer/lib/useStateFooter'

export default function Footer() {
    const {
        handleSmoothScroll,
        navigationLinks,
        socialLinks
    } = useFooterState()

    return (
        <motion.footer
            className="w-full bg-linear-to-t from-background/90 via-background/80 to-background/60 border-t border-border/30 pt-16 pb-8 relative overflow-hidden rounded-t-2xl"
            initial={footerAnimations.container.hidden}
            whileInView={footerAnimations.container.visible}
            viewport={{ once: true, amount: 0.3 }}
            variants={footerAnimations.container}
        >
            {/* Animated Decorative Blobs */}
            <motion.div
                className="pointer-events-none absolute -top-10 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"
                variants={footerAnimations.floating}
                animate={footerAnimations.floating.animate}
            />
            <motion.div
                className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-secondary/10 rounded-full blur-2xl z-0"
                variants={footerAnimations.floating}
                animate={footerAnimations.floating.animate}
                transition={{ delay: 2 }}
            />

            <div className="container px-4 relative z-10">
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between gap-10"
                    variants={footerAnimations.container}
                >
                    {/* Brand / Logo */}
                    <motion.div
                        className="flex flex-col items-center md:items-start gap-2"
                        variants={footerAnimations.item}
                    >
                        <motion.span
                            className="text-2xl font-extrabold text-primary tracking-tight"
                            whileHover={footerAnimations.brand.whileHover}
                            transition={footerAnimations.brand.transition}
                        >
                            Rizki Ramadhan
                        </motion.span>
                        <motion.span
                            className="text-muted-foreground text-xs font-medium"
                            initial={footerAnimations.copyright.initial}
                            animate={footerAnimations.copyright.animate}
                            transition={footerAnimations.copyright.transition}
                        >
                            © 2024 - {new Date().getFullYear()} All rights reserved.
                        </motion.span>
                    </motion.div>

                    {/* Navigation */}
                    <motion.nav
                        className="flex flex-wrap gap-6 text-sm font-medium justify-center"
                        variants={footerAnimations.item}
                    >
                        {navigationLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleSmoothScroll(link.href); }}
                                className="hover:text-primary/90 transition-colors duration-200 cursor-pointer"
                                variants={footerAnimations.nav}
                                whileHover={footerAnimations.nav.hover}
                                initial={footerAnimations.nav.hidden}
                                animate={footerAnimations.nav.visible}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.nav>

                    {/* Socials */}
                    <motion.div
                        className="flex gap-5"
                        variants={footerAnimations.item}
                    >
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="group rounded-full p-2 bg-background/70 border border-border/30 hover:bg-primary/10 transition-all"
                                variants={footerAnimations.social}
                                whileHover={footerAnimations.social.hover}
                                whileTap={footerAnimations.social.tap}
                                initial={footerAnimations.social.hidden}
                                animate={footerAnimations.social.visible}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-12 border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
                    variants={footerAnimations.item}
                    initial={footerAnimations.item.hidden}
                    animate={footerAnimations.item.visible}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <motion.div
                        className="text-xs text-muted-foreground text-center md:text-left"
                    >
                        Built with <span className="text-primary font-semibold">Love</span> <motion.span
                            className="text-red-500"
                            animate={footerAnimations.heart.animate}
                            transition={footerAnimations.heart.transition}
                        >♥</motion.span> by <span className="font-semibold">Rizki Ramadhan</span>
                    </motion.div>
                    <motion.div
                        className="text-xs text-muted-foreground text-center md:text-right"
                    >
                        <span>
                            User Terms & Conditions | Privacy Policy
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </motion.footer>
    )
}
