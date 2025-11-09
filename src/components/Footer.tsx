"use client";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-900 bg-black">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-black text-2xl text-white mb-4">NSCE</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Digital creative infrastructure & tools.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Explore</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: 'Features', href: '/#projects' },
                                { name: 'Portal', href: '/portal' },
                                { name: 'Open Data', href: '/open-data' }
                            ].map(item => (
                                <a key={item.name} href={item.href} className="text-neutral-500 hover:text-white transition-colors text-sm">{item.name}</a>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Company</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: 'About', href: '/#about' },
                                { name: 'Contact', href: '/#contact' },
                                { name: 'Impressum', href: '/impressum' }
                            ].map(item => (
                                <a key={item.name} href={item.href} className="text-neutral-500 hover:text-white transition-colors text-sm">{item.name}</a>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-white mb-4">Legal</h4>
                        <div className="flex flex-col gap-3">
                            {['Privacy', 'Terms', 'Security', 'Status'].map((item) => (
                                <span
                                    key={item}
                                    className="text-neutral-600 text-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-600 text-sm">
                        © {new Date().getFullYear()} NSCE. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {['Twitter', 'GitHub', 'Discord'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                aria-label={social}
                                className="text-neutral-600 hover:text-white transition-colors text-sm"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
