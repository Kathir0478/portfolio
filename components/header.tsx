"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence } from "framer-motion"
import CardNav, { type CardNavItem } from "@/components/ui/CardNav"
import { ChatbotTrigger, ChatbotPanel, useChatbot } from "@/components/chatbot"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const { resolvedTheme } = useTheme()
    const chat = useChatbot()
    const isDark = resolvedTheme === "dark"
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [navVisible, setNavVisible] = useState(false)

    useEffect(() => {
        const timer = window.setTimeout(() => setNavVisible(true), 650)
        return () => window.clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (chat.isOpen) {
            setIsNavOpen(false)
        }
    }, [chat.isOpen])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
    }

    const navItems: CardNavItem[] = useMemo(
        () => [
            {
                label: "About",
                bgColor: isDark ? "#1B1722" : "#2a2438",
                textColor: "#fff",
                links: [
                    { label: "About Me", ariaLabel: "Go to About section", onClick: () => scrollToSection("about") },
                    { label: "Education", ariaLabel: "Go to Education section", onClick: () => scrollToSection("education") },
                ],
            },
            {
                label: "Work",
                bgColor: isDark ? "#2F293A" : "#3d3550",
                textColor: "#fff",
                links: [
                    { label: "Projects", ariaLabel: "Go to Projects section", onClick: () => scrollToSection("projects") },
                    { label: "Skills", ariaLabel: "Go to Skills section", onClick: () => scrollToSection("skills") },
                ],
            },
            {
                label: "Contact",
                bgColor: isDark ? "#2F293A" : "#4a4060",
                textColor: "#fff",
                links: [
                    { label: "Get in Touch", ariaLabel: "Go to Contact section", onClick: () => scrollToSection("contact") },
                ],
            },
        ],
        [isDark]
    )

    return (
        <>
            <div className="h-[4rem] shrink-0" aria-hidden />
            <CardNav
                className={navVisible ? "nav-visible" : "nav-hidden"}
                logoText="KATHIRAVAN"
                onLogoClick={() => scrollToSection("about")}
                items={navItems}
                baseColor="var(--background)"
                menuColor="var(--foreground)"
                isExpanded={isNavOpen}
                onExpandedChange={setIsNavOpen}
                ctaContent={
                    <ChatbotTrigger
                        isOpen={chat.isOpen}
                        onToggle={() => chat.setIsOpen(!chat.isOpen)}
                        variant="header"
                    />
                }
                isChatOpen={chat.isOpen}
                topActions={
                    <div className="scale-90 [&_button]:h-9 [&_button]:w-9">
                        <ThemeToggle />
                    </div>
                }
            />
            <AnimatePresence>
                {chat.isOpen && (
                    <ChatbotPanel
                        {...chat}
                        isOpen={chat.isOpen}
                        placement="floating"
                        onClose={() => chat.setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
