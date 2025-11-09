"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type GetStartedModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectName: "",
        projectType: "",
        timeline: "",
        hosting: "",
        description: "",
        email: "",
        name: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        const subject = `Projektanfrage: ${formData.projectName || "Neues Projekt"}`;
        const body = `
Hallo NSCE Team,

ich möchte ein neues Projekt starten:

Name: ${formData.name || "Nicht angegeben"}
E-Mail: ${formData.email || "Nicht angegeben"}

--- Projektdetails ---
Projektname: ${formData.projectName || "Nicht angegeben"}
Projekttyp: ${formData.projectType || "Nicht angegeben"}
Zeitrahmen: ${formData.timeline || "Nicht angegeben"}
Hosting: ${formData.hosting || "Nicht angegeben"}

Beschreibung:
${formData.description || "Keine Beschreibung angegeben"}

---
Vielen Dank!
        `.trim();

        try {
            setIsSubmitting(true);
            setSubmitError(null);

            // Save to Firestore
            const col = collection(db, "project-submissions");
            await addDoc(col, {
                ...formData,
                createdAt: serverTimestamp(),
                status: "new"
            });

            // Open email client after successful save
            window.location.href = `mailto:contact@nsce.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Reset and close
            onClose();
            setTimeout(() => {
                setStep(1);
                setFormData({
                    projectName: "",
                    projectType: "",
                    timeline: "",
                    hosting: "",
                    description: "",
                    email: "",
                    name: ""
                });
            }, 300);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Fehler beim Speichern. Bitte versuche es erneut.";
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl pointer-events-auto overflow-hidden"
                        >
                            {/* Header */}
                            <div className="border-b border-neutral-800 p-6 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Get Started</h2>
                                    <p className="text-sm text-neutral-400 mt-1">
                                        Schritt {step} von {totalSteps}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-neutral-400 hover:text-white transition-colors p-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1 bg-neutral-800">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${(step / totalSteps) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Persönliche Informationen</h3>
                                                <p className="text-neutral-400">Wie können wir Sie erreichen?</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Ihr Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => updateFormData("name", e.target.value)}
                                                        className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                                                        placeholder="Max Mustermann"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        E-Mail Adresse *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => updateFormData("email", e.target.value)}
                                                        className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                                                        placeholder="max@beispiel.de"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Projektdetails</h3>
                                                <p className="text-neutral-400">Erzählen Sie uns über Ihr Projekt</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Projektname *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.projectName}
                                                        onChange={(e) => updateFormData("projectName", e.target.value)}
                                                        className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                                                        placeholder="Mein tolles Projekt"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Projekttyp *
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["Website", "Web-App", "Mobile App", "API", "Design", "Sonstiges"].map((type) => (
                                                            <button
                                                                key={type}
                                                                onClick={() => updateFormData("projectType", type)}
                                                                className={`px-4 py-3 rounded-lg border transition-all ${
                                                                    formData.projectType === type
                                                                        ? "bg-white text-black border-white"
                                                                        : "bg-black/50 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                                                }`}
                                                            >
                                                                {type}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Zeitrahmen & Hosting</h3>
                                                <p className="text-neutral-400">Helfen Sie uns, Ihr Projekt einzuschätzen</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Zeitrahmen
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["ASAP", "1-2 Wochen", "1 Monat", "2-3 Monate", "3-6 Monate", "Flexibel"].map((timeline) => (
                                                            <button
                                                                key={timeline}
                                                                onClick={() => updateFormData("timeline", timeline)}
                                                                className={`px-4 py-3 rounded-lg border transition-all ${
                                                                    formData.timeline === timeline
                                                                        ? "bg-white text-black border-white"
                                                                        : "bg-black/50 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                                                }`}
                                                            >
                                                                {timeline}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Hosting
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {["NSCE Hosting", "Selbst gehostet", "Noch unklar"].map((hosting) => (
                                                            <button
                                                                key={hosting}
                                                                onClick={() => updateFormData("hosting", hosting)}
                                                                className={`px-4 py-3 rounded-lg border transition-all ${
                                                                    formData.hosting === hosting
                                                                        ? "bg-white text-black border-white"
                                                                        : "bg-black/50 text-neutral-400 border-neutral-800 hover:border-neutral-600"
                                                                }`}
                                                            >
                                                                {hosting}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2">Letzte Details</h3>
                                                <p className="text-neutral-400">Beschreiben Sie Ihre Vision</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                                                        Projektbeschreibung
                                                    </label>
                                                    <textarea
                                                        value={formData.description}
                                                        onChange={(e) => updateFormData("description", e.target.value)}
                                                        rows={6}
                                                        className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors resize-none"
                                                        placeholder="Beschreiben Sie Ihr Projekt, Ihre Ziele und was Sie sich vorstellen..."
                                                    />
                                                </div>

                                                <div className="bg-black/50 border border-neutral-800 rounded-lg p-4">
                                                    <h4 className="text-sm font-medium text-white mb-2">📧 Zusammenfassung</h4>
                                                    <div className="text-sm text-neutral-400 space-y-1">
                                                        <p><strong>Name:</strong> {formData.name || "—"}</p>
                                                        <p><strong>E-Mail:</strong> {formData.email || "—"}</p>
                                                        <p><strong>Projekt:</strong> {formData.projectName || "—"}</p>
                                                        <p><strong>Typ:</strong> {formData.projectType || "—"}</p>
                                                        <p><strong>Zeitrahmen:</strong> {formData.timeline || "—"}</p>
                                                        <p><strong>Hosting:</strong> {formData.hosting || "—"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-neutral-800 p-6 flex justify-between items-center">
                                <button
                                    onClick={handleBack}
                                    disabled={step === 1 || isSubmitting}
                                    className="px-6 py-2.5 bg-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Zurück
                                </button>

                                <div className="flex items-center gap-3">
                                    {submitError && (
                                        <span className="text-red-400 text-sm">{submitError}</span>
                                    )}
                                    {step < totalSteps ? (
                                        <button
                                            onClick={handleNext}
                                            disabled={isSubmitting}
                                            className="px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                                        >
                                            Weiter
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Sende..." : "E-Mail öffnen"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
