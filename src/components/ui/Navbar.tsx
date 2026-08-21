"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from '@/styles/ui/Navbar.module.css'
import { FaChevronDown, FaArrowRight } from 'react-icons/fa'
import { LOCALES } from '@/lib/data'
import type { Lang, NavItem } from '@/lib/supabase/types'

interface NavbarProps {
    lang: Lang
    items: NavItem[]
}

const Navbar = ({ lang, items }: NavbarProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const localePath = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const contact = items.find((i) => i.href === '/contact')
    const links = items.filter((i) => i.href !== '/contact')

    const isActive = (href: string) =>
        href === '/' ? localePath === '/' : localePath === href || localePath.startsWith(`${href}/`)

    const onLangChange = (next: string) => {
        if (next === lang) return
        router.push(`/${next}${localePath}`)
    }

    return (
        <nav className={styles.Navbar}>
            <Image src={"/logo_largo_blanco2.webp"} alt='' width={500} height={50} />
            <ul>
                {links.map(({ href, label, hasDropdown }) => (
                    <Link key={href} href={`/${lang}${href}`}>
                        <li className={isActive(href) ? styles.active : undefined}>
                            <strong>{label} {hasDropdown && <FaChevronDown size={12} />}</strong>
                        </li>
                    </Link>
                ))}
            </ul>
            <section>
                <select id="lang" value={lang} onChange={(e) => onLangChange(e.target.value)}>
                    {LOCALES.map((l) => (
                        <option key={l} value={l}>{l.toUpperCase()}</option>
                    ))}
                </select>
                {contact && (
                    <Link className={styles.ContactBtn} href={`/${lang}${contact.href}`}>
                        {contact.label} <FaArrowRight className={styles.ContactArrow} />
                    </Link>
                )}
            </section>
        </nav>
    )
}

export default Navbar
