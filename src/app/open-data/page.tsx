"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db, auth } from "@/lib/firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, limit, DocumentData, Timestamp } from "firebase/firestore";

interface OpenDataFile {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  createdAt?: Timestamp | null;
  owner?: string | null;
  // content only loaded for preview
}

export default function OpenDataPage() {
  const [files, setFiles] = useState<OpenDataFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<OpenDataFile | null>(null);
  const [previewHTML, setPreviewHTML] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "open-data-files"), orderBy("createdAt", "desc"), limit(50));
    const unsub = onSnapshot(q, snap => {
      const list: OpenDataFile[] = snap.docs.map(d => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          filename: data.filename,
          contentType: data.contentType,
          size: data.size,
          createdAt: data.createdAt ?? null,
          owner: data.owner ?? null
        };
      });
      setFiles(list);
    });
    return () => unsub();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null); setSuccess(null); setUploading(true);
    try {
      if (file.size > 200 * 1024) {
        throw new Error("Datei zu groß (max 200KB)");
      }
      const text = await file.text();
      const docRef = await addDoc(collection(db, "open-data-files"), {
        filename: file.name,
        contentType: file.type || "text/plain",
        size: file.size,
        content: text,
        owner: auth.currentUser?.uid || null,
        createdAt: serverTimestamp()
      });
      setSuccess(`Hochgeladen: ${file.name} (ID: ${docRef.id})`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fehler beim Hochladen");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const openPreview = (file: OpenDataFile) => {
    setPreviewHTML(null);
    onSnapshot(collection(db, "open-data-files"), snap => {
      const doc = snap.docs.find(d => d.id === file.id);
      if (!doc) return;
      const data = doc.data() as DocumentData;
      if ((data.contentType || "").includes("html") || file.filename.endsWith(".html") || file.filename.endsWith(".htm")) {
        setPreviewHTML(String(data.content || ""));
      } else {
        setPreviewHTML(null);
      }
      setPreviewFile(file);
    });
  };

  const closePreview = () => {
    setPreviewFile(null);
    setPreviewHTML(null);
  };

  return (
    <main className="px-6 py-32 max-w-7xl mx-auto">
      <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-6">Open Data</h1>
        <p className="text-xl text-neutral-400 max-w-2xl">HTML / CSS / JS / TXT Dateien hochladen und ansehen. Öffentliche Liste (max 200KB pro Datei).</p>
      </motion.div>

      <div className="mb-12 flex flex-col md:flex-row gap-6 md:items-center">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Datei auswählen</label>
          <input type="file" accept=".html,.htm,.css,.js,.txt" onChange={handleUpload} disabled={uploading} className="w-full md:w-72 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black file:font-semibold file:cursor-pointer disabled:opacity-50" />
        </div>
        {uploading && <span className="text-neutral-400 animate-pulse">Wird hochgeladen...</span>}
        {error && <span className="text-red-400 text-sm">{error}</span>}
        {success && <span className="text-green-400 text-sm">{success}</span>}
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map(f => (
          <motion.button key={f.id} onClick={() => openPreview(f)} whileHover={{ y:-6 }} className="text-left p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white truncate max-w-[70%] group-hover:text-neutral-300 transition-colors">{f.filename}</h3>
              <span className="text-xs text-neutral-500">{Math.round(f.size/1024)} KB</span>
            </div>
            <p className="text-xs text-neutral-500">Typ: {f.contentType || "unbekannt"}</p>
            <p className="text-xs text-neutral-600 mt-1">{f.owner ? `User: ${f.owner}` : "Öffentlich"}</p>
          </motion.button>
        ))}
        {files.length === 0 && (
          <div className="col-span-full text-neutral-500">Noch keine Dateien hochgeladen.</div>
        )}
      </motion.div>

      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closePreview} />
          <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }} className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{previewFile.filename}</h2>
                <p className="text-xs text-neutral-500">{previewFile.contentType}</p>
              </div>
              <button onClick={closePreview} className="text-neutral-400 hover:text-white transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-auto">
              {previewHTML ? (
                <iframe title="preview" srcDoc={previewHTML} className="w-full h-[60vh] bg-white rounded" />
              ) : (
                <p className="text-neutral-400 text-sm">Keine HTML Vorschau verfügbar.</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
