"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SliderConfig {
  label: string
  cssVar: string
  min: number
  max: number
  step: number
  default: number
  unit: string
  group: "hero" | "navbar" | "expert" | "cards" | "globalreach" | "roles" | "corefocus"
}

const STORAGE_KEY = "xpert-design-inspector"
const GROUPS_KEY = "xpert-design-inspector-groups"
const POS_KEY = "xpert-design-inspector-pos"

const PANEL_WIDTH = 300
const PANEL_HEADER_HEIGHT = 40
const BUTTON_HEIGHT = 40

const sliders: SliderConfig[] = [
  { label: "SITE MAX WIDTH", cssVar: "--site-max-width", min: 1000, max: 1600, step: 10, default: 1340, unit: "px", group: "hero" },
  { label: "SIDE PADDING", cssVar: "--side-padding", min: 16, max: 120, step: 4, default: 72, unit: "px", group: "hero" },
  { label: "HERO TOP PADDING", cssVar: "--hero-top-padding", min: 0, max: 180, step: 4, default: 0, unit: "px", group: "hero" },
  { label: "TITLE SIZE", cssVar: "--hero-title-size", min: 32, max: 80, step: 1, default: 44, unit: "px", group: "hero" },
  { label: "CARD GAP", cssVar: "--hero-card-gap", min: 8, max: 64, step: 2, default: 24, unit: "px", group: "hero" },
  { label: "LOWER RIGHT CARD HEIGHT", cssVar: "--lower-right-card-height", min: 120, max: 360, step: 4, default: 160, unit: "px", group: "hero" },
  { label: "EYEBROW SIZE", cssVar: "--eyebrow-size", min: 10, max: 20, step: 1, default: 12, unit: "px", group: "hero" },
  { label: "CTA TOP GAP", cssVar: "--cta-top-gap", min: 8, max: 64, step: 2, default: 24, unit: "px", group: "hero" },
  { label: "CTA BOTTOM GAP", cssVar: "--cta-bottom-gap", min: 8, max: 96, step: 2, default: 8, unit: "px", group: "hero" },
  { label: "MAP SIZE", cssVar: "--map-size", min: 40, max: 100, step: 2, default: 80, unit: "%", group: "hero" },
  { label: "NAV MENU GAP", cssVar: "--nav-menu-gap", min: 8, max: 48, step: 2, default: 48, unit: "px", group: "navbar" },
  { label: "EXPERT SECTION TOP GAP", cssVar: "--expert-section-top-gap", min: 0, max: 120, step: 4, default: 96, unit: "px", group: "expert" },
  { label: "EXPERT EYEBROW TO TITLE GAP", cssVar: "--expert-eyebrow-to-title-gap", min: 4, max: 64, step: 2, default: 12, unit: "px", group: "expert" },
  { label: "EXPERT TITLE LINE HEIGHT", cssVar: "--expert-title-line-height", min: 0.9, max: 1.4, step: 0.02, default: 1, unit: "", group: "expert" },
  { label: "EXPERT DESCRIPTION OFFSET", cssVar: "--expert-description-offset", min: -40, max: 80, step: 2, default: 0, unit: "px", group: "expert" },
  { label: "EXPERT CARD GAP", cssVar: "--expert-card-gap", min: 8, max: 40, step: 2, default: 16, unit: "px", group: "expert" },
  { label: "EXPERT CARD PADDING", cssVar: "--expert-card-padding", min: 8, max: 32, step: 2, default: 12, unit: "px", group: "expert" },
  { label: "EXPERT CARD IMAGE GAP", cssVar: "--expert-card-image-gap", min: 4, max: 24, step: 2, default: 8, unit: "px", group: "expert" },
  { label: "EXPERT CARD TEXT GAP", cssVar: "--expert-card-text-gap", min: 2, max: 20, step: 2, default: 6, unit: "px", group: "expert" },
  { label: "MISSION CONTENT Y", cssVar: "--mission-content-offset", min: -60, max: 120, step: 2, default: 0, unit: "px", group: "cards" },
  { label: "VISION CONTENT Y", cssVar: "--vision-content-offset", min: -60, max: 120, step: 2, default: 0, unit: "px", group: "cards" },
  { label: "VALUES CONTENT Y", cssVar: "--values-content-offset", min: -60, max: 120, step: 2, default: 0, unit: "px", group: "cards" },
  { label: "GR HEADING SIZE", cssVar: "--gr-heading-size", min: 1.5, max: 4, step: 0.1, default: 3, unit: "rem", group: "globalreach" },
  { label: "GR HEADING LINE HEIGHT", cssVar: "--gr-heading-line-height", min: 0.9, max: 1.4, step: 0.02, default: 1, unit: "", group: "globalreach" },
  { label: "GR TITLE GAP", cssVar: "--gr-title-gap", min: 0, max: 32, step: 1, default: 12, unit: "px", group: "globalreach" },
  { label: "GR DESCRIPTION GAP", cssVar: "--gr-description-gap", min: 0, max: 32, step: 1, default: 12, unit: "px", group: "globalreach" },
  { label: "GR BENEFIT GAP", cssVar: "--gr-benefit-gap", min: 0, max: 32, step: 1, default: 10, unit: "px", group: "globalreach" },
  { label: "GR MAP HEIGHT", cssVar: "--gr-map-height", min: 200, max: 600, step: 4, default: 400, unit: "px", group: "globalreach" },
  { label: "GR MAP TOP OFFSET", cssVar: "--gr-map-top", min: -60, max: 60, step: 2, default: 0, unit: "px", group: "globalreach" },
  { label: "GR BENEFIT TITLE SIZE", cssVar: "--gr-benefit-title-size", min: 0.6, max: 1.6, step: 0.05, default: 1.2, unit: "rem", group: "globalreach" },
  { label: "GR BENEFIT TEXT SIZE", cssVar: "--gr-benefit-text-size", min: 0.5, max: 1.2, step: 0.05, default: 0.9, unit: "rem", group: "globalreach" },
  { label: "GR STAT NUMBER SIZE", cssVar: "--gr-stat-number-size", min: 1, max: 3.5, step: 0.1, default: 2, unit: "rem", group: "globalreach" },
  { label: "ROLES LEFT X", cssVar: "--roles-left-x", min: -200, max: 200, step: 2, default: 0, unit: "px", group: "roles" },
  { label: "ROLES LEFT Y", cssVar: "--roles-left-y", min: -200, max: 200, step: 2, default: 0, unit: "px", group: "roles" },
  { label: "ROLES RIGHT X", cssVar: "--roles-right-x", min: -200, max: 200, step: 2, default: 0, unit: "px", group: "roles" },
  { label: "ROLES RIGHT Y", cssVar: "--roles-right-y", min: -200, max: 200, step: 2, default: 0, unit: "px", group: "roles" },
  { label: "ROLES RIGHT WIDTH", cssVar: "--roles-right-width", min: 30, max: 90, step: 1, default: 80, unit: "%", group: "roles" },
  { label: "ROLES HEADER GAP", cssVar: "--roles-header-gap", min: 0, max: 120, step: 2, default: 0, unit: "px", group: "roles" },
  { label: "ROLES EYEBROW GAP", cssVar: "--roles-eyebrow-gap", min: 0, max: 48, step: 1, default: 32, unit: "px", group: "roles" },
  { label: "CORE FOCUS ICON SIZE", cssVar: "--core-focus-icon-size", min: 12, max: 36, step: 1, default: 14, unit: "px", group: "corefocus" },
  { label: "CORE FOCUS TEXT SIZE", cssVar: "--core-focus-text-size", min: 0.65, max: 1.2, step: 0.05, default: 0.8, unit: "rem", group: "corefocus" },
  { label: "CORE FOCUS COLUMN GAP", cssVar: "--core-focus-col-gap", min: 0, max: 32, step: 1, default: 8, unit: "px", group: "corefocus" },
  { label: "CORE FOCUS ROW GAP", cssVar: "--core-focus-row-gap", min: 0, max: 32, step: 1, default: 4, unit: "px", group: "corefocus" },
]

