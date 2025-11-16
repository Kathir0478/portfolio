"use client"

import { motion } from "framer-motion"
import { Code, Users, Award, Coffee } from "lucide-react"
import Lottie from "lottie-react"
import AboutAnimation from "@/public/animations/About-Avatar.json"
import ScrollFadeInAndOut from "./ui/scroll-fade-in-out"
import ScrollFromLeft from "./ui/scroll-from-left"
import ScrollFromRight from "./ui/scroll-from-right"

export function About() {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollFadeInAndOut>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                                About Me
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Discover my journey, passion, and the drive that fuels my development career
                            </p>
                        </div>
                    </ScrollFadeInAndOut>
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
                        <ScrollFromLeft>
                            <div className="relative flex justify-center">
                                <div className="w-full max-w-md">
                                    <Lottie
                                        animationData={AboutAnimation}
                                        loop
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </ScrollFromLeft>
                        <ScrollFromRight>
                            <div className="space-y-6">
                                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                    I'm a dedicated student with a passion for problem-solving and creating meaningful
                                    digital experiences. My journey in technology began in high school, and I've been fascinated by the
                                    endless possibilities of code ever since.
                                </p>

                                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                    Beyond technical expertise, I’m a dedicated problem-solver with strong teamwork, leadership, and critical thinking abilities.
                                    I actively participate in hackathons, coding competitions, and personal projects to continuously push my boundaries.
                                </p>
                                <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                    Outside of coding, I maintain creativity and focus through badminton, travel, and exploring cutting-edge AI research, turning ideas from paper into practical solutions.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-6">
                                    <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border/50 shadow-lg">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                            10+
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
                                    </div>
                                    <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border/50 shadow-lg">
                                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                            7+
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">Hackathons</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollFromRight>
                    </div>
                    <ScrollFadeInAndOut>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                                <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">Clean Code</h3>
                                <p className="text-sm text-muted-foreground">Writing maintainable and efficient code</p>
                            </div>
                            <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">Collaboration</h3>
                                <p className="text-sm text-muted-foreground">Working together to build amazing things</p>
                            </div>
                            <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">Excellence</h3>
                                <p className="text-sm text-muted-foreground">Striving for quality in every project</p>
                            </div>
                            <div className="pointer-events-auto z-50 text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                                <Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">Innovation</h3>
                                <p className="text-sm text-muted-foreground">Always exploring new possibilities</p>
                            </div>
                        </div>
                    </ScrollFadeInAndOut>
                </div>
            </div>
        </section>
    )
}
