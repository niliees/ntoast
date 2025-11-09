"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ProjectIdInput from "@/components/ProjectIdInput";
import { useRef } from "react";

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effects
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

    return (
        <div ref={containerRef} className="relative">
            {/* Simple Background */}
            <div className="fixed inset-0 -z-10 bg-black" />

            {/* Hero Section - Much Larger with Parallax */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-32">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="flex-1 flex items-center justify-center w-full"
                >
                    <div className="text-center max-w-6xl">
                        <motion.h1
                            className="text-[5rem] md:text-[8rem] lg:text-[12rem] font-black mb-8 text-white leading-none tracking-tighter"
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 1.2,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1] // Apple easing
                            }}
                        >
                            NSCE
                        </motion.h1>

                        <motion.p
                            className="text-2xl md:text-3xl text-neutral-400 mb-16 font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            Digital Creative Studio
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <motion.a
                                href="#projects"
                                className="px-12 py-5 bg-white text-black font-bold text-lg rounded-lg transition-all"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 10px 40px rgba(255, 255, 255, 0.2)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                View Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-12 py-5 bg-transparent text-white font-bold text-lg rounded-lg transition-all border-2 border-neutral-800"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "#525252"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Get in Touch
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator - Smoother */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-neutral-600 text-sm uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                            repeatDelay: 0.2
                        }}
                    >
                        <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* Projects Section - Large spacing with stagger animations */}
            <section id="projects" className="min-h-screen flex items-center px-6 py-40">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-32"
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-8">
                            Projects
                        </h2>
                        <p className="text-2xl text-neutral-500 max-w-2xl">
                            Explore our collection of tools and platforms
                        </p>
                    </motion.div>

                    <div className="space-y-32">
                        {/* NewSide Projects - Full Width with scale animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="grid lg:grid-cols-2 gap-16 items-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <motion.div
                                    className="text-6xl mb-8"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    🚀
                                </motion.div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                                    NewSide Projects
                                </h3>
                                <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                                    Start your projects with a unique ID. Access and manage your work from anywhere.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <ProjectIdInput />
                            </motion.div>
                        </motion.div>

                        {/* Online Portal with hover effect */}
                        <motion.a
                            href="/onlinePortal"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="grid lg:grid-cols-2 gap-16 items-center group"
                        >
                            <motion.div
                                className="lg:order-2"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <motion.div
                                    className="text-6xl mb-8"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    ☁️
                                </motion.div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-neutral-300 transition-colors duration-500">
                                    Online Portal
                                </h3>
                                <p className="text-xl text-neutral-400 leading-relaxed">
                                    Access to cloud storage and documents. Your files, everywhere.
                                </p>
                            </motion.div>
                            <motion.div
                                className="lg:order-1 h-80 bg-neutral-900 rounded-2xl border border-neutral-800 transition-all duration-500 flex items-center justify-center overflow-hidden"
                                initial={{ opacity: 0, x: -50, scale: 0.95 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "#525252",
                                    boxShadow: "0 20px 60px rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                <span className="text-8xl group-hover:scale-110 transition-transform duration-500">☁️</span>
                            </motion.div>
                        </motion.a>

                        {/* Open Data with hover effect */}
                        <motion.a
                            href="/open-data"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="grid lg:grid-cols-2 gap-16 items-center group"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <motion.div
                                    className="text-6xl mb-8"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    📊
                                </motion.div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-neutral-300 transition-colors duration-500">
                                    Open Data
                                </h3>
                                <p className="text-xl text-neutral-400 leading-relaxed">
                                    Publish your HTML/CSS/JS files easily. Share your work with the world.
                                </p>
                            </motion.div>
                            <motion.div
                                className="h-80 bg-neutral-900 rounded-2xl border border-neutral-800 transition-all duration-500 flex items-center justify-center overflow-hidden"
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "#525252",
                                    boxShadow: "0 20px 60px rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                <span className="text-8xl group-hover:scale-110 transition-transform duration-500">📊</span>
                            </motion.div>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* External Projects Grid - Simplified with stagger */}
            <section className="py-40 px-6 bg-neutral-950/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-24"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                            More Projects
                        </h2>
                        <p className="text-xl text-neutral-500">
                            External platforms and tools
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                href: "https://rezeptbuch.pro",
                                icon: "📖",
                                title: "Rezeptbuch",
                                desc: "Recipe manager with shopping lists and weekly planner"
                            },
                            {
                                href: "https://fastsite.cloud",
                                icon: "⚡",
                                title: "Fastsite",
                                desc: "Fast and reliable URL shortener"
                            },
                            {
                                href: "https://devtoast.fun",
                                icon: "🎮",
                                title: "DevToast",
                                desc: "Fun projects for developers"
                            }
                        ].map((project, i) => (
                            <motion.a
                                key={project.title}
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.15,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17
                                    }
                                }}
                                className="p-12 bg-neutral-900/30 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all block group"
                            >
                                <motion.div
                                    className="text-6xl mb-6"
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: [0, -5, 5, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                >
                                    {project.icon}
                                </motion.div>
                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-neutral-300 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-neutral-400 leading-relaxed text-lg">
                                    {project.desc}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section - Simple with smooth reveal */}
            <section id="about" className="min-h-screen flex items-center px-6 py-40">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.h2
                                className="text-6xl md:text-7xl font-black text-white mb-12 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                Building
                                <br />
                                Digital
                                <br />
                                Solutions
                            </motion.h2>
                            <motion.div
                                className="space-y-6 text-xl text-neutral-400 leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 1,
                                    delay: 0.4,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <p>
                                    NSCE is your one-stop platform for managing projects and accessing tools.
                                </p>
                                <p>
                                    We provide the infrastructure you need to bring your ideas to life.
                                </p>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 80, scale: 0.9 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                scale: 1.02,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }
                            }}
                            className="h-[500px] rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden cursor-pointer"
                        >
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <motion.div
                                    className="text-9xl mb-8"
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    💻
                                </motion.div>
                                <p className="text-3xl font-bold text-white">Built for Creators</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section - Minimal with scale animation */}
            <section id="contact" className="min-h-screen flex items-center px-6 py-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto text-center w-full"
                >
                    <motion.h2
                        className="text-6xl md:text-8xl font-black text-white mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        Let&apos;s Talk
                    </motion.h2>
                    <motion.p
                        className="text-2xl text-neutral-400 mb-16 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                    >
                        Have a project in mind? Get in touch.
                    </motion.p>
                    <motion.a
                        href="mailto:contact@nsce.fr"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            delay: 0.6,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 60px rgba(255, 255, 255, 0.2)",
                            transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block px-16 py-6 bg-white text-black font-bold text-xl rounded-lg transition-all"
                    >
                        Send Email
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}

