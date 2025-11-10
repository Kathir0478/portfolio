import { Brain, Code, Database, Globe, Wrench, Puzzle, MessageSquare, ClipboardList, RefreshCw, Crown, Users } from "lucide-react"
import { ReactNode } from "react"

export interface Skill {
    name: string
    level: number
    category: string
    logo?: string
}

export interface SkillCategory {
    title: string
    icon: any // Lucide icon component type
    skills: Skill[]
}

export interface SoftSkill {
    name: string
    icon: ReactNode
    description: string
}

export const skillCategories: SkillCategory[] = [
    {
        title: "Core CS Fundamentals",
        icon: Code,
        skills: [
            {
                name: "Data Structures & Algorithms",
                level: 85,
                category: "Core CS Fundamentals",
                logo: "logos/dsa.png"
            },
            {
                name: "Object Oriented Programming",
                level: 85,
                category: "Core CS Fundamentals",
                logo: "logos/objects.png"
            },
            {
                name: "Operating Systems",
                level: 70,
                category: "Core CS Fundamentals",
                logo: "logos/windows.png"
            },
            {
                name: "Databse Manipulation",
                level: 85,
                category: "Core CS Fundamentals",
                logo: "logos/database-storage.png"
            },
            {
                name: "Computer Networking",
                level: 60,
                category: "Core CS Fundamentals",
                logo: "logos/networking.png"
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
                category: "Programming Languages",
                logo: "logos/js.png"
            },
            {
                name: "Python",
                level: 90,
                category: "Programming Languages",
                logo: "logos/python.png"
            },
            {
                name: "Java",
                level: 90,
                category: "Programming Languages",
                logo: "logos/java.png"
            },
            {
                name: "TypeScript",
                level: 70,
                category: "Programming Languages",
                logo: "logos/typescript.png"
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
                category: "Web Technologies",
                logo: "logos/science.png"
            },
            {
                name: "Next.js",
                level: 70,
                category: "Web Technologies",
                logo: "logos/next.png"
            },
            {
                name: "Node.js",
                level: 85,
                category: "Web Technologies",
                logo: "logos/nodejs.png"
            },
            {
                name: "Express",
                level: 80,
                category: "Web Technologies",
                logo: "logos/expressjs.svg"
            },
            {
                name: "HTML",
                level: 80,
                category: "Web Technologies",
                logo: "logos/html.png"
            },
            {
                name: "CSS",
                level: 75,
                category: "Web Technologies",
                logo: "logos/css-3.png"
            },
            {
                name: "Tailwind CSS",
                level: 80,
                category: "Web Technologies",
                logo: "logos/tailwind.png"
            },
            {
                name: "Framer Motion",
                level: 80,
                category: "Web Technologies",
                logo: "logos/framer.png"
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
                category: "Databases",
                logo: "logos/mongodb.png"
            },
            {
                name: "MySQL",
                level: 75,
                category: "Databases",
                logo: "logos/mysql.png"
            },
            {
                name: "SQL",
                level: 80,
                category: "Databases",
                logo: "logos/sql.png"
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
                category: "Tools & DevOps",
                logo: "logos/social.png"
            },
            {
                name: "Vercel",
                level: 75,
                category: "Tools & DevOps",
                logo: "logos/vercel.png"
            },
            {
                name: "Render",
                level: 85,
                category: "Tools & DevOps",
                logo: "logos/render.png"
            },
            {
                name: "Docker",
                level: 75,
                category: "Tools & DevOps",
                logo: "logos/docker.png"
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
                category: "AI & Machine Learning",
                logo: "logos/tensorflow.png"
            },
            {
                name: "PyTorch",
                level: 75,
                category: "AI & Machine Learning",
                logo: "logos/pytorch.png"
            },
            {
                name: "LangChain",
                level: 85,
                category: "AI & Machine Learning",
                logo: "logos/math.png"
            },
            {
                name: "Gemini API",
                level: 80,
                category: "AI & Machine Learning",
                logo: "logos/key.png"
            },
            {
                name: "OpenAI API",
                level: 85,
                category: "AI & Machine Learning",
                logo: "logos/openai.png"
            },
            {
                name: "LLMs",
                level: 80,
                category: "AI & Machine Learning",
                logo: "logos/llm.png"
            },
        ],
    },
]

export const softSkills: SoftSkill[] = [
    {
        name: "Problem Solving",
        icon: <Puzzle className="text-blue-500" />,
        description: "Breaking down complex problems into manageable solutions"
    },
    {
        name: "Team Collaboration",
        icon: <Users className="text-blue-600" />,
        description: "Working effectively in diverse, cross-functional teams"
    },
    {
        name: "Communication",
        icon: <MessageSquare className="text-indigo-600" />,
        description: "Clear technical communication with stakeholders"
    },
    {
        name: "Project Management",
        icon: <ClipboardList className="text-indigo-700" />,
        description: "Agile methodologies, sprint planning, task prioritization"
    },
    {
        name: "Critical Thinking",
        icon: <Brain className="text-violet-700" />,
        description: "Analytical approach to decision-making and problem-solving"
    },
    {
        name: "Adaptability",
        icon: <RefreshCw className="text-violet-600" />,
        description: "Quick learning and adaptation to new technologies"
    },
    {
        name: "Leadership",
        icon: <Crown className="text-purple-600" />,
        description: "Mentoring junior developers, leading technical initiatives"
    }
]

export const allTechnicalSkills = skillCategories.flatMap((category) => category.skills)