"use client";
// Simplified new Online Portal page reusing existing portal auth plus storage placeholder
import { useEffect, useState, useCallback } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import type { User } from "firebase/auth";
import type { Timestamp, DocumentData } from "firebase/firestore";

interface StoredFileMeta {
  id: string;
  filename: string;
  size: number;
  createdAt?: Timestamp | null;
  owner?: string | null;
}

export default function OnlinePortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<StoredFileMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "online-portal-files"), orderBy("createdAt", "desc"), limit(100));
    const unsub = onSnapshot(q, snap => {
      setFiles(snap.docs.map(d => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          filename: data.filename,
          size: data.size,
          createdAt: data.createdAt ?? null,
          owner: data.owner ?? null
        } as StoredFileMeta;
      }));
    });
    return () => unsub();
  }, [user]);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null); setUploading(true);
    try {
      // In absence of storage integration, just metadata (could integrate Firebase Storage later)
      await addDoc(collection(db, "online-portal-files"), {
        filename: file.name,
        size: file.size,
        createdAt: serverTimestamp(),
        owner: user?.uid || null
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload Fehler");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }, [user]);

  if (loading) return <main className="px-6 py-32">Lade...</main>;
  if (!user) return <main className="px-6 py-32">Bitte im Portal anmelden (oben über Portal).</main>;

  return (
    <main className="px-6 py-32 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black">Online Portal</h1>
        <button onClick={() => signOut(auth)} className="px-4 py-2 bg-neutral-800 rounded-lg">Abmelden</button>
      </div>
      <div className="mb-10 space-y-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Datei hochladen (nur Metadaten)</label>
          <input type="file" onChange={handleUpload} disabled={uploading} className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-semibold file:cursor-pointer disabled:opacity-50" />
          {uploading && <p className="text-neutral-400 text-sm mt-2 animate-pulse">Wird hochgeladen...</p>}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map(f => (
          <motion.div key={f.id} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="p-5 rounded-xl border border-neutral-800 bg-neutral-900">
            <h3 className="font-semibold text-white truncate">{f.filename}</h3>
            <p className="text-xs text-neutral-500 mt-1">{Math.round(f.size/1024)} KB</p>
            <p className="text-xs text-neutral-600 mt-1">ID: {f.id}</p>
          </motion.div>
        ))}
        {files.length === 0 && <div className="text-neutral-500">Noch keine Dateien.</div>}
      </motion.div>
    </main>
  );
}
