import React from 'react'
import type { IconType } from 'react-icons'
import styles from '../../styles/ui/PictureSvg.module.css'

interface PictureSvgProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'full' | 'outline' | 'ghost' | 'base' | 'alt'
    size?: number
    icon: IconType
    width?: number
    height?: number
}

const variantMap: Record<string, string> = {
    full: styles.full,
    outline: styles.outline,
    ghost: styles.ghost,
    alt: styles.alt,
}

const PictureSvg = ({ variant = 'base', icon: Icon, size = 24, width, height, className, style, ...rest }: PictureSvgProps) => {
    const toRem = (value: number) => `${value}rem`
    const inlineStyle =
        width || height
            ? { ...style, width: width ? toRem(width) : undefined, height: height ? toRem(height) : undefined }
            : style
    return (
        <span
            className={`${styles.base} ${variantMap[variant] ?? ''} ${className ?? ''}`}
            style={inlineStyle}
            {...rest}
        >
            <Icon size={size} />
        </span>
    )
}

export default PictureSvg
