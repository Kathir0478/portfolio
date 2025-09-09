import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectsSlideshow } from "@/components/projects-slideshow"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Boxes } from "@/components/ui/background-boxes" // 👈 import your background

export default function Home() {
    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            <div className="fixed inset-0 z-10">
                <Boxes className="opacity-40" />
            </div>
            {/* Foreground Content */}
            <div className="relative z-10">
                <Header />
                <main>
                    <Hero />
                    <About />
                    <ProjectsSlideshow />
                    <Education />
                    <Skills />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    )
}
