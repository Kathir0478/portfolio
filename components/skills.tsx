"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Puzzle, MessageSquare, ClipboardList, RefreshCw, Crown, Search, Filter, Star, Code, Database, Globe, Wrench, Brain, Users } from "lucide-react"
// import {} from "lucide-react"

const skillCategories = [
    {
        title: "Core CS Fundamentals",
        icon: Code,
        skills: [
            {
                name: "Data Structures & Algorithms",
                level: 85,
                category: "Core CS Fundamentals"
            },
            {
                name: "Object Oriented Programming",
                level: 85,
                category: "Core CS Fundamentals"
            },
            {
                name: "Operating Systems",
                level: 70,
                category: "Core CS Fundamentals"
            },
            {
                name: "Databse Manipulation",
                level: 85,
                category: "Core CS Fundamentals"
            },
            {
                name: "Computer Networking",
                level: 60,
                category: "Core CS Fundamentals"
            }
        ],
    },
    {
        title: "Programming Languages",
        icon: Code,
        skills: [
            {
                name: "JavaScript",
                level: 80,
                category: "Programming Languages"
            },
            {
                name: "Python",
                level: 90,
                category: "Programming Languages"
            },
            {
                name: "Java",
                level: 90,
                category: "Programming Languages"
            },
            {
                name: "TypeScript",
                level: 70,
                category: "Programming Languages"
            }
        ],
    },
    {
        title: "Web Technologies",
        icon: Globe,
        skills: [
            {
                name: "React",
                level: 75,
                category: "Web Technologies"
            },
            {
                name: "Next.js",
                level: 70,
                category: "Web Technologies"
            },
            {
                name: "Node.js",
                level: 85,
                category: "Web Technologies",
                description: "Express.js, RESTful APIs, middleware",
            },
            {
                name: "Express",
                level: 80,
                category: "Web Technologies",
                description: "API development, middleware, routing",
            },
            {
                name: "HTML/CSS",
                level: 80,
                category: "Web Technologies"
            },
            {
                name: "Tailwind CSS",
                level: 80,
                category: "Web Technologies"
            },
            {
                name: "Framer Motion",
                level: 80,
                category: "Web Technologies"
            },
        ],
    },
    {
        title: "Databases",
        icon: Database,
        skills: [
            {
                name: "MongoDB",
                level: 80,
                category: "Databases"
            },
            {
                name: "MySQL",
                level: 75,
                category: "Databases"
            },
            {
                name: "SQL",
                level: 80,
                category: "Databases"
            },
        ],
    },
    {
        title: "Tools & DevOps",
        icon: Wrench,
        skills: [
            {
                name: "Git & GitHub",
                level: 90,
                category: "Tools & DevOps"
            },
            {
                name: "Vercel",
                level: 75,
                category: "Tools & DevOps"
            },
            {
                name: "Render",
                level: 85,
                category: "Tools & DevOps"
            },
            {
                name: "Docker",
                level: 75,
                category: "Tools & DevOps"
            },
        ],
    },
    {
        title: "AI & Machine Learning",
        icon: Brain,
        skills: [
            {
                name: "TensorFlow",
                level: 70,
                category: "AI & Machine Learning"
            },
            {
                name: "PyTorch",
                level: 75,
                category: "AI & Machine Learning"
            },
            {
                name: "LangChain",
                level: 85,
                category: "AI & Machine Learning"
            },
            {
                name: "Gemini API",
                level: 80,
                category: "AI & Machine Learning"
            },
            {
                name: "OpenAI API",
                level: 85,
                category: "AI & Machine Learning"
            },
            {
                name: "LLMs",
                level: 80,
                category: "AI & Machine Learning"
            },
        ],
    },
]

const softSkills = [
    { name: "Problem Solving", icon: <Puzzle className="text-blue-500" />, description: "Breaking down complex problems into manageable solutions" },
    { name: "Team Collaboration", icon: <Users className="text-blue-600" />, description: "Working effectively in diverse, cross-functional teams" },
    { name: "Communication", icon: <MessageSquare className="text-indigo-600" />, description: "Clear technical communication with stakeholders" },
    { name: "Project Management", icon: <ClipboardList className="text-indigo-700" />, description: "Agile methodologies, sprint planning, task prioritization" },
    { name: "Critical Thinking", icon: <Brain className="text-violet-700" />, description: "Analytical approach to decision-making and problem-solving" },
    { name: "Adaptability", icon: <RefreshCw className="text-violet-600" />, description: "Quick learning and adaptation to new technologies" },
    { name: "Leadership", icon: <Crown className="text-purple-600" />, description: "Mentoring junior developers, leading technical initiatives" }
]

