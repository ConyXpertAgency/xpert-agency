import React from 'react'
import PictureSvg from '../ui/PictureSvg'
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
            <PictureSvg variant="full" width={4} height={4} size={28} icon={icon} />
            {children ? children : (
                <>
                <h1>{title}</h1>
                <p>{description}</p>
                </>
            )}
        </article>
    )
}

export default InformationCard