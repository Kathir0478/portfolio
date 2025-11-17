
"use client"
import { softSkills } from "@/data/skills"
import HexSphereGrid from "@/components/ui/HexSphereGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { CardHoverWrapper } from "./ui/card-hover-wrapper"
import ScrollFadeInAndOut from "./ui/scroll-fade-in-out"
import ScrollFromLeft from "./ui/scroll-from-left"
import ScrollFromRight from "./ui/scroll-from-right"

export function Skills() {
    return (
        <section id="skills" className="py-20">
            <div className="container mx-auto px-4">
                <ScrollFadeInAndOut>
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Skills & Expertise
                    </h2>
                </ScrollFadeInAndOut>
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Interactive Skills Visualization */}
                    <div className="lg:col-span-3 h-full rounded-xl overflow-hidden border border-border/50">
                        <HexSphereGrid />
                    </div>
                    {/* Soft Skills Sidebar */}
                    <ScrollFromRight>
                        <div className="space-y-6">
                            <CardHoverWrapper>
                                <Card className="py-6">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Soft Skills
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {softSkills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                                >
                                                    <span className="text-xl">{skill.icon}</span>
                                                    <div>
                                                        <h4 className="font-medium">{skill.name}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {skill.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </CardHoverWrapper>
                        </div>
                    </ScrollFromRight>
                </div>
            </div>
        </section>
    )
}