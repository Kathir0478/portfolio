"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200">
                        Kathiravan
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {["about", "projects", "education", "skills", "contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="text-muted-foreground hover:text-foreground transition-all duration-200 capitalize font-medium hover:scale-105"
                            >
                                {item}
                            </button>
                        ))}
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Controls */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
                        <div className="flex flex-col space-y-4">
                            {["about", "projects", "education", "skills", "contact"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className="text-left text-muted-foreground hover:text-foreground transition-colors capitalize font-medium"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </nav>
                )}

            </div>
        </header>
    )
}
