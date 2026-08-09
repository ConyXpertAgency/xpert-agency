"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/styles/ui/Navbar.module.css'
import { FaChevronDown } from 'react-icons/fa'

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/industries', label: 'Industries', hasDropdown: true },
    { href: '/cases', label: 'Cases' },
]

const Navbar = () => {
    const pathname = usePathname()

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

    return (
        <nav className={styles.Navbar}>
            <Image src={"/xpert_agency_logo.png"} alt='' width={500} height={20} />
            <ul>
                {links.map(({ href, label, hasDropdown }) => (
                    <Link key={href} href={href}>
                        <li className={isActive(href) ? styles.active : undefined}>
                            <strong>{label} {hasDropdown && <FaChevronDown size={12} />}</strong>
                        </li>
                    </Link>
                ))}
            </ul>
            <section>
                <select id="lang">
                    <option value="en">EN </option>
                    <option value="es">ES </option>
                    <option value="de">DE </option>
                </select>
                <Link href={'/contact'}>
                    Contact us
                </Link>
            </section>
        </nav>
    )
}

export default Navbar
