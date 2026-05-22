"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import BotAnim from "@/public/animations/Bot-Robot.json"
import LoadingAnim from "@/public/animations/loading.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const INITIAL_GREETING_QUERY =
    "Introduce yourself briefly and greet the visitor to this portfolio in one short, friendly paragraph."

const apiBase = () => process.env.NEXT_PUBLIC_API_URL ?? ""

export function useChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [history, setHistory] = useState<{ query: string; answer: string }[]>([])
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const initialGreetingSentRef = useRef(false)

    useEffect(() => {
        if (initialGreetingSentRef.current) return
        initialGreetingSentRef.current = true

        const url = apiBase()
        if (!url) return

        fetch(`${url}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: INITIAL_GREETING_QUERY }),
        })
            .then((res) => res.json())
            .then((data) => {
                const answer = data.response || ""
                if (answer) {
                    setHistory((prev) => [{ query: "Welcome", answer }, ...prev])
                    setCurrentIndex(0)
                }
            })
            .catch(() => { })
    }, [])

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            e.preventDefault()
            setIsLoading(true)

            try {
                const response = await fetch(`${apiBase()}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: query }),
                })
                const data = await response.json()
                const answer = data.response || "Sorry, I couldn't generate an answer."
                setHistory((prevHistory) => {
                    const newHistory = [...prevHistory, { query, answer }]
                    setCurrentIndex(newHistory.length - 1)
                    return newHistory
                })
                setQuery("")
            } catch (err) {
                console.error("API Error:", err)
                setHistory((prev) => {
                    const newHistory = [...prev, { query, answer: "Failed to get a response. Try again." }]
                    setCurrentIndex(newHistory.length - 1)
                    return newHistory
                })
                setQuery("")
            } finally {
                setIsLoading(false)
            }
        }
    }

    return {
        isOpen,
        setIsOpen,
        query,
        setQuery,
        history,
        currentIndex,
        setCurrentIndex,
        isLoading,
        handleKeyDown,
    }
}

type ChatbotPanelProps = ReturnType<typeof useChatbot>

export function ChatbotTrigger({
    isOpen,
    onToggle,
    variant = "header",
}: {
    isOpen: boolean
    onToggle: () => void
    variant?: "header" | "floating"
}) {
    return (
        <Button
            type="button"
            variant={variant === "header" ? "default" : undefined}
            className={
                variant === "header"
                    ? "rounded-[calc(0.75rem-0.35rem)] h-full min-h-[40px] px-3 gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium"
                    : "rounded-full h-12 w-12 bg-accent"
            }
            onClick={onToggle}
            aria-label={isOpen ? "Close chat" : "Open chat"}
            aria-expanded={isOpen}
        >
            {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
            {variant === "header" && !isOpen ? (
                <span className="hidden sm:inline text-sm">Chat</span>
            ) : null}
        </Button>
    )
}

export function ChatbotPanel({
    isOpen,
    query,
    setQuery,
    history,
    currentIndex,
    setCurrentIndex,
    isLoading,
    handleKeyDown,
    placement = "header",
    onClose,
}: ChatbotPanelProps & { isOpen: boolean; placement?: "header" | "floating"; onClose?: () => void }) {
    if (!isOpen) return null

    const positionClass =
        placement === "floating"
            ? "fixed bottom-10 right-4 left-4 z-[100] sm:right-6"
            : "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[100] pointer-events-auto"

    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={positionClass}
        >
            <div className="w-full max-w-sm ml-auto space-y-3 rounded-2xl bg-background/95 backdrop-blur-md border border-border p-4 shadow-lg ring-2 ring-accent/40">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isLoading ? "Thinking..." : "Ask me something..."}
                        disabled={isLoading}
                        className="flex-1 rounded-2xl px-3 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close chat"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {history.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center p-2 space-y-3"
                    >
                        {isLoading ? (
                            <Lottie animationData={LoadingAnim} loop autoplay style={{ width: 120, height: 120 }} />
                        ) : (
                            <Lottie animationData={BotAnim} loop autoplay style={{ width: 96, height: 96 }} />
                        )}
                        <h3 className="text-base font-semibold text-foreground">For more to know about me</h3>
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
                                <p className="text-sm font-medium text-accent">{history[currentIndex].query}</p>
                                <div className="p-3 rounded-2xl bg-muted/70 text-sm text-foreground shadow-sm max-h-48 overflow-y-auto">
                                    {history[currentIndex].answer}
                                </div>
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
                                        onClick={() =>
                                            setCurrentIndex((prev) => Math.min(prev + 1, history.length - 1))
                                        }
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    )
}

/** Legacy floating chatbot (bottom-right) */
export function Chatbot() {
    const chat = useChatbot()

    return (
        <div className="fixed bottom-0 right-0 z-50 pointer-events-auto p-4 sm:p-6">
            <div className="relative flex flex-col items-end">
                <AnimatePresence>
                    {chat.isOpen && (
                        <ChatbotPanel {...chat} isOpen={chat.isOpen} placement="floating" />
                    )}
                </AnimatePresence>
                {!chat.isOpen && (
                    <ChatbotTrigger
                        isOpen={chat.isOpen}
                        onToggle={() => chat.setIsOpen(true)}
                        variant="floating"
                    />
                )}
            </div>
        </div>
    )
}
