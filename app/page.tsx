import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectsSlideshow } from "@/components/projects-slideshow"
import { Education } from "@/components/education"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function Home() {
    return (
        <div className="min-h-screen relative w-full overflow-y-auto">
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

            <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
                <Chatbot />
            </div>
        </div>
    );
}
