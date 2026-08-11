"use client";

import { useRef, useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import { getAccessToken } from "@/lib/supabase/admin";

interface ImageUploadModalProps {
  onUpload: (url: string) => void;
  onClose: () => void;
}

const ImageUploadModal = ({ onUpload, onClose }: ImageUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token ?? ""}` },
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al subir");
      onUpload(json.path ?? json.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={styles.IconModal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.ModalHeader}>
          <h2>Subir imagen (bucket uploads)</h2>
          <button className={styles.CloseBtn} onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>
        <div className={styles.UploadBox}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          {file && (
            <div className={styles.UploadPreview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(file)} alt="preview" />
              <span>
                {file.name} ({(file.size / 1024).toFixed(0)} KB)
              </span>
            </div>
          )}
          {error && <p className={styles.ErrorText}>{error}</p>}
          <button className={styles.PrimaryBtn} onClick={submit} disabled={!file || uploading}>
            {uploading ? "Subiendo…" : "Subir e insertar URL"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
