import React from 'react'
import Image from 'next/image'
import styles from '@/styles/industries/IndustrieCard.module.css'
import type { IconType } from 'react-icons'
import PictureSvg from '../ui/PictureSvg'
import { resolveStorageUrl } from '@/lib/supabase/client'

interface IndustrieCardProps extends React.HTMLAttributes<HTMLElement> {
    img?: string
    icon: IconType
}

const IndustrieCard = ({ img = '/hero-bg-20260205-153144-4f8569.jpg', style, className, children, icon }: IndustrieCardProps) => {
    const src = resolveStorageUrl(img) ?? img
    return (
        <article
            className={`${styles.Card} ${className ?? ''}`}
            style={style}
        >
            {src && (
                <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={false}
                />
            )}
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
