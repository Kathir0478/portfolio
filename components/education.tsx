"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar, Briefcase, Car } from "lucide-react"
import { CardHoverWrapper } from "./ui/card-hover-wrapper"
import ScrollFadeInAndOut from "./ui/scroll-fade-in-out"
import ScrollFromLeft from "./ui/scroll-from-left"
import ScrollFromRight from "./ui/scroll-from-right"

const education = [
    {
        degree: "Higher Secondary Grade",
        school: "Montfort Matriculation Higher Secondary School",
        period: "2008 - 2022",
        gpa: "87%",
        description:
            "Focused on physics and mathematics, building a strong foundation in scientific reasoning and analytical thinking. Actively engaged in experiments, lab work, and problem-solving activities to strengthen conceptual understanding."
    },
    {
        degree: "B.Tech Artificial Intelligence and Data Science",
        school: "St. Joseph's Institurte of Technology",
        period: "2022 - 2026",
        gpa: "8.65/10.0",
        description:
            "Gained in-depth knowledge of AI, machine learning, deep learning. Developed practical skills through hands-on projects and internships, specializing in full-stack development and data-driven solutions."
    },
]

const certifications = [
    "CISCO Python Certified",
    "Google Certified Problem solving skills",
    "Coursera Machine Learning Certificate"
]

const experience = [
    {
        role: "AI Research Intern",
        company: "Blubridge",
        period: "28.05.2025 - 29.06.2025", // 👉 you can edit dates later
        description:
            "Worked on implementing an LLM like GPT from scratch. Gained hands-on experience with distributed training (DDP, UDA) and model architecture design. Improved my ability to interpret and apply research papers into working solutions.",
        highlights: [
            "Implemented GPT-like architecture from scratch",
            "Worked with Distributed Data Parallel (DDP)",
            "Enhanced research-to-code documentation workflow",
            "Hands on experience with writing custom pytorch functions",
            "Creating custom learning functions to the model"
        ]
    }
]

export function Education() {
    return (
        <section id="education" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollFadeInAndOut>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Education & Certifications</h2>
                    </ScrollFadeInAndOut>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Education */}
                        <ScrollFromLeft>
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                    <GraduationCap className="h-6 w-6 mr-2 text-accent" />
                                    Education
                                </h3>

                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <CardHoverWrapper key={index}>
                                            <Card
                                                key={index}
                                                className="py-6"
                                            >
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <CardTitle className="text-lg text-balance">{edu.degree}</CardTitle>
                                                            <CardDescription className="text-accent font-medium">{edu.school}</CardDescription>
                                                        </div>
                                                        <div className="text-right text-sm text-muted-foreground">
                                                            <div className="flex items-center">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                {edu.period}
                                                            </div>
                                                            <div className="font-medium">GPA: {edu.gpa}</div>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-muted-foreground mb-4 text-pretty">{edu.description}</p>
                                                </CardContent>
                                            </Card>
                                        </CardHoverWrapper>
                                    ))}
                                </div>
                            </div>
                        </ScrollFromLeft>
                        <ScrollFromRight>
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                    <Award className="h-6 w-6 mr-2 text-accent" />
                                    Certifications
                                </h3>

                                <CardHoverWrapper>
                                    <Card className="py-6">
                                        <CardContent className="p-6">
                                            <div className="grid gap-4">
                                                {certifications.map((cert, index) => (
                                                    <div key={index} className="flex items-center p-3 bg-muted rounded-lg">
                                                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                                                        <span className="font-medium">{cert}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardHoverWrapper>
                                {/* Additional Info */}
                                <CardHoverWrapper>
                                    <Card className="mt-6 py-6">
                                        <CardHeader>
                                            <CardTitle>Academic Interests</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {[
                                                    "Machine Learning",
                                                    "Web Development",
                                                    "Data Science",
                                                    "Data Structures and algorithms",
                                                    "GenAI developer",
                                                    "AI Researcher",
                                                    "Deep Learning and LLM",
                                                    "Backend Developer"
                                                ].map((interest, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {interest}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardHoverWrapper>
                            </div>
                        </ScrollFromRight>
                    </div>

                    <ScrollFadeInAndOut>
                        <div className="mt-16">
                            <h3 className="text-2xl font-semibold mb-6 flex items-center">
                                <Briefcase className="h-6 w-6 mr-2 text-accent" />
                                Experience
                            </h3>

                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <CardHoverWrapper key={index}>
                                        <Card key={index} className="py-6">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">{exp.role}</CardTitle>
                                                        <CardDescription className="text-accent font-medium">{exp.company}</CardDescription>
                                                    </div>
                                                    <div className="text-right text-sm text-muted-foreground flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {exp.period}
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground mb-4">{exp.description}</p>
                                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                    {exp.highlights.map((point, i) => (
                                                        <li key={i}>{point}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    </CardHoverWrapper>
                                ))}
                            </div>
                        </div>
                    </ScrollFadeInAndOut>
                </div>
            </div>
        </section>
    )
}
