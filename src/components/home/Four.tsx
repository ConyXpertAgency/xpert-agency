import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import styles from '@/styles/Home/Four.module.css'
import { OperationsCard } from './index'
import { getIcon } from '@/lib/supabase/icons'
import type { HomeRoles } from '@/lib/supabase/types'

interface FourProps {
    roles: HomeRoles
}

const Four = ({ roles }: FourProps) => {
    return (
        <section className={styles.Four}>
            <header className={styles.Header}>
                <span className={styles.Hleft}>
                    <strong className='details'><RichText>{roles.badge}</RichText></strong>
                    <h1>
                        <span><RichText>{roles.title}</RichText></span>
                    </h1>
                </span>
                <span className={styles.Hright}>
                    <p>
                        {roles.description.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </p>
                    <ul>
                        {roles.features.map((feature, i) => (
                            <li key={i}>
                                <PictureSvg icon={getIcon(feature.icon)} />
                                <strong><RichText>{feature.title}</RichText></strong>
                            </li>
                        ))}
                    </ul>
                </span>
            </header>
            <section className={`${styles.Content}`}>
                {roles.items.map((item, i) => (
                    <OperationsCard key={i} title={item.title}>
                        <RichText>{item.text}</RichText>
                    </OperationsCard>
                ))}
            </section>
            <ul className={styles.List}>
                {roles.stats.map((stat, i) => (
                    <li key={i}>
                        <PictureSvg variant='full' width={5} height={5} size={32} icon={getIcon(stat.icon)} />
                        <span className={styles.ListText}>
                            <h1><RichText>{stat.value}</RichText></h1>
                            <strong><RichText>{stat.label}</RichText></strong>
                            <p>
                                <span><RichText>{stat.text}</RichText></span>
                            </p>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Four
