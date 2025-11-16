// components/ScrollFade.tsx

import React, { useRef, PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollFadeProps extends PropsWithChildren {
    from?: number;
    to?: number;
    speed?: number; // 0.1 = very fast fade, 0.4 = medium, 1 = slow (default)
}

const ScrollFade: React.FC<ScrollFadeProps> = ({
    children,
    from = 5,
    to = 0,
    speed = 0.8, // fade-out happens in first 35% of scroll
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Faster fade: compress scroll range to [0, speed]
    const opacity = useTransform(
        scrollYProgress,
        [0, speed, 1],     // scroll positions
        [from, to, to]     // opacity transitions
    );

    return (
        <motion.div ref={ref} style={{ opacity }}>
            {children}
        </motion.div>
    );
};

export default ScrollFade;
