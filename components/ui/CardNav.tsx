"use client"

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { gsap } from "gsap"
import { ArrowUpRight } from "lucide-react"
import "./CardNav.css"

export type CardNavLink = {
    label: string
    ariaLabel: string
    href?: string
    onClick?: () => void
}

export type CardNavItem = {
    label: string
    bgColor: string
    textColor: string
    links: CardNavLink[]
}

type CardNavProps = {
    logo?: string
    logoAlt?: string
    logoText?: string
    onLogoClick?: () => void
    items: CardNavItem[]
    className?: string
    ease?: string
    baseColor?: string
    menuColor?: string
    ctaContent?: ReactNode
    topActions?: ReactNode
    chatPanel?: ReactNode
    isChatOpen?: boolean
    isExpanded?: boolean
    onExpandedChange?: (isOpen: boolean) => void
}

export default function CardNav({
    logo,
    logoAlt = "Logo",
    logoText,
    onLogoClick,
    items,
    className = "",
    ease = "power3.out",
    baseColor = "#fff",
    menuColor,
    ctaContent,
    topActions,
    chatPanel,
    isChatOpen = false,
    isExpanded,
    onExpandedChange,
}: CardNavProps) {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [internalExpanded, setInternalExpanded] = useState(false)
    const isControlled = typeof isExpanded !== "undefined"
    const expanded = isControlled ? isExpanded : internalExpanded
    const navRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const calculateHeight = () => {
        const navEl = navRef.current
        if (!navEl) return 260

        const isMobile = window.matchMedia("(max-width: 768px)").matches
        if (isMobile) {
            const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement | null
            if (contentEl) {
                const wasVisible = contentEl.style.visibility
                const wasPointerEvents = contentEl.style.pointerEvents
                const wasPosition = contentEl.style.position
                const wasHeight = contentEl.style.height

                contentEl.style.visibility = "visible"
                contentEl.style.pointerEvents = "auto"
                contentEl.style.position = "static"
                contentEl.style.height = "auto"

                contentEl.offsetHeight

                const topBar = 60
                const padding = 16
                const contentHeight = contentEl.scrollHeight

                contentEl.style.visibility = wasVisible
                contentEl.style.pointerEvents = wasPointerEvents
                contentEl.style.position = wasPosition
                contentEl.style.height = wasHeight

                return topBar + contentHeight + padding
            }
        }
        return 260
    }

    const createTimeline = () => {
        const navEl = navRef.current
        if (!navEl) return null

        gsap.set(navEl, { height: 60, overflow: "hidden" })
        gsap.set(cardsRef.current.filter(Boolean), { y: 50, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease,
        })

        tl.to(
            cardsRef.current.filter(Boolean),
            { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
            "-=0.1"
        )

        return tl
    }

    useLayoutEffect(() => {
        const tl = createTimeline()
        tlRef.current = tl

        return () => {
            tl?.kill()
            tlRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items])

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return

            if (expanded) {
                const newHeight = calculateHeight()
                gsap.set(navRef.current, { height: newHeight })

                tlRef.current.kill()
                const newTl = createTimeline()
                if (newTl) {
                    newTl.progress(1)
                    tlRef.current = newTl
                }
            } else {
                tlRef.current.kill()
                const newTl = createTimeline()
                if (newTl) {
                    tlRef.current = newTl
                }
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded])

    const toggleMenu = () => {
        if (isChatOpen) return

        const tl = tlRef.current
        if (!tl) return
        if (!expanded) {
            setIsHamburgerOpen(true)
            if (!isControlled) setInternalExpanded(true)
            onExpandedChange?.(true)
            tl.play(0)
        } else {
            setIsHamburgerOpen(false)
            tl.eventCallback("onReverseComplete", () => {
                if (!isControlled) setInternalExpanded(false)
                onExpandedChange?.(false)
            })
            tl.reverse()
        }
    }

    const handleLinkClick = (link: CardNavLink) => {
        link.onClick?.()
        if (expanded) toggleMenu()
    }

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el
    }

    useEffect(() => {
        const originalBodyOverflow = document.body.style.overflow
        const originalHtmlOverflow = document.documentElement.style.overflow

        if (expanded) {
            document.body.style.overflow = "hidden"
            document.documentElement.style.overflow = "hidden"
        } else {
            document.body.style.overflow = originalBodyOverflow
            document.documentElement.style.overflow = originalHtmlOverflow
        }

        return () => {
            document.body.style.overflow = originalBodyOverflow
            document.documentElement.style.overflow = originalHtmlOverflow
        }
    }, [expanded])

    useEffect(() => {
        if (isControlled) {
            setIsHamburgerOpen(expanded)
        }
    }, [expanded, isControlled])

    return (
        <div className={`card-nav-container ${chatPanel ? "card-nav-with-chat" : ""} ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${expanded ? "open" : ""} ${isChatOpen ? "chat-open" : ""}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} ${isChatOpen ? "disabled" : ""}`}
                        onClick={toggleMenu}
                        onKeyDown={(e) => {
                            if (isChatOpen) return
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                toggleMenu()
                            }
                        }}
                        role="button"
                        aria-label={expanded ? "Close menu" : "Open menu"}
                        aria-disabled={isChatOpen}
                        tabIndex={isChatOpen ? -1 : 0}
                        style={{ color: menuColor || "#000", cursor: isChatOpen ? "not-allowed" : "pointer" }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div
                        className="logo-container"
                        onClick={onLogoClick}
                        onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && onLogoClick) {
                                e.preventDefault()
                                onLogoClick()
                            }
                        }}
                        role={onLogoClick ? "button" : undefined}
                        tabIndex={onLogoClick ? 0 : undefined}
                        style={{ color: menuColor }}
                    >
                        {logo ? (
                            <img src={logo} alt={logoAlt} className="logo" />
                        ) : logoText ? (
                            <span className="logo-text">{logoText}</span>
                        ) : null}
                    </div>

                    <div className="card-nav-top-actions">
                        {ctaContent ? <div className="card-nav-cta-slot">{ctaContent}</div> : null}
                        {topActions}
                    </div>
                </div>

                <div className="card-nav-content" aria-hidden={!expanded}>
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <button
                                        key={`${lnk.label}-${i}`}
                                        type="button"
                                        className="nav-card-link"
                                        onClick={() => handleLinkClick(lnk)}
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <ArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                                        {lnk.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>

            {chatPanel}
        </div>
    )
}
