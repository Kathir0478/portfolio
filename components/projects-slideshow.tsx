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
        title: "E-Commerce Platform",
        description:
            "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
        detailedDescription:
            "This comprehensive e-commerce platform showcases modern web development practices with a focus on user experience and scalability. Built using React for the frontend with Redux for state management, the application features a responsive design that works seamlessly across all devices. The backend is powered by Node.js and Express, with MongoDB as the database solution. Key features include secure user authentication with JWT tokens, integrated Stripe payment processing, real-time inventory management, order tracking, and a comprehensive admin dashboard for managing products, orders, and users. The platform also includes advanced search functionality, product filtering, user reviews and ratings, and email notifications for order updates.",
        image: "/modern-ecommerce-interface-with-shopping-cart.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express", "JWT"],
        github: "#",
        demo: "#",
        features: [
            "User Authentication",
            "Payment Processing",
            "Admin Dashboard",
            "Real-time Updates",
            "Responsive Design",
        ],
        challenges: "Implementing secure payment processing and managing complex state across multiple components",
        outcome: "Successfully deployed platform handling 1000+ daily transactions",
    },
    {
        id: 2,
        title: "Task Management App",
        description:
            "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        detailedDescription:
            "This collaborative task management application revolutionizes team productivity with its intuitive interface and powerful features. Built with Vue.js and Firebase, the app provides real-time synchronization across all team members, ensuring everyone stays updated on project progress. The drag-and-drop functionality, powered by Vue Draggable, allows users to easily organize tasks across different project boards. Firebase Firestore handles real-time data synchronization, while Firebase Authentication manages user access and permissions. The application features customizable project boards, task prioritization, deadline tracking, file attachments, comment threads, and detailed progress analytics. Team members can assign tasks, set due dates, add labels and categories, and receive notifications for important updates.",
        image: "/task-management-kanban.png",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Vue Draggable", "Chart.js"],
        github: "#",
        demo: "#",
        features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking", "File Attachments"],
        challenges: "Implementing real-time synchronization and complex drag-and-drop interactions",
        outcome: "Improved team productivity by 40% in beta testing with 5 teams",
    },
    {
        id: 3,
        title: "Weather Analytics Dashboard",
        description:
            "A data visualization dashboard that displays weather patterns and analytics using real-time weather API data with interactive charts.",
        detailedDescription:
            "This sophisticated weather analytics dashboard transforms raw meteorological data into actionable insights through beautiful visualizations and comprehensive analysis. Built with Python Flask for the backend and Chart.js for interactive visualizations, the application integrates with multiple weather APIs including OpenWeatherMap and WeatherAPI to provide comprehensive weather data. The dashboard features historical weather analysis, predictive modeling using machine learning algorithms, customizable location tracking, severe weather alerts, and detailed climate trend analysis. Users can compare weather patterns across different locations, export data for further analysis, and set up automated reports. The application also includes air quality monitoring, UV index tracking, and agricultural weather insights for farming applications.",
        image: "/weather-analytics-dashboard-with-charts-and-graphs.jpg",
        technologies: ["Python", "Flask", "Chart.js", "OpenWeather API", "Pandas", "NumPy", "SQLite"],
        github: "#",
        demo: "#",
        features: [
            "Real-time Data",
            "Interactive Charts",
            "Historical Analysis",
            "Weather Alerts",
            "Multi-location Tracking",
        ],
        challenges: "Processing large datasets efficiently and creating responsive data visualizations",
        outcome: "Deployed for 3 agricultural companies to optimize farming schedules",
    },
    {
        id: 4,
        title: "Mobile Fitness Tracker",
        description:
            "A React Native mobile app for tracking workouts, setting fitness goals, and monitoring progress with social sharing features.",
        detailedDescription:
            "This comprehensive fitness tracking application empowers users to achieve their health and wellness goals through detailed workout tracking, progress monitoring, and social engagement features. Built with React Native and Expo for cross-platform compatibility, the app utilizes SQLite for local data storage and synchronization. The application features customizable workout routines, exercise libraries with instructional videos, progress photos, body measurements tracking, and integration with wearable devices. Users can set SMART fitness goals, track nutrition intake, monitor sleep patterns, and share achievements with friends. The app includes workout timers, rest period notifications, exercise form tips, and detailed analytics showing progress over time. Social features allow users to join challenges, share workouts, and motivate each other through a built-in community platform.",
        image: "/mobile-fitness-app-interface-with-workout-tracking.jpg",
        technologies: ["React Native", "Expo", "SQLite", "Redux", "React Navigation", "Async Storage"],
        github: "#",
        demo: "#",
        features: ["Workout Tracking", "Goal Setting", "Progress Analytics", "Social Sharing", "Wearable Integration"],
        challenges: "Optimizing performance for real-time workout tracking and managing offline data sync",
        outcome: "Published on App Store with 4.8/5 rating and 10,000+ downloads",
    },
]

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
                                                        <Button
                                                            size="sm"
                                                            className="group/btn bg-primary text-primary-foreground hover:bg-primary/90"
                                                        >
                                                            <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                                                            Demo
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
                                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={nextSlide}
                                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
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
                                className="bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-lg"
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

                    {/* Project Grid for Quick Access */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {projects.map((project, index) => (
                            <Card
                                key={project.id}
                                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${index === currentIndex ? "ring-2 ring-primary" : ""
                                    }`}
                                onClick={() => goToSlide(index)}
                            >
                                <CardContent className="p-4">
                                    <img
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        className="w-full h-24 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className="font-semibold text-sm text-balance">{project.title}</h4>
                                </CardContent>
                            </Card>
                        ))}
                    </div> */}
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
                                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View Live Demo
                                                    </a>
                                                </Button>
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
