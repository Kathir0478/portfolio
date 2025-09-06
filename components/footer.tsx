// "use client"

// import { Github, Linkedin, Mail, Heart } from "lucide-react"

// export function Footer() {
//     return (
//         <footer className="bg-primary text-primary-foreground dark:bg-background dark:text-foreground py-12 transition-colors duration-300">
//             <div className="container mx-auto px-4">
//                 <div className="max-w-6xl mx-auto">
//                     <div className="grid md:grid-cols-3 gap-8">
//                         {/* About */}
//                         <div>
//                             <h3 className="text-xl font-bold mb-4">Kathiravan</h3>
//                             <p className="text-primary-foreground/80 dark:text-foreground/80 text-pretty">
//                                 Passionate about creating innovative solutions through code and continuous
//                                 learning.
//                             </p>
//                         </div>

//                         {/* Quick Links */}
//                         <div>
//                             <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//                             <div className="space-y-2">
//                                 {["About", "Projects", "Education", "Skills", "Contact"].map((link) => (
//                                     <button
//                                         key={link}
//                                         onClick={() => {
//                                             const element = document.getElementById(link.toLowerCase())
//                                             if (element) {
//                                                 element.scrollIntoView({ behavior: "smooth" })
//                                             }
//                                         }}
//                                         className="block text-primary-foreground/80 dark:text-foreground/80 hover:text-primary-foreground dark:hover:text-foreground transition-colors"
//                                     >
//                                         {link}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Social Links */}
//                         <div>
//                             <h3 className="text-xl font-bold mb-4">Connect</h3>
//                             <div className="flex space-x-4">
//                                 <a
//                                     href="https://github.com/Kathir0478"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="w-10 h-10 bg-primary-foreground/10 dark:bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 dark:hover:bg-foreground/20 transition-colors"
//                                 >
//                                     <Github className="h-5 w-5" />
//                                 </a>
//                                 <a
//                                     href="https://www.linkedin.com/in/kathiravan-b-980b00313/"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="w-10 h-10 bg-primary-foreground/10 dark:bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 dark:hover:bg-foreground/20 transition-colors"
//                                 >
//                                     <Linkedin className="h-5 w-5" />
//                                 </a>
//                                 <a
//                                     href="mailto:kathir200420@gmail.com"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="w-10 h-10 bg-primary-foreground/10 dark:bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 dark:hover:bg-foreground/20 transition-colors"
//                                 >
//                                     <Mail className="h-5 w-5" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border-t border-primary-foreground/20 dark:border-foreground/20 mt-8 pt-8 text-center">
//                         <p className="text-primary-foreground/60 dark:text-foreground/60 flex items-center justify-center">
//                             Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by Kathiravan © 2025
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }


"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-primary dark:bg-background text-primary-foreground dark:text-foreground py-12 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Kathiravan</h3>
                        <p className="text-pretty text-primary-foreground/80 dark:text-foreground/80">
                            Passionate about creating innovative solutions through code and continuous learning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {["About", "Projects", "Education", "Skills", "Contact"].map((link) => (
                                <button
                                    key={link}
                                    onClick={() => {
                                        const element = document.getElementById(link.toLowerCase())
                                        if (element) element.scrollIntoView({ behavior: "smooth" })
                                    }}
                                    className="block text-primary-foreground/80 dark:text-foreground/80 hover:text-primary-foreground dark:hover:text-foreground transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            {[
                                { icon: <Github className="h-5 w-5" />, href: "https://github.com/Kathir0478" },
                                { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/kathiravan-b-980b00313/" },
                                { icon: <Mail className="h-5 w-5" />, href: "mailto:kathir200420@gmail.com" },
                            ].map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-foreground/10 dark:bg-foreground/10 hover:bg-primary-foreground/20 dark:hover:bg-foreground/20 transition-colors"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-primary-foreground/20 dark:border-foreground/20 mt-8 pt-8 text-center">
                    <p className="text-primary-foreground/60 dark:text-foreground/60 flex items-center justify-center">
                        Made with <Heart className="h-4 w-4 mx-1 text-red-400" /> by Kathiravan © 2025
                    </p>
                </div>
            </div>
        </footer>
    )
}
