"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import BotAnim from "@/public/animations/Bot-Robot.json"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [history, setHistory] = useState<{ query: string; answer: string }[]>([])
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            e.preventDefault()
            setIsLoading(true)

            try {
                // // Call your Flask API
                // console.log(query)
                // console.log(`${process.env.NEXT_PUBLIC_API_URL}/chat`)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: query }),
                })
                // console.log(query)
                const data = await response.json()
                const answer = data.response || "Sorry, I couldn't generate an answer."
                // console.log(answer)
                setHistory((prevHistory) => {
                    const newHistory = [...prevHistory, { query, answer }]
                    setCurrentIndex(newHistory.length - 1) // always go to the latest
                    return newHistory
                })
                setQuery("")
            } catch (err) {
                console.error("API Error:", err)
                const newHistory = [...history, { query, answer: "Failed to get a response. Try again." }]
                setHistory(newHistory)
                setCurrentIndex(newHistory.length - 1)
                setQuery("")
            } finally {
                setIsLoading(false)
            }
        }
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

                        {/* Bot toggle */}
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted/50 transition"
                        >
                            <Lottie animationData={BotAnim} loop autoplay style={{ width: 28, height: 28 }} />
                        </button>
                    </nav>

                    {/* Mobile Menu Controls */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted/50 transition"
                        >
                            <Lottie animationData={BotAnim} loop autoplay style={{ width: 24, height: 24 }} />
                        </button>

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

                {/* Chat Box */}
                {isChatOpen && (
                    <div className="absolute top-full right-4 mt-2 z-50">
                        <div className="w-80 space-y-3 rounded-lg bg-background/80 backdrop-blur-md border border-border shadow-lg p-3">
                            {/* Input */}
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isLoading ? "Thinking..." : "Ask me something..."}
                                disabled={isLoading}
                                className="w-full rounded-md px-3 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            />

                            {/* History / Welcome */}
                            {history.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center text-center p-4 space-y-4"
                                >
                                    <Lottie animationData={BotAnim} loop autoplay style={{ width: 120, height: 120 }} />
                                    <h3 className="text-lg font-semibold text-foreground">
                                        For more to know about me
                                    </h3>
                                    <p className="text-sm text-muted-foreground">Talk with my bot</p>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    {currentIndex >= 0 && (
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-2"
                                        >
                                            {/* Query */}
                                            <p className="text-sm font-medium text-indigo-500">{history[currentIndex].query}</p>
                                            {/* Answer */}
                                            <div className="p-3 rounded-md bg-muted/70 text-sm text-foreground shadow-sm">
                                                {history[currentIndex].answer}
                                            </div>
                                            {/* Navigation */}
                                            <div className="flex justify-between items-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={currentIndex === 0}
                                                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </Button>
                                                <span className="text-xs text-muted-foreground">
                                                    {currentIndex + 1} / {history.length}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={currentIndex === history.length - 1}
                                                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, history.length - 1))}
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
