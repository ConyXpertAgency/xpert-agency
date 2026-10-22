"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import { getAdminClient, getAccessToken } from "@/lib/supabase/admin";
import { updatePath } from "@/lib/dataPath";
import { insertAtSelection, wrapActiveSelection } from "@/lib/adminFormat";
import { COLLECTION_LABELS, DEFAULT_GLOBAL_REACH_NODES, getInitialSectionData, getSectionLanguages, LANGS, SECTION_LABELS, SECTION_ORDER, USED_SECTIONS, isUsedSection, supportsBackground } from "@/lib/adminSchema";
import type { Lang, ContentRow } from "@/lib/supabase/types";
import IconPickerModal from "./IconPickerModal";
import ImageUploadModal from "./ImageUploadModal";
import TextPropertiesModal from "./TextPropertiesModal";
import VisualEditor from "./VisualEditor";

interface Selection {
  collection: string;
  keyname: string;
  lang: Lang;
}

const SECTION_ID_SEP = ".";
const STORAGE_KEY = "admin_last_section";

function encodeSectionId(collection: string, keyname: string, lang: string): string {
  return `${collection}${SECTION_ID_SEP}${keyname}${SECTION_ID_SEP}${lang}`;
}

function decodeSectionId(id: string): { collection: string; keyname: string; lang: Lang } | null {
  const parts = id.split(SECTION_ID_SEP);
  if (parts.length !== 3 || !parts[0] || !parts[1]) return null;
  const lang = LANGS.find((supported) => supported === parts[2]);
  if (!lang) return null;
  return { collection: parts[0], keyname: parts[1], lang };
}

