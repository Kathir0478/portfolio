"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Download, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { Boxes } from "@/components/ui/background-boxes"
import ScrollFade from "./ui/scroll-fade"


export function Hero() {
    const scrollToAbout = () => {
        const element = document.getElementById("about")
        if (element) element.scrollIntoView({ behavior: "smooth" })
    }

    const scrollToProjects = () => {
        const element = document.getElementById("projects")
        if (element) element.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <div
            className="h-screen relative w-full">
            <div className="absolute inset-0 z-0" >
                <Boxes />
            </div>
            <div className="relative z-10 pointer-events-none">

                <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ">

                    {/* Hero Content */}
                    <ScrollFade>
                        <div className="container mx-auto px-6 md:px-4 text-center relative">
                            <div className="max-w-5xl mx-auto space-y-6">

                                <motion.img
                                    initial={{ scale: 1.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    src="/profile.jpg"
                                    alt="Kathiravan"
                                    className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-accent shadow-2xl hover:scale-105 transition-transform duration-300"
                                />

                                {/* Name */}

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                                    className="text-5xl md:text-5xl font-bold mb-6 text-balance leading-tight"
                                >
                                    Hi, I'm{" "}
                                    <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                                        Kathiravan
                                    </span>
                                </motion.h1>

                                {/* Title */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                                    className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty font-light leading-relaxed"
                                >
                                    Aspiring Software Developer
                                </motion.p>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 2, ease: "easeOut" }}
                                    className="text-lg md:text-xl text-muted-foreground mb-12 max-w-5xl mx-auto text-pretty leading-relaxed"
                                >
                                    From developing full-stack applications to experimenting with large language models, I enjoy transforming ideas into real-world solutions.
                                    With hands-on experience in AI research, problem-solving, and innovative projects, my goal is to grow as a developer and create technology that makes a difference.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                                >
                                    <Button
                                        size="lg"
                                        onClick={scrollToProjects}
                                        className="pointer-events-auto z-50 bg-gradient-to-r from-gray-900 to-purple-700 hover:from-gray-800 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                                    >
                                        <Eye className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                                        View My Work
                                    </Button>
                                    <a href="/resume.pdf" download="Kathiravan-Resume.pdf">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="pointer-events-auto z-50 border-primary/40 dark:hover:border-primary/60 bg-background text-foreground dark:hover:bg-primary/10 transition-all duration-300 group shadow-sm"
                                        >
                                            <Download className="h-5 w-5 mr-2 group-hover:translate-y-1 transition-transform" />
                                            Download Resume
                                        </Button>
                                    </a>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 3.0 }}
                                    className="flex justify-center space-x-8 mb-12"
                                >
                                    <a
                                        href="https://github.com/Kathir0478"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pointer-events-auto z-50 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                                    >
                                        <Github className="h-7 w-7" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/kathiravan-b-980b00313/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pointer-events-auto z-50 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                                    >
                                        <Linkedin className="h-7 w-7" />
                                    </a>
                                    <a
                                        href="mailto:kathir200420@gmail.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pointer-events-auto z-50 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                                    >
                                        <Mail className="h-7 w-7" />
                                    </a>
                                </motion.div>

                                {/* Scroll Down */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 3.5 }}
                                    onClick={scrollToAbout}
                                    className="pointer-events-auto z-50 text-muted-foreground hover:text-primary transition-all duration-300 group"
                                >
                                    <ArrowDown className="h-8 w-8 mx-auto animate-bounce group-hover:translate-y-1" />
                                </motion.button>
                            </div>
                        </div>
                    </ScrollFade>
                </section>

            </div>
        </div>
    )
}
