// components/ScrollFadeInAndOut.tsx

import React, { useRef, PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeInAndOutProps extends PropsWithChildren {
    /** how quickly it fades in/out (0.1 = very fast, 0.5 = slower) */
    intensity?: number;
}

const ScrollFadeInAndOut: React.FC<ScrollFadeInAndOutProps> = ({
    children,
    intensity = 0.5, // default fade speed
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    /**
     * The fade-in-out logic:
     *
     * scrollYProgress = 0    → fully outside (top) → opacity 0
     * scrollYProgress = intensity → fully visible → opacity 1
     * scrollYProgress = 1-intensity → still visible → opacity 1
     * scrollYProgress = 1    → fully outside (bottom) → opacity 0
     */

    const opacity = useTransform(
        scrollYProgress,
        [0, intensity, 1 - intensity, 1],
        [0, 1, 1, 0]
    );

    return (
        <motion.div ref={ref} style={{ opacity }}>
            {children}
        </motion.div>
    );
};

export default ScrollFadeInAndOut;
