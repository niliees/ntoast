"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";

type Submission = {
  id: string;
  projectName?: string;
  projectType?: string;
  name?: string;
  email?: string;
  timeline?: string;
  hosting?: string;
  description?: string;
};

export default function PortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(true);
      setError(null);
      setIsAllowed(null);
      setSubmissions([]);

      if (!u) {
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, "admin-uids", u.uid);
        const snap = await getDoc(ref);
        const allowed = snap.exists();
        setIsAllowed(allowed);

        if (allowed) {
          const q = query(
            collection(db, "project-submissions"),
            orderBy("createdAt", "desc"),
            limit(50)
          );
          const unsubSub = onSnapshot(q, (snapshot) => {
            const rows: Submission[] = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as DocumentData) }));
            setSubmissions(rows);
          }, (err) => setError(err.message));

          return () => unsubSub();
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Fehler beim Laden der Berechtigungen";
        setError(message);
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleEmailAuth = useCallback(async () => {
    setError(null);
    setAuthLoading(true);
    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      } else {
        await signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Fehler bei der Anmeldung";
      setError(msg);
    } finally {
      setAuthLoading(false);
    }
  }, [emailInput, passwordInput, isRegisterMode]);

  const content = useMemo(() => {
    if (loading) {
      return <p className="text-neutral-400">Lade...</p>;
    }

    if (!user) {
      return (
        <div className="max-w-md mx-auto text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Portal Login</h1>
            <p className="text-neutral-400">Melde dich an, um Einreichungen zu sehen.</p>
          </div>

          <div className="space-y-4 text-left">
            <label className="block text-sm font-medium text-neutral-300">E-Mail</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white"
            />
            <label className="block text-sm font-medium text-neutral-300 mt-2">Passwort</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-black/50 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-white"
            />
            <button
              onClick={handleEmailAuth}
              disabled={authLoading || !emailInput || passwordInput.length < 6}
              className="w-full mt-4 px-6 py-3 bg-white text-black font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 transition-colors"
            >
              {authLoading ? "Bitte warten..." : isRegisterMode ? "Registrieren" : "Einloggen"}
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="w-full text-sm text-neutral-400 hover:text-white transition-colors mt-2"
            >
              {isRegisterMode ? "Schon ein Konto? Einloggen" : "Noch kein Konto? Jetzt registrieren"}
            </button>
            <div className="flex items-center gap-3 mt-6">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="text-neutral-600 text-xs uppercase tracking-wider">oder</span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>
            <button
              onClick={() => signInWithPopup(auth, googleProvider)}
              className="w-full px-6 py-3 bg-neutral-800 border border-neutral-700 hover:border-neutral-600 rounded-lg text-white font-semibold"
            >
              Mit Google anmelden
            </button>
            <p className="text-xs text-neutral-500 mt-2">Nach Registrierung muss ein Admin deine UID freischalten.</p>
          </div>
          {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
        </div>
      );
    }

    if (isAllowed === false) {
      return (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Zugang verweigert</h1>
          <p className="text-neutral-400">Deine UID ist nicht freigeschaltet.</p>
          <div className="mt-6">
            <button onClick={() => signOut(auth)} className="px-6 py-3 bg-neutral-800 rounded-lg">Abmelden</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Projekt-Einreichungen</h1>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400 text-sm">{user?.email}</span>
            <button onClick={() => signOut(auth)} className="px-4 py-2 bg-neutral-800 rounded-lg">Abmelden</button>
          </div>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((s) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-5 rounded-xl border border-neutral-800 bg-neutral-900">
              <h3 className="font-semibold text-white">{s.projectName || "—"}</h3>
              <p className="text-sm text-neutral-400">{s.projectType || "—"}</p>
              <div className="mt-3 text-sm text-neutral-300 space-y-1">
                <p><b>Name:</b> {s.name || "—"}</p>
                <p><b>E-Mail:</b> {s.email || "—"}</p>
                <p><b>Zeitrahmen:</b> {s.timeline || "—"}</p>
                <p><b>Hosting:</b> {s.hosting || "—"}</p>
              </div>
              {s.description && (
                <p className="mt-3 text-neutral-400 text-sm whitespace-pre-wrap">{s.description}</p>
              )}
              <p className="mt-3 text-xs text-neutral-500">ID: {s.id}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }, [user, isAllowed, submissions, loading, error, emailInput, passwordInput, authLoading, isRegisterMode, handleEmailAuth]);

  return (
    <main className="px-6 py-24 max-w-7xl mx-auto">
      {content}
    </main>
  );
}
