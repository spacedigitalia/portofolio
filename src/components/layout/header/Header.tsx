"use client"

import { Button } from "@/components/ui/button"

import { Switch } from "@/components/ui/switch"

import { motion, AnimatePresence } from "framer-motion";

import { headerAnimations } from '@/base/animations/animation'

import { navLink, SocialMedia } from "@/components/layout/header/data/Header"

import { useStateHeader } from "@/components/layout/header/lib/useStateHeader"

import { ThemeSwitchOverlay } from '@/context/SwitchThemaOverlay';

export default function Header() {
    const {
        theme,
        setTheme,
        mounted,
        isInitialLoading,
        isMenuOpen,
        setIsMenuOpen,
        hoveredIndex,
        setHoveredIndex,
        isThemeOverlayVisible,
        hideThemeSwitchOverlay,
        handleSmoothScroll,
        activeLinkPath
    } = useStateHeader();

    const text = "rizki ramadhan.";

    return (
        <>
            <ThemeSwitchOverlay
                isVisible={isThemeOverlayVisible}
                onAnimationComplete={hideThemeSwitchOverlay}
            />

            <motion.header
                className="w-full px-4 sm:px-6 py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm"
                initial={headerAnimations.header.initial}
                animate={headerAnimations.header.animate(isInitialLoading)}
                transition={headerAnimations.header.transition(isInitialLoading)}
            >
                <div className='container mx-auto flex justify-between items-center'>
                    <motion.div
                        className="text-base sm:text-lg font-medium tracking-wide relative group cursor-pointer"
                        whileHover={headerAnimations.logo.whileHover}
                        transition={headerAnimations.logo.transition}
                        onClick={() => handleSmoothScroll('/')}
                    >
                        <motion.div className="w-full flex flex-col items-center justify-center py-2">
                            <div className="font-light text-2xl sm:text-3xl select-none tracking-wide text-foreground flex">
                                {text.split('').map((char, index) => (
                                    <motion.span
                                        key={index}
                                        onHoverStart={() => setHoveredIndex(index)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                        initial={headerAnimations.logoChar.initial}
                                        animate={headerAnimations.logoChar.animate(isInitialLoading, hoveredIndex, index)}
                                        transition={headerAnimations.logoChar.transition(isInitialLoading, index)}
                                        className="inline-block"
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="flex items-center">
                            {/* Dark mode toggle */}
                            {mounted && (
                                <>
                                    <motion.div
                                        initial={headerAnimations.themeToggle.initial}
                                        animate={headerAnimations.themeToggle.animate(isInitialLoading)}
                                        transition={headerAnimations.themeToggle.transition(isInitialLoading)}
                                    >
                                        <Switch
                                            id="theme-toggle"
                                            checked={theme === 'dark'}
                                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                            aria-label="Toggle dark mode"
                                            thumbContent={
                                                theme === 'light' ? (
                                                    <motion.svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        key="light-icon"
                                                        initial={{ rotate: 0, opacity: 0 }}
                                                        animate={{ rotate: -360, opacity: 1 }}
                                                        exit={{ rotate: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <circle cx="12" cy="12" r="4" />
                                                        <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                                    </motion.svg>
                                                ) : (
                                                    <motion.svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                        viewBox="0 0 24 24"
                                                        key="dark-icon"
                                                        initial={{ rotate: 0, opacity: 0 }}
                                                        animate={{ rotate: 360, opacity: 1 }}
                                                        exit={{ rotate: 0, opacity: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <circle cx="12" cy="12" r="11" fill="#60A5FA" />
                                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#FCD34D" />
                                                    </motion.svg>
                                                )
                                            }
                                        />
                                    </motion.div>
                                </>
                            )}
                        </div>
                        {/* Menu button */}
                        <motion.div
                            initial={headerAnimations.menuButton.initial}
                            animate={headerAnimations.menuButton.animate(isInitialLoading)}
                            transition={headerAnimations.menuButton.transition(isInitialLoading)}
                        >
                            <Button
                                variant="outline"
                                onClick={() => setIsMenuOpen(true)}
                                className="p-2 sm:p-3"
                                aria-label="Open navigation menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>
                </div>

            </motion.header>

            {/* Modal Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-200 flex items-center justify-center bg-black bg-opacity-80"
                        onClick={() => setIsMenuOpen(false)}
                        initial={headerAnimations.modal.overlay.initial}
                        animate={headerAnimations.modal.overlay.animate}
                        exit={headerAnimations.modal.overlay.exit}
                        transition={headerAnimations.modal.overlay.transition}
                    >
                        <motion.div
                            className="bg-background w-full h-full mx-auto flex flex-col justify-center items-center relative gap-8 sm:gap-12 px-4 sm:px-10 py-6 sm:py-16 rounded-none shadow-2xl"
                            onClick={e => e.stopPropagation()}
                            initial={headerAnimations.modal.content.initial}
                            animate={headerAnimations.modal.content.animate}
                            exit={headerAnimations.modal.content.exit}
                            transition={headerAnimations.modal.content.transition}
                        >
                            {/* Close button */}
                            <motion.button
                                className="absolute top-4 right-4 text-foreground text-2xl sm:text-4xl hover:text-muted-foreground z-10 focus:outline-none focus:ring-2 focus:ring-ring"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close"
                                whileHover={headerAnimations.closeButton.whileHover}
                                whileTap={headerAnimations.closeButton.whileTap}
                            >
                                &times;
                            </motion.button>
                            {/* Main menu */}
                            <nav className="flex flex-col gap-6 sm:gap-8 w-full mt-8 sm:mt-10">
                                {navLink.map((item, index) => {
                                    const isActive = activeLinkPath === item.path;
                                    return (
                                        <motion.div
                                            key={item.number}
                                            className="flex items-center justify-between group cursor-pointer relative"
                                            onClick={() => handleSmoothScroll(item.path)}
                                            initial={headerAnimations.menuItem.initial}
                                            animate={headerAnimations.menuItem.animate}
                                            transition={headerAnimations.menuItem.transition(index)}
                                        >
                                            <motion.div className="flex items-center gap-3 sm:gap-4">
                                                {isActive && (
                                                    <motion.div
                                                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                                <motion.div
                                                    className={`text-2xl sm:text-5xl font-bold transition-all duration-200 group-hover:tracking-wide ${isActive ? "text-muted-foreground" : "text-foreground"
                                                        }`}
                                                    whileHover={headerAnimations.menuButtonItem.whileHover}
                                                >
                                                    {item.label} <span className="text-muted-foreground text-base sm:text-lg align-top">({item.number})</span>
                                                </motion.div>
                                            </motion.div>
                                            <motion.button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSmoothScroll(item.path);
                                                }}
                                                className={`border rounded-full p-1.5 sm:p-3 transition-colors duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring ${isActive
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border group-hover:bg-accent"
                                                    }`}
                                                whileHover={headerAnimations.menuArrow.whileHover}
                                                whileTap={headerAnimations.menuArrow.whileTap}
                                            >
                                                <span className="sr-only">Go to {item.label}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? "text-primary" : "text-foreground"
                                                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </motion.button>
                                        </motion.div>
                                    );
                                })}
                            </nav>
                            {/* Footer menu modal */}
                            <motion.div
                                className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between gap-6 sm:gap-8 w-full mt-6 sm:mt-10"
                                initial={headerAnimations.footer.initial}
                                animate={headerAnimations.footer.animate}
                                transition={headerAnimations.footer.transition}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="font-semibold text-muted-foreground mb-2">Follow me.</div>
                                    <div className="flex flex-wrap gap-3 sm:gap-4 text-foreground text-xs sm:text-sm">
                                        {SocialMedia.map((social, index) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.path}
                                                className="hover:underline flex items-center gap-1 transition-colors duration-200 hover:text-primary"
                                                whileHover={headerAnimations.socialLink.whileHover}
                                                initial={headerAnimations.socialLink.initial}
                                                animate={headerAnimations.socialLink.animate}
                                                transition={headerAnimations.socialLink.transition(index)}
                                            >
                                                {social.label} <span>↗</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="w-full md:max-w-xs"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <div className="font-semibold text-muted-foreground mb-2">Stay connected w/ me.</div>
                                    <form className="flex items-center gap-2">
                                        <motion.input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="bg-transparent border-b border-border text-foreground px-2 py-1 outline-none w-full placeholder-muted-foreground text-sm sm:text-base"
                                            whileFocus={headerAnimations.emailInput.whileFocus}
                                        />
                                        <motion.div
                                            className="text-foreground text-lg sm:text-xl hover:text-primary transition-colors duration-200"
                                            whileHover={headerAnimations.emailArrow.whileHover}
                                            whileTap={headerAnimations.emailArrow.whileTap}
                                        >
                                            ↗
                                        </motion.div>
                                    </form>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
