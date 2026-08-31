import styles from '@/styles/about/AboutStatsBar.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { getIcon } from '@/lib/supabase/icons'
import type { TextItem } from '@/lib/supabase/types'

interface AboutStatsBarProps {
    stats: TextItem[]
}

const AboutStatsBar = ({ stats }: AboutStatsBarProps) => {
    return (
        <ul className={styles.ListLeft}>
            {stats.map((stat, i) => (
                <li key={i} className={styles.HCardF}>
                    <PictureSvg className='details' size={32} width={4} height={4} icon={getIcon(stat.icon ?? '')} />
                    <span className={styles.TextCardH}>
                        <h1><RichText>{stat.value}</RichText></h1>
                        <strong><RichText>{stat.label}</RichText></strong>
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default AboutStatsBar
