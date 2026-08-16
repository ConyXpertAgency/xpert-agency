import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import { SlTarget } from 'react-icons/sl'
import Button from '../ui/Button'
import { IoCallOutline } from 'react-icons/io5'
import Link from 'next/link'
import styles from '@/styles/rbe/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <article className={styles.ContactCard}>
                <header className={styles.TextCC}>
                    <PictureSvg icon={SlTarget} size={32}/>
                    <span>
                        <h1>Contact</h1>
                        <p>For ramp-up support, interim management and operational stabilization.</p>
                    </span>
                </header>
                <section className={styles.ActionCC}>
                    <article>
                        <PictureSvg icon={IoCallOutline} size={28} width={3.5} height={3.5} variant='full' />
                        <span>
                            <h1>Elmar A. Beckord</h1>
                            <p>+49 171 889 2788</p>
                        </span>
                    </article>
                    <Link href={'/contact'}>
                        <Button arrow={true} variant='outlineG'>Back to site</Button>
                    </Link>
                </section>
            </article>
            <article className={styles.Details}>
                <p>2026 RBE</p>
                <div></div>
                <strong className='details'>Admin</strong>
            </article>
        </footer>
    )
}

export default Footer