import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

const projects = [
    {
        title: "E-Commerce Platform",
        description:
            "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
        image: "/modern-ecommerce-interface.png",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#",
        demo: "#",
    },
    {
        title: "Task Management App",
        description:
            "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        image: "/task-management-dashboard.png",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        github: "#",
        demo: "#",
    },
    {
        title: "Weather Analytics Dashboard",
        description:
            "A data visualization dashboard that displays weather patterns and analytics using real-time weather API data with interactive charts.",
        image: "/weather-analytics-dashboard-with-charts.jpg",
        technologies: ["Python", "Flask", "Chart.js", "OpenWeather API"],
        github: "#",
        demo: "#",
    },
    {
        title: "Mobile Fitness Tracker",
        description:
            "A React Native mobile app for tracking workouts, setting fitness goals, and monitoring progress with social sharing features.",
        image: "/mobile-fitness-app-interface.png",
        technologies: ["React Native", "Expo", "SQLite"],
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
