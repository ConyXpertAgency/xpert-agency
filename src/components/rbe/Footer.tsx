import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { SlTarget } from 'react-icons/sl'
import Button from '../ui/Button'
import { IoCallOutline } from 'react-icons/io5'
import Link from 'next/link'
import styles from '@/styles/rbe/Footer.module.css'
import type { RbeFooter } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface FooterProps {
    footer: RbeFooter
}

const Footer = ({ footer }: FooterProps) => {
    return (
        <footer className={`${styles.Footer} ${sectionBgClass(footer)}`} style={sectionBgStyle(footer)}>
            <article className={styles.ContactCard}>
                <header className={styles.TextCC}>
                    <PictureSvg icon={SlTarget} size={32}/>
                    <span>
                        <h1><RichText>{footer.title}</RichText></h1>
                        <p><RichText>{footer.text}</RichText></p>
                    </span>
                </header>
                <section className={styles.ActionCC}>
                    <article>
                        <PictureSvg icon={IoCallOutline} size={28} width={3.5} height={3.5} variant='full' />
                        <span>
                            <h1><RichText>{footer.contact_name}</RichText></h1>
                            <p><RichText>{footer.contact_phone}</RichText></p>
                        </span>
                    </article>
                    <Link href={'/contact'}>
                        <Button arrow={true} variant='outlineG'><RichText>{footer.cta}</RichText></Button>
                    </Link>
                </section>
            </article>
            <article className={styles.Details}>
                <p><RichText>{footer.year}</RichText></p>
                <div></div>
                <strong className='details'>Admin</strong>
            </article>
        </footer>
    )
}

export default Footer
