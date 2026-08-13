import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { BiSolidQuoteAltLeft } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import styles from '@/styles/about/Second.module.css'
import { TfiReload } from 'react-icons/tfi'
import { getIcon } from '@/lib/supabase/icons'
import type { AboutSecond } from '@/lib/supabase/types'

interface SecondProps {
    second: AboutSecond
}

const Second = ({ second }: SecondProps) => {
    return (
        <section className={styles.Second}>
            <header className={styles.Header}>
                <span className={styles.TextH}>
                    <strong className='details'><RichText>{second.badge}</RichText></strong>
                    <h1>
                        {second.title.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </h1>
                    <p>
                        {second.text.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </p>
                </span>
                <article className={styles.CardH}>
                    <header>
                        <PictureSvg icon={BiSolidQuoteAltLeft} size={32} />
                        <p>
                            {second.quote.lines.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                        </p>
                    </header>
                    <footer>
                        <PictureSvg icon={FaRegUser} />
                        <span>
                            <strong><RichText>{second.quote.author}</RichText></strong>
                            <p><RichText>{second.quote.sub}</RichText></p>
                        </span>
                    </footer>
                </article>
            </header>
            <ul className={styles.Content}>
                {second.steps.map((step, i) => (
                    <React.Fragment key={i}>
                        <li className={styles.CardO}>
                        <div className={styles.number}>
                            <RichText>{step.number}</RichText>
                        </div>
                            <article>
                                <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={getIcon(step.icon)} />
                                <h1><RichText>{step.title}</RichText></h1>
                                <div className="line"></div>
                                <span className={styles.CardCText}>
                                    <p>
                                        {step.text.map((line, j) => <RichText as="span" key={j}>{line}</RichText>)}
                                    </p>

                                    <ul>
                                        {step.bullets.map((bullet, k) => (
                                            <li key={k}><RichText>{bullet}</RichText></li>
                                        ))}
                                    </ul>
                                </span>
                            </article>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
            <article className={styles.FooterCard}>
                <PictureSvg icon={TfiReload} size={32} />
                <span className={styles.FooterCardTxt}>
                    <strong><RichText>{second.footer_card.title}</RichText></strong>
                    <p><RichText>{second.footer_card.text}</RichText></p>
                </span>
                <div></div>
            </article>
            <ul className={styles.List}>
                {second.stats.map((stat, i) => (
                    <li key={i}>
                        <PictureSvg size={32} icon={getIcon(stat.icon)} variant='full' width={4.5} height={4.5} />
                        <span>
                            <h1><RichText>{stat.value}</RichText></h1>
                            <p><RichText>{stat.label}</RichText></p>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Second
