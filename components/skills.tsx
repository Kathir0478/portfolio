"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Search, Filter, Star, Code, Database, Globe, Wrench, Brain, Users } from "lucide-react"

const skillCategories = [
    {
        title: "Programming Languages",
        icon: Code,
        skills: [
            {
                name: "JavaScript",
                level: 90,
                category: "Programming Languages",
                description: "Modern ES6+, async/await, DOM manipulation",
            },
            {
                name: "Python",
                level: 85,
                category: "Programming Languages",
                description: "Data analysis, web scraping, automation",
            },
            {
                name: "Java",
                level: 80,
                category: "Programming Languages",
                description: "OOP, Spring Boot, enterprise applications",
            },
            {
                name: "TypeScript",
                level: 75,
                category: "Programming Languages",
                description: "Type-safe JavaScript, interfaces, generics",
            },
            {
                name: "C++",
                level: 70,
                category: "Programming Languages",
                description: "System programming, algorithms, data structures",
            },
            {
                name: "Go",
                level: 65,
                category: "Programming Languages",
                description: "Concurrent programming, microservices",
            },
            { name: "Rust", level: 60, category: "Programming Languages", description: "Memory safety, systems programming" },
            { name: "PHP", level: 70, category: "Programming Languages", description: "Web development, Laravel framework" },
        ],
    },
    {
        title: "Web Technologies",
        icon: Globe,
        skills: [
            {
                name: "React",
                level: 90,
                category: "Web Technologies",
                description: "Hooks, Context API, component architecture",
            },
            { name: "Node.js", level: 85, category: "Web Technologies", description: "Express.js, RESTful APIs, middleware" },
            {
                name: "HTML/CSS",
                level: 95,
                category: "Web Technologies",
                description: "Semantic HTML, CSS Grid, Flexbox, animations",
            },
            { name: "Next.js", level: 80, category: "Web Technologies", description: "SSR, SSG, API routes, App Router" },
            {
                name: "Vue.js",
                level: 75,
                category: "Web Technologies",
                description: "Composition API, Vuex, component lifecycle",
            },
            {
                name: "Angular",
                level: 70,
                category: "Web Technologies",
                description: "TypeScript, RxJS, dependency injection",
            },
            { name: "Svelte", level: 65, category: "Web Technologies", description: "Reactive programming, SvelteKit" },
            {
                name: "Tailwind CSS",
                level: 90,
                category: "Web Technologies",
                description: "Utility-first CSS, responsive design",
            },
            {
                name: "SASS/SCSS",
                level: 80,
                category: "Web Technologies",
                description: "CSS preprocessing, mixins, variables",
            },
            { name: "GraphQL", level: 70, category: "Web Technologies", description: "Query language, Apollo Client/Server" },
        ],
    },
    {
        title: "Databases",
        icon: Database,
        skills: [
            { name: "MongoDB", level: 80, category: "Databases", description: "NoSQL, aggregation pipelines, indexing" },
            {
                name: "PostgreSQL",
                level: 75,
                category: "Databases",
                description: "Relational database, complex queries, optimization",
            },
            { name: "MySQL", level: 75, category: "Databases", description: "Database design, stored procedures, triggers" },
            { name: "Redis", level: 70, category: "Databases", description: "Caching, session storage, pub/sub" },
            {
                name: "Firebase",
                level: 80,
                category: "Databases",
                description: "Real-time database, authentication, hosting",
            },
            {
                name: "Supabase",
                level: 75,
                category: "Databases",
                description: "PostgreSQL backend, real-time subscriptions",
            },
        ],
    },
    {
        title: "Tools & DevOps",
        icon: Wrench,
        skills: [
            {
                name: "Git",
                level: 90,
                category: "Tools & DevOps",
                description: "Version control, branching strategies, collaboration",
            },
            {
                name: "Docker",
                level: 70,
                category: "Tools & DevOps",
                description: "Containerization, Docker Compose, multi-stage builds",
            },
            { name: "AWS", level: 65, category: "Tools & DevOps", description: "EC2, S3, Lambda, CloudFormation" },
            {
                name: "Vercel",
                level: 85,
                category: "Tools & DevOps",
                description: "Deployment, serverless functions, edge computing",
            },
            {
                name: "GitHub Actions",
                level: 75,
                category: "Tools & DevOps",
                description: "CI/CD pipelines, automated testing, deployment",
            },
            { name: "Webpack", level: 70, category: "Tools & DevOps", description: "Module bundling, optimization, plugins" },
            { name: "Vite", level: 80, category: "Tools & DevOps", description: "Fast build tool, HMR, modern bundling" },
            { name: "Jest", level: 75, category: "Tools & DevOps", description: "Unit testing, mocking, test coverage" },
            {
                name: "Cypress",
                level: 70,
                category: "Tools & DevOps",
                description: "End-to-end testing, integration testing",
            },
        ],
    },
    {
        title: "AI & Machine Learning",
        icon: Brain,
        skills: [
            {
                name: "TensorFlow",
                level: 60,
                category: "AI & Machine Learning",
                description: "Neural networks, deep learning models",
            },
            { name: "PyTorch", level: 55, category: "AI & Machine Learning", description: "Research-focused ML framework" },
            {
                name: "Scikit-learn",
                level: 70,
                category: "AI & Machine Learning",
                description: "Classical ML algorithms, data preprocessing",
            },
            {
                name: "Pandas",
                level: 80,
                category: "AI & Machine Learning",
                description: "Data manipulation, analysis, cleaning",
            },
            {
                name: "NumPy",
                level: 75,
                category: "AI & Machine Learning",
                description: "Numerical computing, array operations",
            },
            {
                name: "OpenAI API",
                level: 75,
                category: "AI & Machine Learning",
                description: "GPT integration, prompt engineering",
            },
        ],
    },
]

