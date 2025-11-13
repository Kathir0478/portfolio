
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import LightAnim from "@/public/animations/BG-Light.json"


const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function LottieBackground() {
    const { resolvedTheme } = useTheme()
    const [animations, setAnimations] = useState<{ dark: any; light: any } | null>(null)
    const [animationData, setAnimationData] = useState<any>(null)


    useEffect(() => {
        if (!animations) return
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
