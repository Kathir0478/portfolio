// components/ScrollFromLeft.tsx

import React, { useRef, PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSideProps extends PropsWithChildren {
    distance?: number; // slide amount in px (default: 150px)
}

const ScrollFromLeft: React.FC<ScrollSideProps> = ({
    children,
    distance = 150,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    /**
     * Movement:
     * scroll = 0         → off-screen left (-distance)
     * scroll = 0.25      → reaches center (0)
     * scroll = 0.75      → still visible (0)
     * scroll = 1         → exit left again (-distance)
     */
    const x = useTransform(
        scrollYProgress,
        [0, 0.35, 0.65, 1],
        [-distance, 0, 0, -distance]
    );

    return (
        <motion.div ref={ref} style={{ x }}>
            {children}
        </motion.div>
    );
};

export default ScrollFromLeft;
