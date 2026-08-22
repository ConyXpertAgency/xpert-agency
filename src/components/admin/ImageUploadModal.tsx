"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import { getAccessToken } from "@/lib/supabase/admin";

interface GalleryImage {
  name: string;
  path: string;
  url: string;
}

interface ImageUploadModalProps {
  onUpload: (url: string) => void;
  onClose: () => void;
}

const ImageUploadModal = ({ onUpload, onClose }: ImageUploadModalProps) => {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = useCallback(async (): Promise<GalleryImage[]> => {
    const token = await getAccessToken();
    const res = await fetch("/api/admin/upload", {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Error al cargar la galería");
    return json.images ?? [];
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchGallery()
      .then((images) => {
        if (!cancelled) setGallery(images);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error al cargar la galería");
      })
      .finally(() => {
        if (!cancelled) setLoadingGallery(false);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchGallery]);

  const refreshGallery = async () => {
    setLoadingGallery(true);
    setError(null);
    try {
      setGallery(await fetchGallery());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar la galería");
    } finally {
      setLoadingGallery(false);
    }
  };

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

  const applyExternalUrl = () => {
    const url = externalUrl.trim();
    if (!url) return;
    onUpload(url);
  };

  return (
    <div className={styles.ModalOverlay} onClick={onClose}>
      <div className={`${styles.IconModal} ${styles.ImageModal}`} onClick={(e) => e.stopPropagation()}>
        <header className={styles.ModalHeader}>
          <h2>Seleccionar imagen</h2>
          <button className={styles.CloseBtn} onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </header>

        <div className={styles.ImageModalBody}>
          <div className={styles.GalleryBar}>
            <strong>Imágenes subidas</strong>
            <button className={styles.OutlineBtn} onClick={refreshGallery} disabled={loadingGallery}>
              ↻ Actualizar
            </button>
          </div>

          {error && <p className={styles.ErrorText}>{error}</p>}

          <div className={styles.ImageGrid}>
            {loadingGallery && <p className={styles.IconLoading}>Cargando imágenes…</p>}
            {!loadingGallery && gallery.length === 0 && (
              <p className={styles.IconLoading}>Todavía no hay imágenes subidas.</p>
            )}
            {!loadingGallery &&
              gallery.map((img) => (
                <button
                  key={img.path}
                  className={styles.ImageCell}
                  title={img.name}
                  onClick={() => onUpload(img.path)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.name} loading="lazy" />
                  <span>{img.name}</span>
                </button>
              ))}
          </div>

          <div className={styles.ModalDivider}>
            <span>o</span>
          </div>

          <section className={styles.UploadBox}>
            <strong>Subir una nueva imagen</strong>
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
            <button className={styles.PrimaryBtn} onClick={submit} disabled={!file || uploading}>
              {uploading ? "Subiendo…" : "⬆ Subir e insertar URL"}
            </button>
          </section>

          <div className={styles.ModalDivider}>
            <span>o</span>
          </div>

          <section className={styles.UploadBox}>
            <strong>Usar una URL externa</strong>
            <div className={styles.UrlRow}>
              <input
                type="text"
                placeholder="https://ejemplo.com/imagen.png"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyExternalUrl()}
              />
              <button className={styles.PrimaryBtn} onClick={applyExternalUrl} disabled={!externalUrl.trim()}>
                Usar URL
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
