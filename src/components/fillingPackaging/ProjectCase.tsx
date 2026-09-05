"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";

export interface FillingPackagingCase {
  id: string;
  number: string;
  client: string;
  location: string;
  title: string;
  scope: string;
  outcomes: string[];
}

interface ProjectCaseProps {
  c: FillingPackagingCase;
}

const ProjectCase = ({ c }: ProjectCaseProps) => {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <article className={styles.CaseCard}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.CaseTrigger}
          aria-expanded={open}
          aria-controls={`dialog-${c.id}`}
          onClick={() => setOpen(true)}
        >
          <span className={styles.CaseNumber}>{c.number}</span>
          <span className={styles.CaseClient}>{c.client}</span>
          <span className={styles.CaseLocation}>{c.location}</span>
          <h3 className={styles.CaseTitle}>{c.title}</h3>
          <p className={styles.CaseScope}>{c.scope}</p>
          <span className={styles.CaseLogoSlot} aria-hidden="true">
            <span>{c.client.slice(0, 2).toUpperCase()}</span>
          </span>
          <span className={styles.CaseMore}>View details →</span>
        </button>
      </article>

      <dialog
        ref={dialogRef}
        id={`dialog-${c.id}`}
        className={styles.CaseDialog}
        aria-label={`${c.client} — ${c.title}`}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            close();
          }
        }}
      >
        <form method="dialog" className={styles.CaseDialogInner}>
          <header className={styles.CaseDialogHeader}>
            <span className={styles.CaseNumber}>{c.number}</span>
            <div>
              <strong>{c.client}</strong>
              <span>{c.location}</span>
            </div>
            <button
              type="button"
              className={styles.CaseClose}
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
          </header>
          <h3 className={styles.CaseDialogTitle}>{c.title}</h3>
          <div className={styles.CaseDialogSection}>
            <strong>Scope of delivery</strong>
            <p>{c.scope}</p>
          </div>
          <div className={styles.CaseDialogSection}>
            <strong>Delivered outcomes</strong>
            <ul>
              {c.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
          <footer className={styles.CaseDialogFooter}>
            <span>{c.number} International Assignment</span>
            <button type="button" className={styles.CaseCloseText} onClick={close}>
              Close
            </button>
          </footer>
        </form>
      </dialog>
    </>
  );
};

export default ProjectCase;
