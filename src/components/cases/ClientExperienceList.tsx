"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from '@/styles/cases/ClientExperienceList.module.css'
import type { ClientItem } from '@/lib/supabase/types'
import RichText from '../ui/RichText'

interface ClientExperienceListProps {
    title: string
    items: ClientItem[]
}

type Placement = "top" | "bottom"

const POPOVER_GAP = 10

const columnClass = (index: number) => {
    const column = index % 4

    if (column === 0) return styles.LeftColumn
    if (column === 3) return styles.RightColumn

    return styles.CenterColumn
}

const formatLocations = (locations?: string[], country?: string) => {
    const values = locations?.filter(Boolean)

    if (values && values.length > 0) {
        return values.join(' · ')
    }

    return country
}

const formatType = (type?: ClientItem['type']) => {
    if (!type) return undefined

    return type.charAt(0).toUpperCase() + type.slice(1)
}

const ClientExperienceList = ({ title, items }: ClientExperienceListProps) => {
    const [activeId, setActiveId] = useState<string | null>(null)
    const [pinnedId, setPinnedId] = useState<string | null>(null)
    const [placement, setPlacement] = useState<Placement>("bottom")
    const rootRef = useRef<HTMLElement | null>(null)
    const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
    const activePopoverRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveId(null)
                setPinnedId(null)
            }
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                setActiveId(null)
                setPinnedId(null)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('pointerdown', handlePointerDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [])

    useLayoutEffect(() => {
        if (!activeId) return

        const isFloatingMode = window.matchMedia('(min-width: 769px), (hover: hover)').matches
        if (!isFloatingMode) return

        const trigger = triggerRefs.current[activeId]
        const popover = activePopoverRef.current

        if (!trigger || !popover) return

        const triggerRect = trigger.getBoundingClientRect()
        const popoverRect = popover.getBoundingClientRect()
        const spaceBelow = window.innerHeight - triggerRect.bottom
        const spaceAbove = triggerRect.top
        const required = popoverRect.height + POPOVER_GAP

        setPlacement(spaceBelow < required && spaceAbove > spaceBelow ? "top" : "bottom")
    }, [activeId])

    if (items.length === 0) return null

    const openItem = (id: string) => setActiveId(id)

    const closeUnpinnedItem = (id: string) => {
        if (pinnedId !== id) {
            setActiveId(null)
        }
    }

    const togglePinnedItem = (id: string) => {
        const nextId = pinnedId === id ? null : id

        setPinnedId(nextId)
        setActiveId(nextId)
    }

    return (
        <section className={styles.Section} ref={rootRef} aria-label={title}>
            <header className={styles.Header}>
                <span className="details">Experience network</span>
                <h2><RichText>{title}</RichText></h2>
            </header>
            <ul className={styles.List}>
                {items.map((item, index) => {
                    const isActive = activeId === item.id
                    const panelId = `client-experience-popover-${item.id}`
                    const locations = formatLocations(item.locations, item.country)
                    const type = formatType(item.type)

                    return (
                        <li
                            key={item.id}
                            className={`${styles.Item} ${columnClass(index)} ${isActive ? styles.Active : ''}`}
                            onMouseEnter={() => openItem(item.id)}
                            onMouseLeave={() => closeUnpinnedItem(item.id)}
                        >
                            <button
                                ref={(node) => {
                                    triggerRefs.current[item.id] = node
                                }}
                                type="button"
                                className={styles.Trigger}
                                aria-expanded={isActive}
                                aria-controls={panelId}
                                onFocus={() => openItem(item.id)}
                                onBlur={() => closeUnpinnedItem(item.id)}
                                onClick={() => togglePinnedItem(item.id)}
                            >
                                <span><RichText>{item.name}</RichText></span>
                                <span aria-hidden="true" className={styles.Indicator}>→</span>
                            </button>
                            {isActive && (
                                <article
                                    ref={activePopoverRef}
                                    id={panelId}
                                    role="dialog"
                                    className={`${styles.Popover} ${placement === "top" ? styles.PopoverTop : styles.PopoverBottom}`}
                                    aria-label={`${item.name} details`}
                                >
                                    <strong><RichText>{item.name}</RichText></strong>
                                    {locations && (
                                        <p><RichText>{locations}</RichText></p>
                                    )}
                                    {item.industry && (
                                        <p><RichText>{item.industry}</RichText></p>
                                    )}
                                    {type && (
                                        <span><RichText>{type}</RichText></span>
                                    )}
                                </article>
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default ClientExperienceList
