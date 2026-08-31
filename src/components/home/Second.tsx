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
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'
import { SlTarget } from 'react-icons/sl'
import { IoDiamondOutline, IoEyeOutline } from 'react-icons/io5'

interface SecondProps {
    partners: HomePartners
    lang: string
}

const Second = ({ partners, lang }: SecondProps) => {
    const purposeIntro = partners.description[1]
    const purpose = partners.purpose
    const purposeIcons = [SlTarget, IoEyeOutline, IoDiamondOutline]

    return (
        <section className={`${styles.Second} ${sectionBgClass(partners)}`} style={sectionBgStyle(partners)}>
            <div className={styles.ExpertCanvas}>
                <div className={styles.ExpertInner}>
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
                                        <Button key={k} variant='softOutline'><RichText as="span">{tag}</RichText></Button>
                                    ))}
                                </section>
                            </ProfesionalCard>
                        ))}
                    </section>
                </div>
            </div>
            <section className={styles.PurposeSection}>
                <div className={styles.PurposeInner}>
                    <article className={styles.PurposeIntro}>
                        <strong><RichText>{purpose?.badge}</RichText></strong>
                        <h2>
                            {purpose?.title.map((line, i) => (
                                <span key={i}><RichText>{line}</RichText></span>
                            ))}
                        </h2>
                        {purposeIntro && <p><RichText>{purposeIntro}</RichText></p>}
                    </article>
                    <ul className={styles.ListCard}>
                        {partners.cards.map((card, i) => {
                            const visionImage = i === 1 ? resolveStorageUrl(card.image) ?? '/hero-bg-20260205-153144-4f8569.jpg' : null
                            const isVision = Boolean(visionImage)
                            const PurposeIcon = purposeIcons[i]

                            if (card.items && card.items.length > 0) {
                                return (
                                    <li className={styles.ValuesCard} key={i}>
                                        <div className={styles.ValuesContent}>
                                            {PurposeIcon && <PurposeIcon className={styles.PurposeIcon} aria-hidden="true" />}
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
                                    <div className={styles.EditorialText}>
                                        {PurposeIcon && <PurposeIcon className={styles.PurposeIcon} aria-hidden="true" />}
                                        <strong><RichText>{card.title}</RichText></strong>
                                        {card.text && <p><RichText>{card.text}</RichText></p>}
                                    </div>
                                    {visionImage && (
                                        <div className={styles.EditorialImage}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={visionImage}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>
            <section className={styles.ImpactBand}>
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
            </section>
            <section className={styles.PurposeCTA}>
                <footer className={`${styles.Footer}`}>
                    <strong><RichText>{partners.footer.text}</RichText></strong>
                    <Link href={`/${lang}/contact`}>
                        <Button variant='outlineG'><RichText>{partners.footer.cta}</RichText></Button>
                    </Link>
                </footer>
            </section>
        </section>
    )
}

export default Second
