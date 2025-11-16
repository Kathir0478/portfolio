"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import BotAnim from "@/public/animations/Bot-Robot.json"
import LoadingAnim from "@/public/animations/loading.json"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })



export function Chatbot() {
    const [isBotOpen, setIsBotOpen] = useState(true)
    const [query, setQuery] = useState("")
    const [history, setHistory] = useState<{ query: string; answer: string }[]>([])
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsBotOpen(false)
        }, 6000) // disappears after 6 seconds
        return () => clearTimeout(timer)
    }, [])

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            e.preventDefault()
            setIsLoading(true)

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: query }),
                })
                const data = await response.json()
                const answer = data.response || "Sorry, I couldn't generate an answer."
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
        <div>

            {/* Chat Box */}
            {isBotOpen && (

                <div className="top-full right-4 mt-2 z-50">
                    <div className="w-80 space-y-3 rounded-3xl bg-background/80 backdrop-blur-md  border-border p-6 ring-2 ring-accent">

                        {/* Input */}
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={isLoading ? "Thinking..." : "Ask me something..."}
                            disabled={isLoading}
                            className="w-full rounded-3xl px-3 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        {/* History / Welcome */}
                        {history.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center text-center p-4 space-y-4"
                            >
                                {isLoading ?
                                    <Lottie animationData={LoadingAnim} loop autoplay style={{ width: 160, height: 160 }} /> :
                                    <Lottie animationData={BotAnim} loop autoplay style={{ width: 120, height: 120 }} />
                                }
                                <h3 className="text-lg font-semibold text-foreground">
                                    For more to know about me
                                </h3>
                                <p className="text-sm text-muted-foreground">Talk with my bot</p>
                                <div className="flex w-full justify-end">
                                    <Button
                                        className="rounded-full h-12 w-12 bg-accent "
                                        onClick={() => {
                                            setIsBotOpen(!isBotOpen)
                                            setIsBotOpen(!isBotOpen)
                                        }}
                                    >
                                        {isBotOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                                    </Button>
                                </div>
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
                                        <div className="p-3 rounded-3xl bg-muted/70 text-sm text-foreground shadow-sm">
                                            {history[currentIndex].answer}
                                        </div>
                                        {/* Navigation */}
                                        <div className="flex items-center">
                                            <div className="flex flex-1/2 justify-between items-center">
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
                                                <Button
                                                    className="rounded-full h-12 w-12 m-3 bg-accent "
                                                    onClick={() => {
                                                        setIsBotOpen(!isBotOpen)
                                                        setIsBotOpen(!isBotOpen)
                                                    }}
                                                >
                                                    {isBotOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            )}
            {!isBotOpen &&
                <Button
                    className="rounded-full h-12 w-12 m-6 bg-accent"
                    onClick={() => {
                        setIsBotOpen(!isBotOpen)
                        setIsBotOpen(!isBotOpen)
                    }}
                >
                    {isBotOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                </Button>}
        </div>
    )
}