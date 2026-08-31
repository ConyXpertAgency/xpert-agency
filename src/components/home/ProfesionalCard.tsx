"use client"

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import RichText from '../ui/RichText'
import styles from '@/styles/Home/ProfesionalCard.module.css'

interface ProfesionalCardProps {
    reference?: string;
    name: string;
    slug: string;
    children?: React.ReactNode
}

type Placement = "top" | "bottom"
type Align = "start" | "center" | "end"

const POPOVER_GAP = 10
const VIEWPORT_GUTTER = 16

const ProfesionalCard = ({reference = '/cony.png', name, slug, children}:ProfesionalCardProps) => {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [placement, setPlacement] = useState<Placement>("bottom")
  const [align, setAlign] = useState<Align>("center")
  const cardRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const panelId = useId()
  const childNodes = React.Children.toArray(children)
  const description = childNodes[0]
  const actions = childNodes.slice(1)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        setPinned(false)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!cardRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setPinned(false)
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
    if (!open) return

    const trigger = triggerRef.current
    const popover = popoverRef.current
    if (!trigger || !popover) return

    const triggerRect = trigger.getBoundingClientRect()
    const popoverRect = popover.getBoundingClientRect()
    const spaceBelow = window.innerHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top
    const required = popoverRect.height + POPOVER_GAP
    const centeredLeft = triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
    const centeredRight = centeredLeft + popoverRect.width

    setPlacement(spaceBelow < required && spaceAbove > spaceBelow ? "top" : "bottom")

    if (centeredLeft < VIEWPORT_GUTTER) {
      setAlign("start")
    } else if (centeredRight > window.innerWidth - VIEWPORT_GUTTER) {
      setAlign("end")
    } else {
      setAlign("center")
    }
  }, [open])

  const openPopover = () => setOpen(true)
  const closeIfUnpinned = () => {
    if (!pinned) setOpen(false)
  }
  const togglePopover = () => {
    const next = !pinned
    setPinned(next)
    setOpen(next)
  }

  return (
    <article
        className={styles.Card}
        ref={cardRef}
        onMouseLeave={closeIfUnpinned}
    >
        <picture style={{backgroundImage: `url(${reference})`}}></picture>
        <header>
            <h1><RichText>{name}</RichText></h1>
            <strong className='details'><RichText>{slug}</RichText></strong>
        </header>
        <footer>
            <div
                ref={triggerRef}
                className={styles.DescriptionTrigger}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                aria-controls={panelId}
                onMouseEnter={openPopover}
                onFocus={openPopover}
                onBlur={closeIfUnpinned}
                onClick={togglePopover}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        togglePopover()
                    }
                }}
            >
                {description}
            </div>
            {actions}
        </footer>
        {open && description && (
            <div
                ref={popoverRef}
                id={panelId}
                role="dialog"
                className={`${styles.DescriptionPopover} ${placement === "top" ? styles.PopoverTop : styles.PopoverBottom} ${align === "start" ? styles.PopoverStart : align === "end" ? styles.PopoverEnd : styles.PopoverCenter}`}
                aria-label={`${name} full description`}
            >
                {description}
            </div>
        )}
    </article>
  )
}

export default ProfesionalCard
