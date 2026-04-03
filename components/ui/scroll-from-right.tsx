// components/ScrollFromRight.tsx

import React, { useRef, PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSideProps extends PropsWithChildren {
    distance?: number;
}

const ScrollFromRight: React.FC<ScrollSideProps> = ({
    children,
    distance = 150,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    /**
     * Movement:
     * scroll = 0         → off-screen right (+distance)
     * scroll = 0.25      → reaches center (0)
     * scroll = 0.75      → stays centered (0)
     * scroll = 1         → exit right again (+distance)
     */
    const x = useTransform(
        scrollYProgress,
        [0, 0.35, 0.65, 1],
        [distance, 0, 0, distance]
    );

    return (
        <motion.div ref={ref} style={{ x: isMobile ? 0 : x }}>
            {children}
        </motion.div>
    );
};

export default ScrollFromRight;