export default function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginBusy, setLoginBusy] = useState(false);

  const [selected, setSelected] = useState<Selection | null>(null);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [copiedFrom, setCopiedFrom] = useState<Lang | null>(null);
  const [jsonView, setJsonView] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [modal, setModal] = useState<null | "icons" | "image">(null);
  const [iconTarget, setIconTarget] = useState<string[] | null>(null);
  const [imageTarget, setImageTarget] = useState<string[] | null>(null);

  const [settingsTarget, setSettingsTarget] = useState<string[] | null>(null);
  const [settingsValue, setSettingsValue] = useState("");

  const [opacity, setOpacity] = useState("0.6");
  const [color, setColor] = useState("#05154B");


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarQuery, setSidebarQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [editorLoading, setEditorLoading] = useState(false);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [baseline, setBaseline] = useState("{}");
  const hasUnsavedChanges = Boolean(selected) && (
    JSON.stringify(data) !== baseline ||
    (jsonView && jsonDraft !== JSON.stringify(data, null, 2))
  );

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasUnsavedChanges]);

  const loadEditorData = (next: Record<string, unknown>) => {
    setBaseline(JSON.stringify(next));
    setData(next);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const loadRows = async () => {
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Tu sesión venció. Vuelve a entrar para cargar el contenido.");
      const res = await fetch("/api/admin/content", { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "No se pudieron cargar los apartados. Pulsa Recargar para intentarlo de nuevo.");
      setRows(json.rows ?? []);
      setError(null);
      return (json.rows ?? []) as ContentRow[];
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo conectar. Pulsa Recargar para intentarlo de nuevo.");
      return null;
    }
  };

  const verifyAndLoad = async () => {
    const token = await getAccessToken();
    if (!token) return false;
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!res.ok) return false;
    const json = await res.json();
    setUser({ email: json.email ?? undefined });
    await loadRows();
    return true;
  };

  useEffect(() => {
    let disposed = false;
    let sub: { subscription: { unsubscribe: () => void } } | null = null;
    (async () => {
      try {
      const client = getAdminClient();
      const { data } = await client.auth.getSession();
      if (disposed) return;
      if (data.session) await verifyAndLoad();
      if (disposed) return;
      setChecking(false);
      const s = client.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setUser(null);
          setRows([]);
          setSelected(null);
          setData({});
        }
      });
      sub = s.data;
      } catch {
        if (!disposed) setAuthError("No se pudo comprobar la sesión. Intenta entrar nuevamente.");
      } finally {
        if (!disposed) setChecking(false);
      }
    })();
    return () => {
      disposed = true;
      sub?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restoredRef = useRef(false);



  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoginBusy(true);
    try {
      const client = getAdminClient();
      const { error: signInError } = await client.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (signInError) {
        setAuthError("No se pudo iniciar sesión. Revisa tu correo y contraseña e inténtalo de nuevo.");
        setLoginBusy(false);
        return;
      }
      const ok = await verifyAndLoad();
      if (!ok) {
        await client.auth.signOut();
        setAuthError("Tu cuenta no tiene acceso al editor. Contacta a soporte para habilitarla.");
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Error de login");
    } finally {
      setLoginBusy(false);
    }
  };

  const logout = async () => {
    if (busy || (hasUnsavedChanges && !window.confirm("Tienes cambios sin guardar. ¿Quieres descartarlos y salir?"))) return;
    await getAdminClient().auth.signOut();
  };

  const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({ home: true });

  const toggleCollection = (collection: string) => {
    setOpenCollections((prev) => ({ ...prev, [collection]: !prev[collection] }));
  };

  const buildGroups = (
    keys: Iterable<string>, active: boolean
  ): { collection: string; label: string; keynames: { keyname: string; label: string; langs: Lang[] }[] }[] => {
    const map = new Map<string, { keyname: string; langs: Set<Lang> }[]>();
    for (const collection of keys) {
      const km = new Map<string, Set<Lang>>();
      for (const r of rows) {
        if (r.collection !== collection || isUsedSection(r.collection, r.keyname) !== active) continue;
        if (!km.has(r.keyname)) km.set(r.keyname, new Set());
        km.get(r.keyname)!.add(r.lang);
      }
      const initialSections = active ? USED_SECTIONS[collection] ?? [] : [];
      for (const keyname of initialSections) {
        if (!km.has(keyname)) km.set(keyname, new Set());
      }
      map.set(collection, [...km.entries()].map(([keyname, langs]) => ({ keyname, langs })));
    }
    const out: { collection: string; label: string; keynames: { keyname: string; label: string; langs: Lang[] }[] }[] = [];
    for (const [collection, entries] of map) {
      if (entries.length === 0) continue;
      out.push({
        collection,
        label: COLLECTION_LABELS[collection] ?? collection,
        keynames: entries
          .sort((a, b) => {
            const order = USED_SECTIONS[collection] ?? [];
            const ia = order.indexOf(a.keyname);
            const ib = order.indexOf(b.keyname);
            return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.keyname.localeCompare(b.keyname);
          })
          .map(({ keyname, langs }) => ({
            keyname,
            label: SECTION_LABELS[collection]?.[keyname] ?? keyname,
            langs: allLangs.filter((l) => langs.has(l)),
          })),
      });
    }
    return out;
  };

  const allLangs: Lang[] = [...LANGS];

  const sidebar = useMemo(() => {
    const used = new Set<string>(SECTION_ORDER);
    const deprecated = new Set<string>();
    for (const r of rows) {
      (isUsedSection(r.collection, r.keyname) ? used : deprecated).add(r.collection);
    }
    used.add("home");
    used.add("settings");
    const usedOrder = SECTION_ORDER.filter((c) => used.has(c));
    const usedExtra = [...used].filter((c) => !SECTION_ORDER.includes(c)).sort();
    const deprecatedOrder = [...deprecated].sort((a, b) => a.localeCompare(b));
    return {
      used: buildGroups([...usedOrder, ...usedExtra], true),
      deprecated: buildGroups(deprecatedOrder, false),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const query = sidebarQuery.trim().toLocaleLowerCase();
  const visibleGroups = !query
    ? sidebar.used
    : sidebar.used
      .map((group) => ({
        ...group,
        keynames: group.keynames.filter((section) =>
          `${group.label} ${section.label} ${group.collection} ${section.keyname}`
            .toLocaleLowerCase()
            .includes(query)
        ),
      }))
      .filter((group) => group.keynames.length > 0);

  // Garantiza que campos añadidos después de la creación de la fila existan
  // al editar: imagen de fondo en apartados compatibles y puntos del mapa
  // en Global Reach (con los mismos defaults que consume el sitio).
  const normalizeSectionData = (
    collection: string,
    keyname: string,
    raw: Record<string, unknown>
  ): Record<string, unknown> => {
    if (Array.isArray(raw)) return JSON.parse(JSON.stringify(raw)) as Record<string, unknown>;
    const base: Record<string, unknown> = supportsBackground(collection, keyname)
      ? { background_image: "", background_overlay: 0, ...raw }
      : { ...raw };
    if (collection === "home" && keyname === "global_reach" && !Array.isArray(base.nodes)) {
      base.nodes = JSON.parse(JSON.stringify(DEFAULT_GLOBAL_REACH_NODES));
    }
    return base;
  };

  const selectSection = (collection: string, keyname: string, lang?: Lang, sourceRows = rows) => {
    if (busy || (hasUnsavedChanges && !window.confirm("Tienes cambios sin guardar. ¿Quieres descartarlos y cambiar de apartado?"))) return;
    if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
    setEditorLoading(true);

    const sectionLanguages = getSectionLanguages(collection);
    const targetLang = sectionLanguages.find((supported) => supported === lang) ?? "en";
    const row = sourceRows.find(
      (r) => r.collection === collection && r.keyname === keyname && r.lang === targetLang
    );
    setSelected({ collection, keyname, lang: targetLang });

    const sectionId = encodeSectionId(collection, keyname, targetLang);
    window.location.hash = sectionId;
    try { localStorage.setItem(STORAGE_KEY, sectionId); } catch {}
    
    if (isMobile) setSidebarOpen(false);

    if (row) {
      loadEditorData(normalizeSectionData(collection, keyname, row.data as Record<string, unknown>));
      setCopiedFrom(row.copied_from ?? null);
    } else {
      // El apartado no existe en este idioma: lo creamos copiando los datos
      // de otro idioma existente del mismo apartado (preferimos "en").
      const source = sourceRows
        .filter((r) => r.collection === collection && r.keyname === keyname && sectionLanguages.includes(r.lang))
        .sort((a, b) => {
          const rank: Record<string, number> = { en: 0, es: 1, de: 2 };
          return (rank[a.lang] ?? 9) - (rank[b.lang] ?? 9);
        })[0];
      if (source) {
        loadEditorData(
          normalizeSectionData(
            collection,
            keyname,
            JSON.parse(JSON.stringify(source.data)) as Record<string, unknown>
          )
        );
        setCopiedFrom(source.lang);
      } else {
        loadEditorData(normalizeSectionData(collection, keyname, getInitialSectionData(collection, keyname, targetLang) ?? {}));
        setCopiedFrom(null);
      }
    }

    setJsonView(false);
    setSavedAt(null);
    setError(null);
    setConfirmDelete(false);

    loadTimerRef.current = setTimeout(() => setEditorLoading(false), 350);
  };

  useEffect(() => {
    if (restoredRef.current || rows.length === 0) return;
    restoredRef.current = true;

    const hash = window.location.hash.slice(1);
    const saved = hash || localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = decodeSectionId(saved);
    if (!parsed) return;

    const exists = rows.some(
      (r) => r.collection === parsed.collection && r.keyname === parsed.keyname && r.lang === parsed.lang
    );
    const frame = requestAnimationFrame(() => {
    if (exists) {
      selectSection(parsed.collection, parsed.keyname, parsed.lang);
    } else {
      const altExists = rows.some(
        (r) => r.collection === parsed.collection && r.keyname === parsed.keyname
      );
      if (altExists) selectSection(parsed.collection, parsed.keyname);
    }
    });
    return () => {
      cancelAnimationFrame(frame);
      restoredRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const switchLang = (lang: Lang) => {
    if (!selected) return;
    selectSection(selected.collection, selected.keyname, lang);
  };

  const patchPath = (path: string[], next: unknown) => {
    setData((prev) => updatePath(prev, path, next) as Record<string, unknown>);
  };

  const save = async () => {
    if (!selected) return;
    setError(null);
    let payload: unknown = data;
    if (jsonView) {
      try {
        payload = JSON.parse(jsonDraft);
      } catch (e) {
        setError(`El JSON no es válido: ${e instanceof Error ? e.message : String(e)}`);
        return;
      }
    }
    setBusy(true);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: selected.collection,
          keyname: selected.keyname,
          lang: selected.lang,
          data: payload,
          order_index:
            rows.find(
              (r) =>
                r.collection === selected.collection &&
                r.keyname === selected.keyname &&
                r.lang === selected.lang
            )?.order_index ?? 0,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al guardar");
      setRows((prev) => {
        const idx = prev.findIndex(
          (r) =>
            r.collection === selected.collection &&
            r.keyname === selected.keyname &&
            r.lang === selected.lang
        );
        const row: ContentRow = {
          collection: selected.collection,
          keyname: selected.keyname,
          lang: selected.lang,
          data: payload as Record<string, unknown>,
          order_index: prev[idx]?.order_index ?? 0,
        };
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = row;
          return next;
        }
        return [...prev, row];
      });
      loadEditorData(payload as Record<string, unknown>);
      if (jsonView) setJsonDraft(JSON.stringify(payload, null, 2));
      setCopiedFrom(null);
      setSavedAt(new Date().toLocaleTimeString());
      await loadRows();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setBusy(false);
    }
  };

  const removeRow = async () => {
    if (!selected) return;
    setBusy(true);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/admin/content", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al eliminar");
      await loadRows();
      setSelected(null);
      setData({});
      setConfirmDelete(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar");
    } finally {
      setBusy(false);
    }
  };

  const pickIcon = (name: string) => {
    if (iconTarget) patchPath(iconTarget, name);
    else insertAtSelection(name);
    setModal(null);
    setIconTarget(null);
  };

  const pickImage = (url: string) => {
    if (imageTarget) patchPath(imageTarget, url);
    else insertAtSelection(url);
    setModal(null);
    setImageTarget(null);
  };

  const openSettings = (path: string[], val: string) => {
    setSettingsTarget(path);
    setSettingsValue(val);
  };

  const applySettings = (next: string) => {
    if (settingsTarget) patchPath(settingsTarget, next);
    setSettingsTarget(null);
    setSettingsValue("");
  };

  const selectedRow = selected ? rows.find((row) =>
    row.collection === selected.collection && row.keyname === selected.keyname && row.lang === selected.lang
  ) : undefined;

  if (checking) {
    return <div className={styles.CenterScreen}>Verificando sesión…</div>;
  }

  if (!user) {
    return (
      <div className={styles.CenterScreen}>
        <form className={styles.LoginCard} onSubmit={login}>
          <h1>Admin · Xpert.agency</h1>
          <p className={styles.Muted}>Entra con tu correo y contraseña para editar el contenido de tu sitio.</p>
          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="admin@xpert.agency"
              required
            />
          </label>
          <label>
            <span>Contraseña</span>
            <input
              type="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {authError && <p className={styles.ErrorText}>{authError}</p>}
          <button className={styles.PrimaryBtn} type="submit" disabled={loginBusy}>
            {loginBusy ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.Shell}>
      <header className={styles.Topbar}>
        {isMobile && (
          <button className={styles.MenuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        )}
        <div>
          <strong>Xpert.agency — Administrador</strong>
          <span className={styles.Muted}>{user.email ?? ""}</span>
        </div>
        <div className={styles.TopbarActions}>
          <button className={styles.OutlineBtn} disabled={busy} onClick={async () => {
            const refreshed = await loadRows();
            if (selected && refreshed) selectSection(selected.collection, selected.keyname, selected.lang, refreshed);
          }}>
            ↻ Recargar
          </button>
          <button className={styles.PrimaryBtn} onClick={save} disabled={!selected || busy || (!hasUnsavedChanges && !selectedRow?.is_default)}>
            {busy ? "Guardando…" : "💾 Guardar"}
          </button>
          <button className={styles.OutlineBtn} onClick={logout} disabled={busy}>
            Salir
          </button>
        </div>
      </header>

      {error && !selected && <p className={styles.ErrorText} role="alert">{error}</p>}

      <div className={styles.Main}>
        {isMobile && sidebarOpen && <div className={styles.Overlay} onClick={() => setSidebarOpen(false)} />}
        <aside className={`${styles.Sidebar} ${isMobile && !sidebarOpen ? styles.SidebarClosed : ""}`}>
          <div className={styles.SidebarHeading}>
            <div>
              <h3>Contenido del sitio</h3>
              <span>{sidebar.used.reduce((total, group) => total + group.keynames.length, 0)} apartados · EN / ES / DE</span>
            </div>
          </div>
          <label className={styles.SidebarSearch}>
            <span>Buscar apartado</span>
            <input
              type="search"
              value={sidebarQuery}
              onChange={(event) => setSidebarQuery(event.target.value)}
              placeholder="Ej. casos, contacto, hero"
            />
          </label>
          {visibleGroups.length === 0 && (
            <p className={styles.Muted}>{sidebarQuery.trim() ? "No hay apartados que coincidan con la búsqueda." : "Sin contenido todavía."}</p>
          )}

          {visibleGroups.map((g) => {
            const open = Boolean(sidebarQuery.trim()) || (openCollections[g.collection] ?? false);
            return (
              <div key={g.collection} className={styles.Group}>
                <button
                  className={`${styles.GroupHeader} ${open ? styles.GroupHeaderOpen : ""}`}
                  onClick={() => toggleCollection(g.collection)}
                >
                  <span>{g.label}</span>
                  <span className={styles.GroupCaret}>{open ? "▾" : "▸"}</span>
                </button>
                {open && (
                  <div className={styles.GroupBody}>
                    {g.keynames.map((k) => {
                      const active =
                        selected?.collection === g.collection && selected.keyname === k.keyname;
                      return (
                        <div key={k.keyname} className={styles.SectionRow}>
                          <button
                            className={`${styles.SectionBtn} ${active ? styles.ActiveSection : ""}`}
                            onClick={() => selectSection(g.collection, k.keyname, selected?.lang ?? "en")}
                          >
                            {k.label}
                          </button>
                          {active && <span className={styles.SelectedLanguage}>{selected.lang.toUpperCase()}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {sidebar.deprecated.length > 0 && !sidebarQuery.trim() && (
            <details className={styles.DeprecatedBlock}>
              <summary>Contenido antiguo / sin uso ({sidebar.deprecated.reduce((total, group) => total + group.keynames.length, 0)})</summary>
              {sidebar.deprecated.map((g) => (
                <div key={g.collection} className={styles.Group}>
                  <div className={styles.DeprecatedCollection}>
                    <span>{COLLECTION_LABELS[g.collection] ?? g.collection}</span>
                    <span className={styles.DeprecatedTag}>deprecated</span>
                  </div>
                  {g.keynames.map((k) => {
                    const active =
                      selected?.collection === g.collection && selected.keyname === k.keyname;
                    return (
                      <div key={k.keyname} className={styles.SectionRow}>
                        <button
                          className={`${styles.SectionBtn} ${styles.DeprecatedSection} ${
                            active ? styles.ActiveSection : ""
                          }`}
                          onClick={() => selectSection(g.collection, k.keyname, selected?.lang ?? "en")}
                        >
                          {k.label}
                        </button>
                        {active && <span className={styles.SelectedLanguage}>{selected.lang.toUpperCase()}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </details>
          )}
        </aside>

        <section className={styles.Editor}>
          {editorLoading && <div className={styles.EditorLoader}><div className={styles.EditorSpinner} /></div>}
          {!selected ? (
            <div className={styles.EmptyState}>
              <p>Selecciona un apartado de la izquierda para editarlo.</p>
            </div>
          ) : (
            <>
              <header className={styles.EditorHeader}>
                <div>
                  <strong>
                    {COLLECTION_LABELS[selected.collection] ?? selected.collection} /{" "}
                    {SECTION_LABELS[selected.collection]?.[selected.keyname] ?? selected.keyname}
                  </strong>
                  <span className={styles.Muted}>
                    {getSectionLanguages(selected.collection).length === 1 ? "Esta página se administra únicamente en inglés." : `Idioma del contenido: ${selected.lang === "en" ? "inglés" : selected.lang === "es" ? "español" : "alemán"}`}
                  </span>
                  <span className={hasUnsavedChanges ? styles.UnsavedText : styles.Muted} role="status">
                    {hasUnsavedChanges ? "Cambios sin guardar" : "Sin cambios pendientes"}
                  </span>
                </div>
                <div className={styles.EditorHeaderActions}>
                  <div className={styles.LangSwitch}>
                    {getSectionLanguages(selected.collection).map((l) => {
                      const exists = rows.some(
                        (r) =>
                          r.collection === selected.collection &&
                          r.keyname === selected.keyname &&
                          r.lang === l && !r.is_default
                      );
                      return (
                        <button
                          key={l}
                          title={`${l.toUpperCase()} · ${l === "en" ? "Inglés" : l === "es" ? "Español" : "Alemán"} · ${exists ? "guardado" : "nuevo"}`}
                          aria-label={`Editar en ${l === "en" ? "inglés" : l === "es" ? "español" : "alemán"}${exists ? " (guardado)" : " (nuevo, copiar contenido)"}`}
                          aria-pressed={selected.lang === l}
                          disabled={busy}
                          className={`${styles.LangSwitchBtn} ${selected.lang === l ? styles.ActiveLang : ""}`}
                          onClick={() => switchLang(l)}
                        >
                          {l === "en" ? "Inglés" : l === "es" ? "Español" : "Alemán"}
                          <span aria-hidden="true">{exists ? "✓" : "+"}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className={`${styles.DangerBtn} ${confirmDelete ? styles.ConfirmDanger : ""}`}
                    disabled={busy || !selectedRow || selectedRow.is_default}
                    onClick={() => (confirmDelete ? removeRow() : setConfirmDelete(true))}
                  >
                    {confirmDelete ? "¿Confirmar eliminación?" : "Eliminar versión"}
                  </button>
                </div>
              </header>

              {copiedFrom && (
                <div className={styles.NewBanner}>
                  <strong>Nuevo apartado ({selected.lang.toUpperCase()})</strong>
                  <span>
                    Aún no existía este idioma: se ha copiado el contenido de{" "}
                    <b>{copiedFrom.toUpperCase()}</b>. Edita lo que necesites y pulsa{" "}
                    <b>Guardar</b> para crearlo.
                  </span>
                </div>
              )}

              {selectedRow?.is_default && !copiedFrom && (
                <div className={styles.NewBanner}>
                  <strong>Contenido listo para editar</strong>
                  <span>Estos son los valores que utiliza la web. Haz tus cambios y pulsa Guardar para crear esta versión.</span>
                </div>
              )}


              {!isUsedSection(selected.collection, selected.keyname) && (
                <div className={styles.NewBanner}>
                  <strong>⚠ Apartado sin uso</strong>
                  <span>
                    Este apartado es contenido antiguo: <b>el sitio ya no lo muestra</b>. Los
                    cambios que hagas aquí (incluida la imagen de fondo) no se verán en el
                    front-end. Edita los apartados actuales de la barra lateral.
                  </span>
                </div>
              )}

              <details className={styles.AdvancedTools} inert={busy}>
              <summary>Formato de texto y opciones avanzadas</summary>
              <div className={styles.Toolbar}>
                <button title="Negrita" onClick={() => wrapActiveSelection("<strong>", "</strong>")}>
                  <b>B</b>
                </button>
                <button title="Cursiva" onClick={() => wrapActiveSelection("<em>", "</em>")}>
                  <i>I</i>
                </button>
                <button title="Título" onClick={() => wrapActiveSelection("<span style=\"font-size:1.8em;font-weight:700\">", "</span>")}>
                  H1
                </button>
                <button title="Subtítulo" onClick={() => wrapActiveSelection("<span style=\"font-size:1.3em;font-weight:600\">", "</span>")}>
                  H2
                </button>
                <button title="Párrafo" onClick={() => wrapActiveSelection("<span style=\"display:inline\">", "</span>")}>
                  P
                </button>
                <button
                  title="Enlace"
                  onClick={() => {
                    const href = window.prompt("URL del enlace:", "https://") ?? "";
                    wrapActiveSelection(`<a href="${href}">`, "</a>");
                  }}
                >
                  🔗
                </button>
                <label className={styles.ToolOp}>
                  Opacidad
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                  />
                  <button onClick={() => wrapActiveSelection(`<span style="opacity:${opacity}">`, "</span>")}>
                    ✓
                  </button>
                </label>
                <label className={styles.ToolOp}>
                  Color
                  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                  <button onClick={() => wrapActiveSelection(`<span style="color:${color}">`, "</span>")}>
                    ✓
                  </button>
                </label>
                <button
                  title="Ícono (react-icons)"
                  onClick={() => {
                    setIconTarget(null);
                    setModal("icons");
                  }}
                >
                  ◎ Ícono
                </button>
                <button
                  title="Subir imagen"
                  className={styles.ImageBtn}
                  onClick={() => {
                    setImageTarget(null);
                    setModal("image");
                  }}
                >
                  🖼 Imagen
                </button>
                <button
                  title="Alternar vista JSON"
                  className={jsonView ? styles.ActiveLang : ""}
                  onClick={() => {
                    if (jsonView) {
                      try {
                        setData(JSON.parse(jsonDraft) as Record<string, unknown>);
                        setJsonView(false);
                      } catch {
                        setError("JSON inválido, no se puede volver a la vista visual");
                      }
                    } else {
                      setJsonDraft(JSON.stringify(data, null, 2));
                      setJsonView(true);
                    }
                  }}
                >
                  {"{ }"}
                </button>
              </div>
              </details>

              {error && <p className={styles.ErrorText}>{error}</p>}
              {savedAt && <p className={styles.SavedText}>Guardado a las {savedAt}</p>}

              {jsonView ? (
                <textarea
                  className={styles.Textarea}
                  value={jsonDraft}
                  onChange={(e) => {
                    setJsonDraft(e.target.value);
                    setSavedAt(null);
                  }}
                  spellCheck={false}
                  disabled={busy}
                />
              ) : (
                <div className={styles.Canvas} inert={busy}>
                  <VisualEditor
                    key={`${selected.collection}/${selected.keyname}/${selected.lang}`}
                    value={data}
                    onChange={setData}
                    onPickIcon={(path) => {
                      setIconTarget(path);
                      setModal("icons");
                    }}
                    onUploadImage={(path) => {
                      setImageTarget(path);
                      setModal("image");
                    }}
                    onOpenSettings={openSettings}
                    lang={selected.lang}
                    collection={selected.collection}
                    keyname={selected.keyname}
                  />
                </div>
              )}

              <footer className={styles.EditorFooter}>
                <span className={styles.Muted}>
                  Haz clic en un texto para editarlo. Los cambios se aplican al pulsar Guardar.
                </span>
                <button className={styles.PrimaryBtn} onClick={save} disabled={busy || (!hasUnsavedChanges && !selectedRow?.is_default)}>
                  {busy ? "Guardando…" : "💾 Guardar cambios"}
                </button>
              </footer>
            </>
          )}
        </section>
      </div>

      {modal === "icons" && (
        <IconPickerModal onPick={pickIcon} onClose={() => setModal(null)} />
      )}
      {modal === "image" && <ImageUploadModal onUpload={pickImage} onClose={() => setModal(null)} />}
      {settingsTarget && (
        <TextPropertiesModal
          value={settingsValue}
          onApply={applySettings}
          onClose={() => {
            setSettingsTarget(null);
            setSettingsValue("");
          }}
        />
      )}
    </div>
  );
}
