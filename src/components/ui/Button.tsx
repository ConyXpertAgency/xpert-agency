import React from 'react'
import styles from '../../styles/ui/Button.module.css'
import { FaArrowRight } from 'react-icons/fa'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'full' | 'outline' | 'ghost'
    children?: React.ReactNode
    arrow?: boolean
}

const variantMap: Record<string, string> = {
    full: styles.full,
    outline: styles.outline,
    ghost: styles.ghost,
}

const Button = ({ variant = 'full', children, arrow,className, ...rest }: ButtonProps) => {
    return (
        <button
            className={`${styles.base} ${variantMap[variant]} ${className ?? ''}`}
            {...rest}
        >
            {children}
            {arrow && <FaArrowRight className={styles.arrow} />}
        </button>
    )
}

export default Button
