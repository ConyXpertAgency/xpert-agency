import React from 'react'
import styles from '@/styles/rbe/Four.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { FaChartLine, FaChevronRight } from 'react-icons/fa'
import { getIcon } from '@/lib/supabase/icons'
import type { RbeFour } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface FourProps {
    four: RbeFour
}

const Four = ({ four }: FourProps) => {
    return (
        <section className={`${styles.Four} ${sectionBgClass(four)}`} style={sectionBgStyle(four)}>
            <header className={styles.Header}>
                <h1><RichText>{four.title}</RichText></h1>
                <p><RichText>{four.subtitle}</RichText></p>
            </header>
            <article className={styles.Content}>
                <ul className={styles.ListLeft}>
                    {four.left.map((item, i) => (
                        <li key={i}>
                            <PictureSvg variant='full' icon={getIcon(item.icon)} />
                            <div><RichText>{item.number}</RichText></div>
                            <span>
                                <strong><RichText>{item.title}</RichText></strong>
                                <p><RichText>{item.text}</RichText></p>
                            </span>
                        </li>
                    ))}
                </ul>
                <ul className={styles.ListRight}>
                    {four.right.map((item, i) => (
                        <li key={i}>
                            <PictureSvg variant='full' icon={getIcon(item.icon)} />
                            <div><RichText>{item.number}</RichText></div>
                            <span>
                                <strong><RichText>{item.title}</RichText></strong>
                                <p><RichText>{item.text}</RichText></p>
                            </span>
                        </li>
                    ))}
                </ul>
            </article>
            <article className={styles.LastCard}>
                <header>
                <PictureSvg variant='full' icon={FaChartLine} size={38} width={5} height={5}/>
                    <h1><RichText>{four.extra.number}</RichText></h1>
                </header>
                <section>
                    <h1><RichText>{four.extra.title}</RichText></h1>
                    <p><RichText>{four.extra.text}</RichText></p>
                </section>
                <PictureSvg className={styles.PictureLC} icon={FaChevronRight}/>
            </article>
        </section>
    )
}

export default Four
