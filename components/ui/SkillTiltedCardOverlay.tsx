"use client";

import { useRef } from "react";
import TiltedCard from "./TiltedCard";
import { useOutsideClick } from "./use-outside-click";

interface SkillTiltedCardOverlayProps {
    title: string;
    logo: string;
    level: number;
    description: string;
    onClose: () => void;
}

function toPublicSrc(logo: string) {
    if (!logo) return "/placeholder.svg";
    return logo.startsWith("/") ? logo : `/${logo}`;
}

export default function SkillTiltedCardOverlay({
    title,
    logo,
    level,
    description,
    onClose,
}: SkillTiltedCardOverlayProps) {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    const imageSrc = toPublicSrc(logo);

    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] p-4">
            <div ref={ref} className="relative w-full max-w-[320px]">


                <TiltedCard
                    variant="skill"
                    imageSrc={imageSrc}
                    altText={title}
                    captionText={title}
                    containerHeight="300px"
                    containerWidth="300px"
                    imageHeight="80px"
                    imageWidth="80px"
                    imageObjectFit="contain"
                    rotateAmplitude={12}
                    scaleOnHover={1.03}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent
                    overlayContent={
                        <div className="tilted-card-skill-overlay">
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <div className="tilted-card-skill-level">Proficiency: {level}/100</div>
                            <div className="tilted-card-skill-level-bar">
                                <div
                                    className="tilted-card-skill-level-fill"
                                    style={{ width: `${level}%` }}
                                />
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
