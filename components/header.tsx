// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Menu, X } from "lucide-react"

// export function Header() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)

//     const scrollToSection = (sectionId: string) => {
//         const element = document.getElementById(sectionId)
//         if (element) {
//             element.scrollIntoView({ behavior: "smooth" })
//         }
//         setIsMenuOpen(false)
//     }

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
//             <div className="container mx-auto px-4 py-4">
//                 <div className="flex items-center justify-between">
//                     <div className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-200">
//                         Kathiravan
//                     </div>

//                     {/* Desktop Navigation */}
//                     <nav className="hidden md:flex items-center space-x-8">
//                         {["about", "projects", "education", "skills", "contact"].map((item) => (
//                             <button
//                                 key={item}
//                                 onClick={() => scrollToSection(item)}
//                                 className="text-muted-foreground hover:text-foreground transition-all duration-200 capitalize font-medium hover:scale-105"
//                             >
//                                 {item}
//                             </button>
//                         ))}
//                         <ThemeToggle />
//                     </nav>

//                     {/* Mobile Menu Controls */}
//                     <div className="md:hidden flex items-center space-x-2">
//                         <ThemeToggle />
//                         <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                             {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Mobile Navigation */}
//                 {isMenuOpen && (
//                     <nav className="md:hidden mt-4 pb-4 border-t border-border/50 pt-4">
//                         <div className="flex flex-col space-y-4">
//                             {["about", "projects", "education", "skills", "contact"].map((item) => (
//                                 <button
//                                     key={item}
//                                     onClick={() => scrollToSection(item)}
//                                     className="text-left text-muted-foreground hover:text-foreground transition-colors capitalize font-medium"
//                                 >
//                                     {item}
//                                 </button>
//                             ))}
//                         </div>
//                     </nav>
//                 )}
//             </div>
//         </header>
//     )
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"
import dynamic from "next/dynamic"
import BotAnim from "@/public/animations/Bot-Robot.json" // replace with your lottie file

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [answer, setAnswer] = useState<string | null>(null)

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
        setIsMenuOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            e.preventDefault()
            setAnswer("blorpx wizzle trank! 🚀") // gibberish placeholder
            setQuery("")
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

                        {/* Bot toggle (mobile) */}
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

                {/* Chat area below header */}
                {/* {isChatOpen && (
                    <div className="mt-3 space-y-3"> */}
                {/* Input box */}
                {/* <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me something..."
                            className="w-full rounded-md px-3 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        /> */}
                {/* Answer box */}
                {/* {answer && (
                            <div className="p-3 rounded-md bg-muted text-sm text-foreground shadow-sm">
                                {answer}
                            </div>
                        )}
                    </div>
                )} */}
                {isChatOpen && (
                    <div className="mt-3 flex justify-end bg-transparent">
                        <div className="w-full max-w-sm space-y-3">
                            {/* Input box */}
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me something..."
                                className="w-full rounded-md px-3 py-2 text-sm bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {/* Answer box */}
                            {answer && (
                                <div className="p-3 rounded-md bg-muted text-sm text-foreground shadow-sm">
                                    {answer}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