const softSkills = [
    { name: "Problem Solving", icon: "🧩", description: "Breaking down complex problems into manageable solutions" },
    { name: "Team Collaboration", icon: "🤝", description: "Working effectively in diverse, cross-functional teams" },
    { name: "Communication", icon: "💬", description: "Clear technical communication with stakeholders" },
    { name: "Project Management", icon: "📋", description: "Agile methodologies, sprint planning, task prioritization" },
    { name: "Critical Thinking", icon: "🤔", description: "Analytical approach to decision-making and problem-solving" },
    { name: "Adaptability", icon: "🔄", description: "Quick learning and adaptation to new technologies" },
    { name: "Leadership", icon: "👑", description: "Mentoring junior developers, leading technical initiatives" },
    { name: "Time Management", icon: "⏰", description: "Efficient task prioritization and deadline management" },
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

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSkills.map((skill, index) => (
                    <div
                        key={`${skill.name}-${index}`}
                        className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
                       border-2 ${getSkillBorder(skill.level)} rounded-xl overflow-hidden`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getSkillColor(skill.level)} opacity-10`} />

                        {/* Content */}
                        <div className="relative p-4 bg-background/80 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm truncate">{skill.name}</h4>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < Math.floor(skill.level / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-muted rounded-full h-2 mb-2">
                                <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-500`}
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>{skill.category}</span>
                                <span className="font-medium">{skill.level}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Skill Detail Panel
            {selectedSkill && (
                <Card className="border-primary/50 bg-gradient-to-r from-background to-muted/30">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                {selectedSkill.name}
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(selectedSkill.level / 20) ? "text-yellow-400 fill-current" : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedSkill(null)}>
                                ✕
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Proficiency Level</span>
                                <Badge variant="outline">{selectedSkill.level}%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Category</span>
                                <Badge>{selectedSkill.category}</Badge>
                            </div>
                            <p className="text-sm leading-relaxed">{selectedSkill.description}</p>
                        </div>
                    </CardContent>
                </Card>
            )} */}

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
