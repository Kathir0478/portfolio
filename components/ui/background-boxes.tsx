
"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const rows = new Array(120).fill(1); // slightly fewer rows for bigger squares
    const cols = new Array(80).fill(1);

    // Neon-inspired palette (works on both dark & light)
    let colors = [
        "#38bdf8", // sky-400
        "#818cf8", // indigo-400
        "#a78bfa", // violet-400
        "#f472b6", // pink-400
        "#facc15", // yellow-400
        "#4ade80", // green-400
        "#22d3ee", // cyan-400
        "#fb923c", // orange-400
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.7) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "fixed top-1/2 left-1/2 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
                className
            )}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="relative h-12 w-20 border-l border-slate-600 dark:border-slate-700"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: `${getRandomColor()}`,
                                transition: { duration: 0 },
                            }}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            key={`col` + j}
                            className="relative h-12 w-20 border-t border-r border-slate-600 dark:border-slate-700"
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="pointer-events-none absolute -top-[18px] -left-[26px] h-8 w-12 stroke-[1px] text-slate-600 dark:text-slate-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