const GROUP_META: Record<string, { label: string; accent: string }> = {
  hero: { label: "HERO", accent: "#3b82f6" },
  navbar: { label: "NAVBAR", accent: "#22c55e" },
  expert: { label: "EXPERT NETWORK", accent: "#a855f7" },
  cards: { label: "MISSION / VISION / VALUES", accent: "#f59e0b" },
  globalreach: { label: "GLOBAL REACH", accent: "#06b6d4" },
  roles: { label: "ROLES & CAPABILITIES", accent: "#ec4899" },
  corefocus: { label: "CORE FOCUS AREAS", accent: "#f97316" },
}

const GROUP_ORDER = ["hero", "navbar", "expert", "cards", "globalreach", "roles", "corefocus"] as const

function getDefaults(): Record<string, number> {
  return Object.fromEntries(sliders.map((s) => [s.cssVar, s.default]))
}

function loadSaved(): Record<string, number> | null {
  try {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null) return null
    return parsed as Record<string, number>
  } catch {
    return null
  }
}

function saveToStorage(values: Record<string, number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch { /* ignore */ }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* ignore */ }
}

function loadGroupState(): Record<string, boolean> {
  try {
    if (typeof window === "undefined") return {}
    const raw = localStorage.getItem(GROUPS_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null) return {}
    return parsed as Record<string, boolean>
  } catch {
    return {}
  }
}

