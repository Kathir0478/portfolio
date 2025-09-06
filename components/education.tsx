import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar } from "lucide-react"

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    period: "2022 - 2026",
    gpa: "3.8/4.0",
    description:
      "Focusing on software engineering, algorithms, and data structures. Active member of the Computer Science Club and Programming Team.",
    achievements: ["Dean's List (3 semesters)", "Programming Competition Winner", "CS Club Vice President"],
  },
  {
    degree: "High School Diploma",
    school: "Central High School",
    period: "2018 - 2022",
    gpa: "3.9/4.0",
    description:
      "Graduated Summa Cum Laude with a focus on STEM subjects. Captain of the Robotics Team and National Honor Society member.",
    achievements: ["Valedictorian", "Robotics Team Captain", "National Merit Scholar"],
  },
]

const certifications = [
  "AWS Cloud Practitioner",
  "Google Analytics Certified",
  "FreeCodeCamp Full Stack Developer",
  "Coursera Machine Learning Certificate",
]

export function Education() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Education & Certifications</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-accent" />
                Education
              </h3>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index}>
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
                      <div className="space-y-2">
                        <h4 className="font-medium flex items-center">
                          <Award className="h-4 w-4 mr-2 text-accent" />
                          Achievements
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((achievement, achIndex) => (
                            <Badge key={achIndex} variant="outline">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-accent" />
                Certifications
              </h3>

              <Card>
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

              {/* Additional Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Academic Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Machine Learning",
                      "Web Development",
                      "Mobile Apps",
                      "Cloud Computing",
                      "Data Science",
                      "Cybersecurity",
                    ].map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
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
