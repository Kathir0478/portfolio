"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
    {
        id: 1,
        title: "AI-Powered YouTube Filtering Extension",
        description:
            "A Chrome extension that filters and recommends YouTube videos based on user-defined prompts and session times.",
        detailedDescription:
            "This Chrome extension leverages NLP and machine learning to semantically analyze video metadata including titles, descriptions, captions, and comments. Users can define prompts and time-based sessions to filter or highlight videos while ensuring the recommendation system remains neutral. Real-time API handling, dynamic DOM injection, and session tracking enable seamless user experience. The extension ensures that unwanted content is temporarily blocked without affecting YouTube’s native algorithm.",
        image: "/youtube-filtering.jpg",
        technologies: ["JavaScript", "Tailwind CSS", "NLP", "Machine Learning", "Chrome Extension", "Langchain"],
        github: "https://github.com/Kathir0478/extension",
        features: [
            "User-defined video filtering",
            "Session-based recommendations",
            "NLP-based semantic analysis",
            "Dynamic UI injection",
            "Neutral recommendation enforcement",
            "Gamified and self focussing Sessions"
        ],
        challenges: "Ensuring real-time DOM updates and filtering without disrupting YouTube's native recommendation system",
        outcome: "Improved user control over video consumption and enhanced personalized experience",
    },
    {
        id: 2,
        title: "Website Emotion and Vulnerability Analyzer",
        description:
            "An NLP-powered tool that analyzes websites to detect emotional tone, semantic context, and potential security risks.",
        detailedDescription:
            "This tool processes website URLs to evaluate content for emotional tone, semantic meaning, and potential vulnerabilities. It acts as a pre-access evaluator to help users assess website trustworthiness. Using NLP pipelines and heuristic-based engines, the system predicts emotions, detects risks, and provides actionable insights. The solution enhances online safety and user awareness before interacting with unfamiliar sites.",
        image: "/web-analyzer.png",
        technologies: ["Python", "NLP", "Heuristic Analysis", "Web Scraping"],
        github: "#",
        features: [
            "Emotion analysis",
            "Semantic context extraction",
            "Vulnerability detection",
            "Trustworthiness scoring",
            "Pre-access evaluation",
        ],
        challenges: "Designing accurate heuristics and NLP pipelines to analyze diverse web content reliably",
        outcome: "Enabled safer browsing and informed decision-making for users",
    },
    {
        id: 3,
        title: "Corpus-Based Enterprise Chatbot Generator",
        description:
            "A low-code platform that generates domain-specific chatbots for small businesses using AI and NLP.",
        detailedDescription:
            "This platform simplifies chatbot creation for small businesses by ingesting PDFs and building knowledge bases. It leverages LangChain, FAISS vector stores, and OpenAI GPT-3.5-turbo for generating responsive chatbots capable of handling customer support and internal queries. Users can create chatbots without coding knowledge, reducing setup time and improving efficiency. The system supports dynamic knowledge updates and domain-specific customization.",
        image: "/corpus-chatbot.jpg",
        technologies: ["Python", "LangChain", "OpenAI GPT-3.5", "FAISS", "NLP", "Fast API", "Node Js", "React", "Tailwind CSS", "Mongo DB", "Express JS"],
        github: "https://github.com/Kathir0478/corpus-chatbot",
        features: [
            "PDF ingestion",
            "Knowledge base creation",
            "Domain-specific chatbot generation",
            "Low-code interface",
            "Automatic updates",
        ],
        challenges: "Ensuring accurate response generation and managing knowledge base embeddings efficiently",
        outcome: "Reduced setup complexity for non-technical users and improved internal support workflows",
    },
    {
        id: 4,
        title: "Review Classification and AI Summarizer for E-Commerce",
        description:
            "A sentiment-driven system to filter, classify, and summarize product reviews for e-commerce platforms.",
        detailedDescription:
            "This project processes user reviews using NLP pipelines to detect spam, classify emotion and polarity, and generate concise summaries. The integration of Gemini Pro API allows for accurate summarization of product feedback. The system enhances review browsing efficiency, helping customers and businesses quickly grasp insights from large volumes of reviews. The solution also provides analytics for product improvement and sentiment tracking.",
        image: "/ecom-commenter.jpg",
        technologies: ["Python", "NLP", "Gemini Pro API", "Machine Learning"],
        github: "https://github.com/Kathir0478/walmart",
        features: [
            "Sentiment analysis",
            "Spam detection",
            "Review summarization",
            "Emotion & polarity classification",
            "Insight extraction",
        ],
        challenges: "Processing large volumes of reviews and generating accurate, concise summaries",
        outcome: "Enhanced review readability and provided actionable insights for businesses",
    },
    {
        id: 5,
        title: "Home Fitness Tracker and Recommendation Web App",
        description:
            "A personalized web app to track workouts, monitor progress, and receive fitness recommendations.",
        detailedDescription:
            "This full-stack platform allows users to log workouts, set goals, and monitor daily activity. Built with React, Node.js, Express, and MongoDB, it integrates third-party APIs for exercise datasets and instructional videos. Users receive personalized fitness plans based on performance analytics. Features include authentication, progress tracking, performance analytics, and adaptive recommendations.",
        image: "/home-fitness.jpg",
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "APIs", "Langchain", "FAISS", "Gemini API", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/Kathir0478/homefitness",
        features: [
            "Workout logging",
            "Personalized recommendations",
            "Progress tracking",
            "Performance analytics",
            "Integration with exercise APIs",
        ],
        challenges: "Designing adaptive recommendation algorithms and integrating multiple APIs",
        outcome: "Enabled users to achieve fitness goals with personalized guidance",
    },
    {
        id: 6,
        title: "Entrepreneurial Recommendation Platform",
        description:
            "An ML-powered platform that matches entrepreneurs based on profiles, skills, and goals.",
        detailedDescription:
            "This platform uses embedding generation, similarity scoring, and NLP semantic analysis to recommend collaborations between entrepreneurs. The system includes a full-stack React + Node.js interface with Flask APIs for ML inference. Users receive personalized recommendations for networking and business partnerships based on skill sets and goals.",
        image: "/entrepeur-site.jpg",
        technologies: ["Python", "Flask", "Machine Learning", "Node Js", "React", "Tailwind CSS", "Mongo DB", "Express JS"],
        github: "https://github.com/Kathir0478/smart-networking-engine",
        features: [
            "Profile embedding generation",
            "Semantic similarity scoring",
            "Collaboration recommendations",
            "Full-stack interface",
            "Real-time ML inference",
        ],
        challenges: "Balancing accuracy of recommendations with scalability and real-time performance",
        outcome: "Improved networking efficiency and meaningful business collaborations",
    },
    {
        id: 7,
        title: "Recruitment Analytics Platform",
        description:
            "A data-driven recruitment system automating candidate evaluation using AI and vector search.",
        detailedDescription:
            "This system parses candidate resumes, generates embeddings, and uses Qdrant-based vector similarity search to score candidates against job requirements. Built with Python, Flask, and MongoDB, the platform exposes REST APIs for automated candidate evaluation and shortlisting. It enhances fairness, scalability, and efficiency in recruitment processes.",
        image: "/hiracle.jpg",
        technologies: ["Python", "Flask", "Qdrant", "REST APIs", "Node Js", "React", "Tailwind CSS", "Mongo DB", "Express JS"],
        github: "https://github.com/Kathir0478/hiracle",
        features: [
            "Resume parsing",
            "Vector similarity scoring",
            "Automated candidate evaluation",
            "REST API endpoints",
            "Scalable deployment",
        ],
        challenges: "Ensuring accurate matching and efficient vector search across large candidate datasets",
        outcome: "Streamlined recruitment process and improved shortlisting efficiency",
    },
];


