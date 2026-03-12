import React, { useRef } from "react";
import { useOutsideClick } from "./use-outside-click";

interface AcceternityCardProps {
    title: string;
    logo: string;
    level: number;
    description: string;
    onClose: () => void;
}

export default function AcceternityCard({ title, logo, level, description, onClose }: AcceternityCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onClose);

    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
            <div
                ref={ref}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full transition-colors overflow-hidden"
            >
                {/* upper half: logo only */}
                <div className="bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-6">
                    {logo && (
                        <img
                            src={logo}
                            alt={title}
                            className="h-20 w-20 object-contain"
                        />
                    )}
                </div>
                {/* lower half: details */}
                <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                        {title}
                    </h3>
                    <div className="mb-3">
                        <div className="text-sm text-gray-500">
                            Rating: {level}/100
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                            <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${level}%` }}
                            />
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
