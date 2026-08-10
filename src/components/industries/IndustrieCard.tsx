import React from 'react'
import styles from '@/styles/industries/IndustrieCard.module.css'
import type { IconType } from 'react-icons'
import PictureSvg from '../ui/PictureSvg'

interface IndustrieCardProps extends React.HTMLAttributes<HTMLElement> {
    img?: string
    icon: IconType
}

const IndustrieCard = ({ img = 'hero-bg-20260205-153144-4f8569.jpg', style, className, children, icon }: IndustrieCardProps) => {
    const inlineStyle = {
        ...style,
        backgroundImage: img ? `url(${img})` : undefined,
    }
    return (
        <article
            className={`${styles.Card} ${className ?? ''}`}
            style={inlineStyle}
        >
            <div></div>
            <header>
                <PictureSvg icon={icon} variant='full' size={32} width={4} height={4}/>
            </header>
            <span className={`${styles.TextCard}`}>
                {children}
            </span>
        </article>
    )
}

export default IndustrieCard
