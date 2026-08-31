"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import styles from '@/styles/cases/CaseStudyList.module.css'
import type { CaseStudy } from '@/lib/supabase/types'
import RichText from '../ui/RichText'

interface CaseStudyListProps {
    items: CaseStudy[]
}

type Placement = "top" | "bottom"

const POPOVER_GAP = 10

const columnClass = (index: number) => {
    const column = index % 3

    if (column === 0) return styles.LeftColumn
    if (column === 2) return styles.RightColumn

    return styles.CenterColumn
}

const CaseStudyList = ({ items }: CaseStudyListProps) => {
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
        <section className={styles.Section} ref={rootRef} aria-label="Additional case studies">
            <ul className={styles.List}>
                {items.map((item, index) => {
                    const isActive = activeId === item.id
                    const panelId = `case-study-popover-${item.id}`
                    const label = item.title || item.client

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
                                <span><RichText>{label}</RichText></span>
                                <span aria-hidden="true" className={styles.Indicator}>+</span>
                            </button>
                            {isActive && (
                                <article
                                    ref={activePopoverRef}
                                    id={panelId}
                                    role="dialog"
                                    className={`${styles.Popover} ${placement === "top" ? styles.PopoverTop : styles.PopoverBottom}`}
                                    aria-label={`${label} details`}
                                >
                                    <header className={styles.PopoverHeader}>
                                        <strong><RichText>{item.client || item.title}</RichText></strong>
                                        {item.title && item.title !== item.client && (
                                            <span><RichText>{item.title}</RichText></span>
                                        )}
                                        {item.industry && (
                                            <p className={styles.Industry}><RichText>{item.industry}</RichText></p>
                                        )}
                                    </header>
                                    {item.project && (
                                        <p className={styles.Project}><RichText>{item.project}</RichText></p>
                                    )}
                                    {item.results && item.results.length > 0 && (
                                        <ul className={styles.Results}>
                                            {item.results.map((result, resultIndex) => (
                                                <li key={resultIndex}>
                                                    <IoShieldCheckmarkOutline aria-hidden="true" />
                                                    <span><RichText>{result}</RichText></span>
                                                </li>
                                            ))}
                                        </ul>
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

export default CaseStudyList
