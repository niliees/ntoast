"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import GetStartedModal from "./GetStartedModal";

export default function NavbarWrapper() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Navbar onOpenGetStarted={() => setIsModalOpen(true)} />
            <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

