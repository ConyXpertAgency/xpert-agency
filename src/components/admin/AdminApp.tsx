"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "@/styles/admin/Admin.module.css";
import { getAdminClient, getAccessToken } from "@/lib/supabase/admin";
import { updatePath } from "@/lib/dataPath";
import { insertAtSelection, wrapActiveSelection } from "@/lib/adminFormat";
import { COLLECTION_LABELS, LANGS, SECTION_LABELS, SECTION_ORDER, USED_SECTIONS, isUsedSection, supportsBackground } from "@/lib/adminSchema";
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

  const loadRows = async () => {
    const token = await getAccessToken();
    if (!token) return;
    const res = await fetch("/api/admin/content", { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json();
    if (res.ok) setRows(json.rows ?? []);
    else setError(json.error ?? "No se pudieron cargar los apartados");
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
    })();
    return () => {
      disposed = true;
      sub?.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setAuthError(signInError.message);
        setLoginBusy(false);
        return;
      }
      const ok = await verifyAndLoad();
      if (!ok) {
        await client.auth.signOut();
        setAuthError("Este usuario no está admitido como admin (revisa la tabla legacy_users).");
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Error de login");
    } finally {
      setLoginBusy(false);
    }
  };

  const logout = async () => {
    await getAdminClient().auth.signOut();
  };

  const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({ home: true });

  const toggleCollection = (collection: string) => {
    setOpenCollections((prev) => ({ ...prev, [collection]: !prev[collection] }));
  };

  const buildGroups = (
    keys: Iterable<string>
  ): { collection: string; label: string; keynames: { keyname: string; label: string; langs: Lang[] }[] }[] => {
    const map = new Map<string, { keyname: string; langs: Set<Lang> }[]>();
    for (const collection of keys) {
      const km = new Map<string, Set<Lang>>();
      for (const r of rows) {
        if (r.collection !== collection) continue;
        if (!km.has(r.keyname)) km.set(r.keyname, new Set());
        km.get(r.keyname)!.add(r.lang);
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
            langs: LANGS.filter((l) => langs.has(l)),
          })),
      });
    }
    return out;
  };

  const sidebar = useMemo(() => {
    const used = new Set<string>();
    const deprecated = new Set<string>();
    for (const r of rows) {
      (isUsedSection(r.collection, r.keyname) ? used : deprecated).add(r.collection);
    }
    const usedOrder = SECTION_ORDER.filter((c) => used.has(c));
    const usedExtra = [...used].filter((c) => !SECTION_ORDER.includes(c)).sort();
    const deprecatedOrder = [...deprecated].sort((a, b) => a.localeCompare(b));
    return {
      used: buildGroups([...usedOrder, ...usedExtra]),
      deprecated: buildGroups(deprecatedOrder),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  // Garantiza que el campo de imagen de fondo exista en apartados compatibles,
  // aunque la fila guardada sea anterior a esta función.
  const normalizeSectionData = (
    collection: string,
    keyname: string,
    raw: Record<string, unknown>
  ): Record<string, unknown> =>
    supportsBackground(collection, keyname)
      ? { background_image: "", background_overlay: 0, ...raw }
      : raw;

  const selectSection = (collection: string, keyname: string, lang?: Lang) => {
    const targetLang = lang ?? "en";
    const row = rows.find(
      (r) => r.collection === collection && r.keyname === keyname && r.lang === targetLang
    );
    setSelected({ collection, keyname, lang: targetLang });

    if (row) {
      setData(normalizeSectionData(collection, keyname, row.data as Record<string, unknown>));
      setCopiedFrom(null);
    } else {
      // El apartado no existe en este idioma: lo creamos copiando los datos
      // de otro idioma existente del mismo apartado (preferimos "en").
      const source = rows
        .filter((r) => r.collection === collection && r.keyname === keyname)
        .sort((a, b) => {
          const rank: Record<string, number> = { en: 0, es: 1, de: 2 };
          return (rank[a.lang] ?? 9) - (rank[b.lang] ?? 9);
        })[0];
      if (source) {
        setData(
          normalizeSectionData(
            collection,
            keyname,
            JSON.parse(JSON.stringify(source.data)) as Record<string, unknown>
          )
        );
        setCopiedFrom(source.lang);
      } else {
        setData(normalizeSectionData(collection, keyname, {}));
        setCopiedFrom(null);
      }
    }

    setJsonView(false);
    setSavedAt(null);
    setError(null);
    setConfirmDelete(false);
  };

  const switchLang = (lang: Lang) => {
    if (!selected) return;
    selectSection(selected.collection, selected.keyname, lang);
  };

  const patchPath = (path: string[], next: unknown) => {
    setData((prev) => updatePath(prev, path, next) as Record<string, unknown>);
  };

  const size = useMemo(() => {
    return {
      width: typeof data.width === "number" ? String(data.width) : "",
      height: typeof data.height === "number" ? String(data.height) : "",
    };
  }, [data]);

  const updateSize = (key: "width" | "height", value: string) => {
    const trimmed = value.trim();
    setData((prev) => {
      if (trimmed === "") return updatePath(prev, [key], undefined) as Record<string, unknown>;
      const num = Number(trimmed);
      if (!Number.isFinite(num)) return prev;
      return updatePath(prev, [key], num) as Record<string, unknown>;
    });
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
      setData(payload as Record<string, unknown>);
      setCopiedFrom(null);
      setSavedAt(new Date().toLocaleTimeString());
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
      setRows((prev) =>
        prev.filter(
          (r) =>
            !(r.collection === selected.collection && r.keyname === selected.keyname && r.lang === selected.lang)
        )
      );
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

  if (checking) {
    return <div className={styles.CenterScreen}>Verificando sesión…</div>;
  }

  if (!user) {
    return (
      <div className={styles.CenterScreen}>
        <form className={styles.LoginCard} onSubmit={login}>
          <h1>Admin · Xpert.agency</h1>
          <p className={styles.Muted}>Solo usuarios admitidos en legacy_users pueden entrar.</p>
          <label>
            <span>Email</span>
            <input
              type="email"
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
        <div>
          <strong>Xpert.agency — Admin</strong>
          <span className={styles.Muted}>{user.email ?? ""}</span>
        </div>
        <div className={styles.TopbarActions}>
          <button className={styles.PrimaryBtn} onClick={loadRows}>
            ↻ Recargar
          </button>
          <button className={styles.PrimaryBtn} onClick={save} disabled={!selected || busy}>
            {busy ? "Guardando…" : "💾 Guardar"}
          </button>
          <button className={styles.OutlineBtn} onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <div className={styles.Main}>
        <aside className={styles.Sidebar}>
          <h3>Apartados</h3>
          {sidebar.used.length === 0 && sidebar.deprecated.length === 0 && (
            <p className={styles.Muted}>Sin contenido todavía.</p>
          )}

          {sidebar.used.map((g) => {
            const open = openCollections[g.collection] ?? false;
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
                            onClick={() => selectSection(g.collection, k.keyname)}
                          >
                            {k.label}
                          </button>
                          <div className={styles.LangBadges}>
                            {LANGS.map((l) => {
                              const exists = k.langs.includes(l);
                              const isActive = active && selected.lang === l;
                              return (
                                <button
                                  key={l}
                                  title={
                                    exists
                                      ? `${l.toUpperCase()} (existe)`
                                      : `${l.toUpperCase()} (crear copiando de otro idioma)`
                                  }
                                  className={`${styles.LangBadge} ${isActive ? styles.ActiveLang : ""} ${
                                    exists ? "" : styles.LangBadgeNew
                                  }`}
                                  onClick={() => selectSection(g.collection, k.keyname, l)}
                                >
                                  {exists ? l.toUpperCase() : `+${l.toUpperCase()}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {sidebar.deprecated.length > 0 && (
            <div className={styles.DeprecatedBlock}>
              <h4>Contenido antiguo / sin uso</h4>
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
                          onClick={() => selectSection(g.collection, k.keyname)}
                        >
                          {k.label}
                        </button>
                        <div className={styles.LangBadges}>
                          {LANGS.map((l) => {
                            const exists = k.langs.includes(l);
                            const isActive = active && selected.lang === l;
                            return (
                              <button
                                key={l}
                                title={
                                  exists
                                    ? `${l.toUpperCase()} (existe)`
                                    : `${l.toUpperCase()} (crear copiando de otro idioma)`
                                }
                                className={`${styles.LangBadge} ${isActive ? styles.ActiveLang : ""} ${
                                  exists ? "" : styles.LangBadgeNew
                                }`}
                                onClick={() => selectSection(g.collection, k.keyname, l)}
                              >
                                {exists ? l.toUpperCase() : `+${l.toUpperCase()}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </aside>

        <section className={styles.Editor}>
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
                    collection={selected.collection} · keyname={selected.keyname} · lang={selected.lang}
                  </span>
                </div>
                <div className={styles.EditorHeaderActions}>
                  <div className={styles.LangSwitch}>
                    {LANGS.map((l) => {
                      const exists = rows.some(
                        (r) =>
                          r.collection === selected.collection &&
                          r.keyname === selected.keyname &&
                          r.lang === l
                      );
                      return (
                        <button
                          key={l}
                          title={exists ? `${l.toUpperCase()} (guardado)` : `${l.toUpperCase()} (nuevo)`}
                          className={`${styles.LangSwitchBtn} ${selected.lang === l ? styles.ActiveLang : ""}`}
                          onClick={() => switchLang(l)}
                        >
                          {l.toUpperCase()}
                          {exists ? "✓" : "+"}
                        </button>
                      );
                    })}
                  </div>
                  <div className={styles.SizeRow}>
                    <label>
                      W
                      <input
                        type="number"
                        value={size.width}
                        onChange={(e) => updateSize("width", e.target.value)}
                        placeholder="–"
                      />
                    </label>
                    <label>
                      H
                      <input
                        type="number"
                        value={size.height}
                        onChange={(e) => updateSize("height", e.target.value)}
                        placeholder="–"
                      />
                    </label>
                  </div>
                  <button
                    className={`${styles.DangerBtn} ${confirmDelete ? styles.ConfirmDanger : ""}`}
                    onClick={() => (confirmDelete ? removeRow() : setConfirmDelete(true))}
                  >
                    {confirmDelete ? "¿Seguro?" : "🗑 Delete"}
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
                  Opacity
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
                />
              ) : (
                <div className={styles.Canvas}>
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
                  Haz clic sobre un texto para editarlo. La toolbar formatea la selección del texto activo.
                </span>
                <button className={styles.PrimaryBtn} onClick={save} disabled={busy}>
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
