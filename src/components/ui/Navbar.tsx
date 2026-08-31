"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from '@/styles/ui/Navbar.module.css'
import { FaChevronDown, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa'
import { LOCALES } from '@/lib/data'
import type { Lang, NavItem } from '@/lib/supabase/types'

interface NavbarProps {
    lang: Lang
    items: NavItem[]
    langs?: Lang[]
}

const Navbar = ({ lang, items, langs }: NavbarProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const menuId = useId()
    const [isOpen, setIsOpen] = useState(false)

    const localePath = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const contact = items.find((i) => i.href === '/contact')
    const links = items.filter((i) => i.href !== '/contact')

    const isActive = (href: string) =>
        href === '/' ? localePath === '/' : localePath === href || localePath.startsWith(`${href}/`)

    const onLangChange = (next: string) => {
        if (next === lang) return
        setIsOpen(false)
        router.push(`/${next}${localePath}`)
    }

    useEffect(() => {
        if (!isOpen) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [isOpen])

    return (
        <nav className={styles.Navbar} data-open={isOpen}>
            <Link className={styles.LogoLink} href={`/${lang}`} aria-label="Xpert Agency home">
                <Image src={"/logo_largo_blanco2.webp"} alt='' width={500} height={50} />
            </Link>
            <ul id={menuId}>
                {links.map(({ href, label, hasDropdown }) => (
                    <Link key={href} href={`/${lang}${href}`} onClick={() => setIsOpen(false)}>
                        <li className={isActive(href) ? styles.active : undefined}>
                            <strong>{label} {hasDropdown && <FaChevronDown size={12} />}</strong>
                        </li>
                    </Link>
                ))}
                {contact && (
                    <Link className={styles.MobileContactLink} href={`/${lang}${contact.href}`} onClick={() => setIsOpen(false)}>
                        <li className={isActive(contact.href) ? styles.active : undefined}>
                            <strong>{contact.label} <FaArrowRight className={styles.ContactArrow} /></strong>
                        </li>
                    </Link>
                )}
            </ul>
            <section>
                <select id="lang" value={lang} onChange={(e) => onLangChange(e.target.value)}>
                    {(langs ?? LOCALES).map((l) => (
                        <option key={l} value={l}>{l.toUpperCase()}</option>
                    ))}
                </select>
                {contact && (
                    <Link className={styles.ContactBtn} href={`/${lang}${contact.href}`}>
                        {contact.label} <FaArrowRight className={styles.ContactArrow} />
                    </Link>
                )}
                <button
                    className={styles.MenuButton}
                    type="button"
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-controls={menuId}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((value) => !value)}
                >
                    {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                </button>
            </section>
        </nav>
    )
}

export default Navbar