const allTechnicalSkills = skillCategories.flatMap((category) => category.skills)

function InteractiveSkillsGrid() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [sortBy, setSortBy] = useState<"name" | "level">("level")

    const filteredSkills = allTechnicalSkills
        .filter((skill) => {
            const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortBy === "level") return b.level - a.level
            return a.name.localeCompare(b.name)
        })

    const getSkillColor = (level: number) => {
        if (level >= 90) return "from-emerald-500 to-green-600"
        if (level >= 80) return "from-blue-500 to-cyan-600"
        if (level >= 70) return "from-purple-500 to-violet-600"
        if (level >= 60) return "from-orange-500 to-amber-600"
        return "from-gray-500 to-slate-600"
    }

    const getSkillBorder = (level: number) => {
        if (level >= 90) return "border-emerald-400"
        if (level >= 80) return "border-blue-400"
        if (level >= 70) return "border-purple-400"
        if (level >= 60) return "border-orange-400"
        return "border-gray-400"
    }

    return (
        <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border rounded-md bg-background text-foreground"
                    >
                        <option value="All">All Categories</option>
                        {skillCategories.map((category) => (
                            <option key={category.title} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>

                    <Button variant="outline" size="sm" onClick={() => setSortBy(sortBy === "level" ? "name" : "level")}>
                        Sort by {sortBy === "level" ? "Name" : "Level"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                    <div
                        key={`${skill.name}-${index}`}
                        className={`relative group cursor-pointer transition-all duration-500 
                 border ${getSkillBorder(skill.level)} rounded-2xl overflow-hidden h-full
                 bg-gradient-to-br ${getSkillColor(skill.level)}/10 backdrop-blur-md
                 shadow-md hover:shadow-xl hover:scale-[1.04]
                 dark:from-gray-900 dark:to-black from-white to-gray-100`}
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                      bg-gradient-to-br from-white/30 via-transparent to-white/10 
                      dark:from-white/10 dark:via-transparent dark:to-white/5 blur-2xl" />

                        {/* Card Content */}
                        <div className="relative p-5 flex flex-col justify-between h-full z-10">
                            {/* Title + Stars */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-base truncate 
                           bg-clip-text text-transparent 
                           bg-gradient-to-r from-gray-900 to-gray-600 
                           dark:from-white dark:to-gray-300">
                                        {skill.name}
                                    </h4>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 transition-colors duration-300 ${i < Math.floor(skill.level / 20)
                                                    ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                                                    : "text-gray-300 dark:text-gray-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mb-3 overflow-hidden">
                                    <div
                                        className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(
                                            skill.level
                                        )} shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-700`}
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex justify-between items-center text-xs font-medium">
                                <span className="uppercase tracking-wide text-gray-600 dark:text-gray-400">
                                    {skill.category}
                                </span>
                                <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-lg shadow-inner 
                           text-gray-700 dark:text-gray-200">
                                    {skill.level}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Legend */}
            <div className="flex flex-wrap gap-4 justify-center text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-500 to-green-600"></div>
                    <span className="text-muted-foreground">Expert (90%+)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                    <span className="text-muted-foreground">Advanced (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-violet-600"></div>
                    <span className="text-muted-foreground">Intermediate (70%+)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-amber-600"></div>
                    <span className="text-muted-foreground">Learning (60%+)</span>
                </div>
            </div>
        </div>
    )
}

export function Skills() {
    return (
        <section id="skills" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Skills & Expertise</h2>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Technical Skills - Takes up 2 columns */}
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                <Code className="h-6 w-6" />
                                Technical Skills
                            </h3>
                            <InteractiveSkillsGrid />
                        </div>

                        {/* Soft Skills & Additional Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                                    <Users className="h-6 w-6" />
                                    Soft Skills
                                </h3>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            {softSkills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="text-xl">{skill.icon}</span>
                                                    <div>
                                                        <h4 className="font-medium text-sm">{skill.name}</h4>
                                                        <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Languages */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Languages</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span>Tamil</span>
                                            <Badge>Native</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>English</span>
                                            <Badge variant="outline">Intermediate</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

