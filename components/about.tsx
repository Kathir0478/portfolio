"use client"

import { motion } from "framer-motion"
import { Code, Users, Award, Coffee } from "lucide-react"

export function About() {
    return (
        <section id="about" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/10">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                            About Me
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Discover my journey, passion, and the drive that fuels my development career
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl blur-xl" />
                            <img
                                src="/student-working-on-laptop-in-modern-workspace.jpg"
                                alt="About Kathiravan"
                                className="relative rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                I'm a dedicated Computer Science student with a passion for problem-solving and creating meaningful
                                digital experiences. My journey in technology began in high school, and I've been fascinated by the
                                endless possibilities of code ever since.
                            </p>

                            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                                or mentoring fellow students. I believe in the power of collaboration and continuous learning.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-6 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border/50 shadow-lg"
                                >
                                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                        15+
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">Projects Completed</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-6 bg-gradient-to-br from-card to-muted/30 rounded-xl border border-border/50 shadow-lg"
                                >
                                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                        8.65
                                    </div>
                                    <div className="text-sm text-muted-foreground font-medium">GPA</div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-4 gap-6"
                    >
                        <div className="text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                            <Code className="h-12 w-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold mb-2">Clean Code</h3>
                            <p className="text-sm text-muted-foreground">Writing maintainable and efficient code</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                            <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold mb-2">Collaboration</h3>
                            <p className="text-sm text-muted-foreground">Working together to build amazing things</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                            <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold mb-2">Excellence</h3>
                            <p className="text-sm text-muted-foreground">Striving for quality in every project</p>
                        </div>
                        <div className="text-center p-6 bg-gradient-to-br from-card to-muted/20 rounded-xl border border-border/30 hover:shadow-lg transition-all duration-300">
                            <Coffee className="h-12 w-12 mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold mb-2">Innovation</h3>
                            <p className="text-sm text-muted-foreground">Always exploring new possibilities</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
