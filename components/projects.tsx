import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
    {
        title: "AI-Powered YouTube Filtering Extension",
        description:
            "A Chrome extension that filters and recommends YouTube videos based on user-defined prompts and session times. Uses NLP and machine learning to semantically analyze video metadata and ensure recommendation neutrality.",
        image: "/youtube-filter-extension.png",
        technologies: ["JavaScript", "NLP", "Machine Learning", "Chrome API"],
        github: "#",
        demo: "#",
    },
    {
        title: "Website Emotion and Vulnerability Analyzer",
        description:
            "An NLP-powered tool that analyzes website URLs to detect emotional tone, extract semantic context, and identify potential security risks. Helps users evaluate website trustworthiness before accessing it.",
        image: "/website-analyzer.png",
        technologies: ["Python", "NLP", "Heuristic Analysis", "Web Scraping"],
        github: "#",
        demo: "#",
    },
    {
        title: "Corpus-Based Enterprise Chatbot Generator",
        description:
            "A low-code platform for generating domain-specific chatbots for small businesses. Uses PDF ingestion, LangChain, FAISS vector stores, and OpenAI GPT-3.5-turbo to automate chatbot creation for customer support and internal queries.",
        image: "/chatbot-generator.png",
        technologies: ["Python", "LangChain", "OpenAI GPT-3.5", "FAISS"],
        github: "#",
        demo: "#",
    },
    {
        title: "Review Classification and AI Summarizer for E-Commerce",
        description:
            "A sentiment-driven system that filters and summarizes product reviews for e-commerce platforms. Uses Gemini Pro API for concise summaries and NLP pipelines for spam detection, emotion classification, and insight extraction.",
        image: "/review-summarizer.png",
        technologies: ["Python", "NLP", "Gemini Pro API", "Machine Learning"],
        github: "#",
        demo: "#",
    },
    {
        title: "Home Fitness Tracker and Recommendation Web App",
        description:
            "A personalized web app for tracking workouts, setting fitness goals, and monitoring daily activity. Built with full-stack technologies and integrated third-party APIs for dynamic fitness recommendations.",
        image: "/fitness-tracker.png",
        technologies: ["React", "Node.js", "Express.js", "MongoDB"],
        github: "#",
        demo: "#",
    },
    {
        title: "Entrepreneurial Recommendation Platform",
        description:
            "An ML-powered networking platform that matches entrepreneurs by analyzing business profiles, skill sets, and goals. Uses embedding generation, similarity scoring, and NLP semantic analysis for accurate recommendations.",
        image: "/entrepreneur-platform.png",
        technologies: ["Python", "Flask", "React", "Machine Learning", "NLP"],
        github: "#",
        demo: "#",
    },
    {
        title: "Recruitment Analytics Platform",
        description:
            "A data-driven recruitment system that automates candidate evaluation. Includes PDF parsing, text embedding, and Qdrant-based vector similarity search, with REST APIs for scoring candidates against job requirements.",
        image: "/recruitment-platform.png",
        technologies: ["Python", "Flask", "MongoDB", "Qdrant", "REST APIs"],
        github: "#",
        demo: "#",
    },
]

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Featured Projects</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="p-0">
                                    <img
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="mb-2 text-balance">{project.title}</CardTitle>
                                    <CardDescription className="mb-4 text-pretty">{project.description}</CardDescription>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Badge key={techIndex} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                        <Button size="sm" asChild>
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Demo
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
