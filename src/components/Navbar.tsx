"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type NavbarProps = {
    onOpenGetStarted: () => void;
};

export default function Navbar({ onOpenGetStarted }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed w-full top-0 left-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-900"
        >
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="/"
                    className="font-black text-2xl text-white tracking-tight"
                >
                    NSCE
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {[
                        { name: 'Features', href: '/#projects' },
                        { name: 'About', href: '/#about' },
                        { name: 'Contact', href: '/#contact' },
                        { name: 'Portal', href: '/portal' }
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-neutral-400 hover:text-white transition-colors font-medium"
                        >
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={onOpenGetStarted}
                        className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-neutral-900 bg-black">
                    <div className="px-6 py-4 space-y-3">
                        {[
                            { name: 'Features', href: '/#projects' },
                            { name: 'About', href: '/#about' },
                            { name: 'Contact', href: '/#contact' },
                            { name: 'Portal', href: '/portal' }
                        ].map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block text-neutral-400 hover:text-white transition-colors font-medium py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                onOpenGetStarted();
                                setIsOpen(false);
                            }}
                            className="w-full px-6 py-3 bg-white text-black font-bold rounded-lg mt-4"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
}
