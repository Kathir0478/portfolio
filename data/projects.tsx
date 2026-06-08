export interface Project {
    id: number
    title: string
    description: string
    detailedDescription: string,
    image: string,
    technologies: string[],
    github: string,
    features: string[],
    challenges: string,
    outcome: string
}


export const projects: Project[] = [
    {
        id: 1,
        title: "AI-Powered YouTube Filtering Extension",
        description:
            "A Chrome extension that filters and recommends YouTube videos based on user-defined prompts and session times.",
        detailedDescription:
            "This Chrome extension leverages NLP and machine learning to semantically analyze video metadata including titles, descriptions, captions, and comments. Users can define prompts and time-based sessions to filter or highlight videos while ensuring the recommendation system remains neutral. Real-time API handling, dynamic DOM injection, and session tracking enable seamless user experience. The extension ensures that unwanted content is temporarily blocked without affecting YouTube’s native algorithm.",
        image: "/projects/youtube-filtering.jpg",
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
        image: "/projects/web-analyzer.png",
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
        image: "/projects/corpus-chatbot.jpg",
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
        image: "/projects/ecom-commenter.jpg",
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
        image: "/projects/home-fitness.jpg",
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
        image: "/projects/entrepeur-site.jpg",
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
        image: "/projects/hiracle.jpg",
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
    {
        id: 8,
        title: "AI Cold Mailer",
        description:
            "An AI-powered cold emailing system for generating and sending personalized outreach emails at scale.",
        detailedDescription:
            "This project automates cold email generation by allowing users to define reusable prompts, provide context in a single place, and send personalized emails to multiple recipients efficiently. Running locally on the user's system, it integrates AI-powered content generation with email automation to reduce manual effort while maintaining personalization.",
        image: "/projects/cold-mailer.jpg",
        technologies: ["Python", "Streamlit", "FastAPI", "Groq API", "SMTP", "REST APIs", "Docker", "QDrant"],
        github: "https://github.com/Kathiravan0478/cold-mailer",
        features: [
            "AI-powered email generation",
            "Reusable prompt templates",
            "Bulk recipient support",
            "Local system execution",
            "Personalized cold outreach",
        ],
        challenges: "Balancing personalization, email generation speed, and simple local setup without relying on expensive infrastructure",
        outcome: "Reduced manual cold emailing effort and enabled scalable personalized outreach",
    }
];