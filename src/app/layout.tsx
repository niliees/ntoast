import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "NSCE",
    description: "We provide the infrastructure you need to bring your ideas to life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className="scroll-smooth">
        <body className="bg-black text-white antialiased overflow-x-hidden">
        <NavbarWrapper />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
