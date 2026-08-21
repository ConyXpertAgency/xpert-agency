import React from 'react'
import { ProfesionalCard } from './index'
import Button from '../ui/Button'
import styles from '@/styles/Home/Second.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import Link from 'next/link'
import { getIcon } from '@/lib/supabase/icons'
import { resolveStorageUrl } from '@/lib/supabase/client'
import type { HomePartners } from '@/lib/supabase/types'

interface SecondProps {
    partners: HomePartners
    lang: string
}

const Second = ({ partners, lang }: SecondProps) => {
    return (
        <section className={styles.Second}>
            <header className={`${styles.Header}`}>
                <article>
                    <strong className='details'><RichText>{partners.badge}</RichText></strong>
                    <h1>
                        <span><RichText>{partners.title}</RichText></span>
                    </h1>
                </article>
                <p>{partners.description.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}</p>
            </header>
            <section className={`${styles.Content}`}>
                {partners.items.map((partner, i) => (
                    <ProfesionalCard key={i} name={partner.name} slug={partner.slug} reference={resolveStorageUrl(partner.logo) ?? '/cony.png'}>
                        <p>
                            {partner.description.map((line, j) => <RichText as="span" key={j}>{line}</RichText>)}
                        </p>
                        <section>
                            {partner.tags.map((tag, k) => (
                                <Button key={k} variant='outlineG'>{tag}</Button>
                            ))}
                        </section>
                    </ProfesionalCard>
                ))}
            </section>
            <ul className={styles.ListCard}>
                {partners.cards.map((card, i) => {
                    const hasImage = Boolean(card.image)
                    const isVision = i === 1 && hasImage

                    if (card.items && card.items.length > 0) {
                        return (
                            <li className={styles.ValuesCard} key={i}>
                                <div className={styles.ValuesContent}>
                                    <strong><RichText>{card.title}</RichText></strong>
                                    <ul>
                                        {card.items.map((item, j) => (
                                            <li key={j}>
                                                <span className={styles.ValuesBullet} />
                                                <p><RichText>{item}</RichText></p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )
                    }

                    return (
                        <li
                            className={`${styles.EditorialCard} ${isVision ? styles.EditorialReversed : ''}`}
                            key={i}
                        >
                            {hasImage && (
                                <div className={styles.EditorialImage}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={resolveStorageUrl(card.image) ?? ''}
                                        alt={card.title}
                                    />
                                </div>
                            )}
                            <div className={styles.EditorialText}>
                                <strong><RichText>{card.title}</RichText></strong>
                                {card.text && <p><RichText>{card.text}</RichText></p>}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <ul className={styles.DataList}>
                {partners.stats.map((stat, i) => (
                    <li key={i}>
                        <PictureSvg icon={getIcon(stat.icon)} size={48} />
                        <span>
                            <h1><RichText>{stat.value}</RichText></h1>
                            <p><RichText>{stat.label}</RichText></p>
                        </span>
                    </li>
                ))}
            </ul>
            <footer className={`${styles.Footer}`}>
                <strong><RichText>{partners.footer.text}</RichText></strong>
                <Link href={`/${lang}/contact`}>
                    <Button variant='outlineG'><RichText>{partners.footer.cta}</RichText></Button>
                </Link>
            </footer>
        </section>
    )
}

export default Second
