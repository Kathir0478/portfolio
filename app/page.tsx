import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectsSlideshow } from "@/components/projects-slideshow"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
export default function Home() {
    return (
        <div className="min-h-screen bg-background">
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
    )
}
