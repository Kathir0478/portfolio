"use client"
import React from "react"

export function CardHoverWrapper({ children }: { children: React.ReactNode }) {
    const setBgIgnore = (enable: boolean) => {
        try {
            if (enable) document.body.setAttribute("data-ignore-bg-drag", "true")
            else document.body.removeAttribute("data-ignore-bg-drag")
        } catch { }
    }

    return (
        <div
            className="pointer-events-auto z-40 relative"
            onPointerEnter={() => setBgIgnore(true)}
            onPointerLeave={() => setBgIgnore(false)}
        >
            {children}
        </div>
    )
}