export function ProjectsSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, [])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    }, [])

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index)
    }, [])

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying || selectedProject) return

        const interval = setInterval(nextSlide, 5000) // 5 seconds
        return () => clearInterval(interval)
    }, [isPlaying, selectedProject, nextSlide])

    const handleProjectClick = (project: (typeof projects)[0]) => {
        setIsPlaying(false)
        setSelectedProject(project)
    }

    const closeDetailView = () => {
        setSelectedProject(null)
        setIsPlaying(true)
    }

    return (
        <section id="projects" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Explore my latest work and discover the technologies and solutions I've built
                        </p>
                    </div>

                    {/* Slideshow Container */}
                    <div className="relative mb-8">
                        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -300 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Card
                                        className="h-full cursor-pointer group border-0 bg-gradient-to-br from-card via-card/95 to-muted/30 hover:shadow-2xl transition-all duration-500"
                                        onClick={() => handleProjectClick(projects[currentIndex])}
                                    >
                                        <div className="grid md:grid-cols-2 h-full">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={projects[currentIndex].image || "/placeholder.svg"}
                                                    alt={projects[currentIndex].title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            </div>
                                            <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                                                        {projects[currentIndex].title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
                                                        {projects[currentIndex].description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {projects[currentIndex].technologies.slice(0, 4).map((tech, techIndex) => (
                                                            <Badge
                                                                key={techIndex}
                                                                variant="secondary"
                                                                className="bg-primary/10 text-primary border-primary/20"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                        {projects[currentIndex].technologies.length > 4 && (
                                                            <Badge variant="outline" className="text-muted-foreground">
                                                                +{projects[currentIndex].technologies.length - 4} more
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="group/btn bg-background text-foreground border-border hover:bg-muted"
                                                        >
                                                            <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                                                            Code
                                                        </Button>
                                                    </div>
                                                </motion.div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={prevSlide}
                                className="bg-black/80 dark:bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
                            >
                                <ChevronLeft className="h-5 w-5 " />
                            </Button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={nextSlide}
                                className="bg-black/80 dark:bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg "
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Play/Pause Control */}
                        <div className="absolute bottom-4 left-4 z-10">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="bg-black/80 dark:bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
                            >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center space-x-2 mb-8">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-primary scale-125"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>

            {/* Detailed Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-lg flex items-center justify-center p-4"
                        onClick={closeDetailView}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={closeDetailView}
                                    className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm"
                                >
                                    <X className="h-5 w-5" />
                                </Button>

                                <img
                                    src={selectedProject.image || "/placeholder.svg"}
                                    alt={selectedProject.title}
                                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                                />

                                <div className="p-8">
                                    <h3 className="text-3xl font-bold mb-4 text-balance">{selectedProject.title}</h3>

                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2">
                                            <h4 className="text-lg font-semibold mb-3">Project Overview</h4>
                                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                                {selectedProject.detailedDescription}
                                            </p>

                                            <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                                            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-1">
                                                {selectedProject.features.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>

                                            <h4 className="text-lg font-semibold mb-3">Challenges & Solutions</h4>
                                            <p className="text-muted-foreground mb-4">{selectedProject.challenges}</p>

                                            <h4 className="text-lg font-semibold mb-3">Outcome</h4>
                                            <p className="text-muted-foreground mb-6">{selectedProject.outcome}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {selectedProject.technologies.map((tech, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="bg-primary/10 text-primary border-primary/20"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="space-y-3">
                                                <Button
                                                    variant="outline"
                                                    className="w-full bg-background text-foreground border-border hover:bg-muted"
                                                    asChild
                                                >
                                                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                                        <Github className="h-4 w-4 mr-2" />
                                                        View Source Code
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
