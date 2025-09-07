// "use client"

// import { useTheme } from "next-themes"
// import { useEffect, useState } from "react"
// import dynamic from "next/dynamic"
// // '../public/animation'
// // Dynamically import Lottie to avoid SSR issues
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// export function LottieBackground() {
//     const { theme, resolvedTheme } = useTheme()
//     const [animationData, setAnimationData] = useState(null)
//     const [mounted, setMounted] = useState(false)

//     useEffect(() => {
//         setMounted(true)
//     }, [])

//     useEffect(() => {
//         if (!mounted) return

//         const loadAnimation = async () => {
//             try {
//                 const currentTheme = resolvedTheme || theme
//                 const animationFile = currentTheme === "dark" ? "/animations/BG-Dark.json" : "/animations/BG-Light.json"

//                 const response = await fetch(animationFile)
//                 const data = await response.json()
//                 setAnimationData(data)
//             } catch (error) {
//                 console.error("Failed to load Lottie animation:", error)
//             }
//         }

//         loadAnimation()
//     }, [theme, resolvedTheme, mounted])

//     if (!mounted || !animationData) {
//         return null
//     }

//     return (
//         <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//             <div className="absolute inset-0 opacity-30">
//                 <Lottie
//                     animationData={animationData}
//                     loop={true}
//                     autoplay={true}
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                     }}
//                 />
//             </div>
//         </div>
//     )
// }


"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import LightAnim from "@/public/animations/BG-Light.json"
import DarkAnim from "@/public/animations/BG-Dark.json"


const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function LottieBackground() {
    const { resolvedTheme } = useTheme()
    const [animations, setAnimations] = useState<{ dark: any; light: any } | null>(null)
    const [animationData, setAnimationData] = useState<any>(null)

    useEffect(() => {
        const loadAnimations = async () => {
            try {
                // const [darkRes, lightRes] = await Promise.all([
                //     fetch("/animations/BG-Light.json").then(r => r.json()),
                //     fetch("/animations/BG-Light.json").then(r => r.json()),
                // ])
                // setAnimations({ dark: darkRes, light: lightRes })
            } catch (error) {
                console.error("Failed to load Lottie animations:", error)
            }
        }
        loadAnimations()
    }, [])

    useEffect(() => {
        if (!animations) return
        // setAnimationData(resolvedTheme === "dark" ? animations.dark : animations.light)
        setAnimationData(resolvedTheme === "dark" ? LightAnim : LightAnim)
    }, [resolvedTheme, animations])

    if (!animationData) return null

    return (
        <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
                <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    )
}
