import { Brain, Code, Database, Globe, Wrench, Puzzle, MessageSquare, ClipboardList, RefreshCw, Crown, Users } from "lucide-react"
import { ReactNode } from "react"

export interface Skill {
    name: string
    level: number
    category: string
    description: string
    logo?: string
}

export interface SoftSkill {
    name: string
    icon: ReactNode
    description: string
}

export const skills: Skill[] = [
    {
        name: "Data Structures & Algorithms",
        level: 85,
        category: "Core CS Fundamentals",
        description: "Designing and analyzing efficient data structures and algorithms for solving complex problems in an optimized way.",
        logo: "logos/dsa.png",
    },
    {
        name: "Object Oriented Programming",
        level: 85,
        category: "Core CS Fundamentals",
        description: "Building maintainable systems using encapsulation, inheritance, polymorphism, and clean class design.",
        logo: "logos/objects.png",
    },
    {
        name: "Operating Systems",
        level: 65,
        category: "Core CS Fundamentals",
        description: "Understanding how the OS manages processes, memory, and I/O to write efficient, low-level friendly code.",
        logo: "logos/windows.png",
    },
    {
        name: "Databse Manipulation",
        level: 85,
        category: "Core CS Fundamentals",
        description: "Designing schemas and writing performant queries to reliably store, retrieve, and manipulate structured data.",
        logo: "logos/database-storage.png",
    },
    {
        name: "Computer Networking",
        level: 60,
        category: "Core CS Fundamentals",
        description: "Working with network protocols, sockets, and distributed systems concepts to build resilient communication layers.",
        logo: "logos/networking.png",
    },
    {
        name: "JavaScript",
        level: 70,
        category: "Programming Languages",
        description: "Writing modern, idiomatic JavaScript for interactive web applications and full‑stack development.",
        logo: "logos/js.png",
    },
    {
        name: "Python",
        level: 90,
        category: "Programming Languages",
        description: "Using Python for automation, scripting, backend services, and data or ML workflows.",
        logo: "logos/python.png",
    },
    {
        name: "Java",
        level: 90,
        category: "Programming Languages",
        description: "Building robust, object‑oriented backends and enterprise applications in Java.",
        logo: "logos/java.png",
    },
    {
        name: "TypeScript",
        level: 50,
        category: "Programming Languages",
        description: "Adding static types to JavaScript to catch bugs early and improve large‑scale codebases.",
        logo: "logos/typescript.png",
    },
    {
        name: "React",
        level: 70,
        category: "Web Technologies",
        description: "Creating interactive, component‑driven UIs with hooks, state management, and modern React patterns.",
        logo: "logos/science.png",
    },
    {
        name: "Next.js",
        level: 60,
        category: "Web Technologies",
        description: "Building production‑ready React apps with routing, data fetching, and server‑side rendering using Next.js.",
        logo: "logos/next.png",
    },
    {
        name: "Node.js",
        level: 70,
        category: "Web Technologies",
        description: "Developing scalable backend services and APIs using Node’s event‑driven, non‑blocking runtime.",
        logo: "logos/nodejs.png",
    },
    {
        name: "Express",
        level: 60,
        category: "Web Technologies",
        description: "Creating RESTful APIs and middleware pipelines with the minimalist Express framework.",
        logo: "logos/expressjs.svg",
    },
    {
        name: "HTML",
        level: 80,
        category: "Web Technologies",
        description: "Crafting semantic, accessible markup as the foundation for modern web interfaces.",
        logo: "logos/html.png",
    },
    {
        name: "CSS",
        level: 75,
        category: "Web Technologies",
        description: "Styling responsive, visually polished layouts with modern CSS features and methodologies.",
        logo: "logos/css-3.png",
    },
    {
        name: "Tailwind CSS",
        level: 80,
        category: "Web Technologies",
        description: "Rapidly building consistent, utility‑first designs using Tailwind’s composable classes.",
        logo: "logos/tailwind.png",
    },
    {
        name: "Framer Motion",
        level: 80,
        category: "Web Technologies",
        description: "Adding smooth, production‑grade animations and micro‑interactions to React components.",
        logo: "logos/framer.png",
    },
    {
        name: "MongoDB",
        level: 85,
        category: "Databases",
        description: "Designing flexible document schemas and queries for NoSQL workloads in MongoDB.",
        logo: "logos/mongodb.png",
    },
    {
        name: "MySQL",
        level: 75,
        category: "Databases",
        description: "Modeling relational data and writing performant SQL for transactional systems in MySQL.",
        logo: "logos/mysql.png",
    },
    {
        name: "SQL",
        level: 80,
        category: "Databases",
        description: "Querying, joining, and aggregating data across relational databases using SQL effectively.",
        logo: "logos/sql.png",
    },
    {
        name: "PostgreSQL",
        level: 80,
        category: "Databases",
        description: "Modeling and querying data in PostgreSQL for relational databases.",
        logo: "logos/postgres.png",
    },
    {
        name: "Git & GitHub",
        level: 85,
        category: "Tools & DevOps",
        description: "Using Git workflows and GitHub tooling for version control, collaboration, and CI integration.",
        logo: "logos/social.png",
    },
    {
        name: "Vercel",
        level: 75,
        category: "Tools & DevOps",
        description: "Deploying and monitoring modern frontend and serverless apps on Vercel’s platform.",
        logo: "logos/vercel.png",
    },
    {
        name: "Render",
        level: 85,
        category: "Tools & DevOps",
        description: "Hosting full‑stack applications and services with Render’s simple deployment model.",
        logo: "logos/render.png",
    },
    {
        name: "Docker",
        level: 70,
        category: "Tools & DevOps",
        description: "Containerizing applications to ensure consistent environments across development and production.",
        logo: "logos/docker.png",
    },
    {
        name: "AWS",
        level: 75,
        category: "Tools & DevOps",
        description: "Using core AWS services for compute, storage, and infrastructure needed by cloud applications.",
        logo: "logos/aws.png",
    },
    {
        name: "Datadog",
        level: 70,
        category: "Tools & DevOps",
        description: "Monitoring application performance and infrastructure metrics using Datadog dashboards and alerts.",
        logo: "logos/datadog.png",
    },
    {
        name: "TensorFlow",
        level: 70,
        category: "AI & Machine Learning",
        description: "Building and training neural networks and ML pipelines using TensorFlow.",
        logo: "logos/tensorflow.png",
    },
    {
        name: "PyTorch",
        level: 75,
        category: "AI & Machine Learning",
        description: "Experimenting with deep learning models using PyTorch’s flexible, pythonic API.",
        logo: "logos/pytorch.png",
    },
    {
        name: "LangChain",
        level: 85,
        category: "AI & Machine Learning",
        description: "Orchestrating LLM workflows, tools, and memory using the LangChain framework.",
        logo: "logos/math.png",
    },
    {
        name: "Gemini API",
        level: 80,
        category: "AI & Machine Learning",
        description: "Integrating Google’s Gemini models into applications for multimodal and text‑based AI features.",
        logo: "logos/key.png",
    },
    {
        name: "OpenAI API",
        level: 85,
        category: "AI & Machine Learning",
        description: "Building AI‑powered features using OpenAI models for chat, embeddings, and content generation.",
        logo: "logos/openai.png",
    },
    {
        name: "LLMs",
        level: 80,
        category: "AI & Machine Learning",
        description: "Designing prompts and systems that use large language models effectively and safely.",
        logo: "logos/llm.png",
    },
    {
        name: "MCP",
        level: 85,
        category: "AI & Machine Learning",
        description: "Building multi‑context processors for AI‑powered agents and workflows using MCP.",
        logo: "logos/mcp.png",
    },
];

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

export const allTechnicalSkills = skills

export const categories = [
    { name: "Core CS Fundamentals", icon: Code },
    { name: "Programming Languages", icon: Code },
    { name: "Web Technologies", icon: Globe },
    { name: "Databases", icon: Database },
    { name: "Tools & DevOps", icon: Wrench },
    { name: "AI & Machine Learning", icon: Brain },
];