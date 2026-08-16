import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import type { IconType } from 'react-icons'
import styles from '@/styles/Home/InformationCard.module.css'


interface InformationCardProps {
    title?: string
    description?: string
    icon: IconType
    children?: React.ReactNode
}

const InformationCard = ({ icon, description, title, children }: InformationCardProps) => {
    return (
        <article className={styles.Card}>
            <PictureSvg className={styles.Picture} variant="full" width={2.5} height={2.5} size={26} icon={icon} />
            {children ? children : (
                <article className={styles.Text}>
                <h1><RichText>{title}</RichText></h1>
                <p><RichText>{description}</RichText></p>
                </article>
            )}
        </article>
    )
}

export default InformationCard