function saveGroupState(state: Record<string, boolean>) {
  try {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(state))
  } catch { /* ignore */ }
}

function loadPos(): { top: number; left: number } | null {
  try {
    if (typeof window === "undefined") return null
    const raw = localStorage.getItem(POS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null) return null
    if (typeof parsed.top !== "number" || typeof parsed.left !== "number") return null
    return parsed
  } catch {
    return null
  }
}

function savePos(top: number, left: number) {
  try {
    localStorage.setItem(POS_KEY, JSON.stringify({ top, left }))
  } catch { /* ignore */ }
}

function clampPos(top: number, left: number): { top: number; left: number } {
  const maxTop = window.innerHeight - PANEL_HEADER_HEIGHT - BUTTON_HEIGHT - 20
  const maxLeft = window.innerWidth - PANEL_WIDTH - 20
  return {
    top: Math.max(8, Math.min(top, maxTop)),
    left: Math.max(8, Math.min(left, maxLeft)),
  }
}

export default function DevPanel() {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Record<string, number>>(() => {
    const saved = loadSaved()
    return saved ?? getDefaults()
  })
  const [groups, setGroups] = useState<Record<string, boolean>>(() => loadGroupState())
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 100, left: 16 })

  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const applyVar = useCallback((cssVar: string, value: number, unit: string) => {
    document.documentElement.style.setProperty(cssVar, `${value}${unit}`)
  }, [])

  const handleChange = useCallback(
    (cssVar: string, value: number, unit: string) => {
      setValues((prev) => {
        const next = { ...prev, [cssVar]: value }
        saveToStorage(next)
        return next
      })
      applyVar(cssVar, value, unit)
    },
    [applyVar]
  )

  const toggleGroup = useCallback((group: string) => {
    setGroups((prev) => {
      const next = { ...prev, [group]: !prev[group] }
      saveGroupState(next)
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    const restored = getDefaults()
    for (const s of sliders) {
      applyVar(s.cssVar, restored[s.cssVar], s.unit)
    }
    clearStorage()
    setValues(restored)
  }, [applyVar])

  const copySettings = useCallback(() => {
    const lines = sliders.map((s) => `${s.label}: ${values[s.cssVar]}${s.unit}`)
    const text = lines.join("\n")
    navigator.clipboard.writeText(text).catch(() => {})
  }, [values])

  useEffect(() => {
    for (const s of sliders) {
      applyVar(s.cssVar, values[s.cssVar], s.unit)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const saved = loadPos()
    const newPos = saved
      ? clampPos(saved.top, saved.left)
      : clampPos(window.innerHeight - 200, 16)
    setPos((prev) => {
      if (prev.top === newPos.top && prev.left === newPos.left) return prev
      return newPos
    })
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => clampPos(prev.top, prev.left))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const onDragStart = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    dragOffset.current = {
      x: e.clientX - pos.left,
      y: e.clientY - pos.top,
    }
    e.preventDefault()
  }, [pos])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return
      const rawLeft = e.clientX - dragOffset.current.x
      const rawTop = e.clientY - dragOffset.current.y
      const clamped = clampPos(rawTop, rawLeft)
      setPos(clamped)
    }
    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      setPos((prev) => {
        savePos(prev.top, prev.left)
        return prev
      })
    }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
    }
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 99999,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 12,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "#22c55e",
          color: "#000",
          border: "none",
          borderRadius: 6,
          padding: "6px 12px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,.4)",
        }}
      >
        {open ? "\u2715 Close" : "\u2699 Design Panel"}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: BUTTON_HEIGHT + 4,
            left: 0,
            background: "#0f172a",
            color: "#e2e8f0",
            border: "1px solid #334155",
            borderRadius: 10,
            width: PANEL_WIDTH,
            maxHeight: "calc(100dvh - 100px)",
            overflowY: "auto",
            boxShadow: "0 8px 32px rgba(0,0,0,.6)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <div
            onMouseDown={onDragStart}
            style={{
              fontWeight: 700,
              fontSize: 13,
              color: "#22c55e",
              padding: "12px 16px",
              borderBottom: "1px solid #1e293b",
              cursor: "grab",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ opacity: 0.4, fontSize: 10 }}>{'\u2807'}</span>
            DESIGN INSPECTOR
          </div>

          <div style={{ padding: "8px 0" }}>
            {GROUP_ORDER.map((groupKey) => {
              const meta = GROUP_META[groupKey]
              const isOpen = groups[groupKey] !== false
              const groupSliders = sliders.filter((s) => s.group === groupKey)

              return (
                <div key={groupKey}>
                  <button
                    onClick={() => toggleGroup(groupKey)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      background: "transparent",
                      border: "none",
                      borderBottom: isOpen ? "1px solid #1e293b" : "none",
                      color: meta.accent,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textAlign: "left" as const,
                    }}
                  >
                    <span style={{ fontSize: 9, opacity: 0.7, width: 12, textAlign: "center" as const }}>
                      {isOpen ? "\u25bc" : "\u25b6"}
                    </span>
                    <span
                      style={{
                        width: 3,
                        height: 14,
                        borderRadius: 2,
                        background: meta.accent,
                        opacity: 0.6,
                        flexShrink: 0,
                      }}
                    />
                    {meta.label}
                  </button>

                  {isOpen && (
                    <div style={{ padding: "6px 16px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                      {groupSliders.map((s) => (
                        <div key={s.cssVar} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                            <span>{s.label}</span>
                            <span style={{ color: meta.accent, fontWeight: 600 }}>
                              {values[s.cssVar]}{s.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={s.min}
                            max={s.max}
                            step={s.step}
                            value={values[s.cssVar]}
                            onChange={(e) => handleChange(s.cssVar, Number(e.target.value), s.unit)}
                            style={{
                              width: "100%",
                              accentColor: meta.accent,
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ display: "flex", gap: 8, padding: "8px 16px 12px", borderTop: "1px solid #1e293b" }}>
            <button
              onClick={resetAll}
              style={{
                flex: 1,
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Reset all
            </button>
            <button
              onClick={copySettings}
              style={{
                flex: 1,
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Copy settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
