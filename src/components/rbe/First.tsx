import React from 'react'
import Button from '../ui/Button'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { getIcon } from '@/lib/supabase/icons'
import styles from '@/styles/rbe/First.module.css'
import Link from 'next/link'
import type { RbeFirst } from '@/lib/supabase/types'

interface FirstProps {
    first: RbeFirst
}

const First = ({ first }: FirstProps) => {
    return (
        <header className={styles.First}>
            <section className={styles.Left}>
                <section className={styles.Fleft}>
                    <article className={styles.TextLeft}>
                        <strong className='details'><RichText>{first.badge}</RichText></strong>
                        <h1>
                            {first.title.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                        </h1>
                        <p>
                            <RichText>{first.subtitle}</RichText>
                        </p>
                        <p>
                            <RichText>{first.text}</RichText>
                        </p>
                    </article>
                    <article className={styles.ButtonsLeft}>
                        <Link href={first.cta_primary_href || '/rbe'}>
                            <Button variant='full' arrow={true}><RichText>{first.cta_primary}</RichText></Button>
                        </Link>
                        <Link href={first.cta_secondary_href || '/rbe'}>
                            <Button variant='ghost' arrow={true}><RichText>{first.cta_secondary}</RichText></Button>
                        </Link>
                    </article>
                </section>
                <ul className={styles.ListLeft}>
                    {first.list.map((item, i) => (
                        <li key={i}>
                            <PictureSvg icon={getIcon(item.icon)} />
                            <span>
                                <h1><RichText>{item.title}</RichText></h1>
                                <p><RichText>{item.text}</RichText></p>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>
            <section className={styles.Right}>
                {first.cards.map((card, i) => (
                    <article key={i} className={styles.Card}>
                        <div><RichText>{card.number}</RichText></div>
                        <strong><RichText>{card.title}</RichText></strong>
                        <p><RichText>{card.text}</RichText></p>
                    </article>
                ))}
            </section>
        </header>
    )
}

export default First
