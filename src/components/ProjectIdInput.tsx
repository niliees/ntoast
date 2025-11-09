"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectIdInput() {
    const [projectId, setProjectId] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const openProject = () => {
        if (projectId.trim()) {
            window.open(`/NewSide/${projectId}`, '_blank');
        }
    };

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                animate={{
                    scale: isFocused ? 1.02 : 1,
                    boxShadow: isFocused
                        ? "0 10px 40px rgba(255, 255, 255, 0.1)"
                        : "0 0 0 rgba(255, 255, 255, 0)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && openProject()}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter Project ID..."
                    className="w-full px-6 py-5 bg-black/50 border-2 border-neutral-800 rounded-lg text-white text-xl placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-all duration-300"
                />
            </motion.div>
            <motion.button
                onClick={openProject}
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 40px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full px-6 py-5 bg-white text-black font-bold text-xl rounded-lg transition-all relative overflow-hidden group"
            >
                <span className="relative z-10">Open Project →</span>
                <motion.div
                    className="absolute inset-0 bg-neutral-200"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.button>
        </motion.div>
    );
}

