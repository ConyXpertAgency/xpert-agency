import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/cases/CardContent.module.css';

interface CardContentProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    slug?: string;
    img?: string;
    description?: string;
    reference?: string;
    children?: React.ReactNode;
}

const CardContent = ({ 
    title = 'test', 
    slug = 'test', 
    style, 
    img = 'hero-bg-20260205-153144-4f8569.jpg', 
    description = 'test', 
    reference = '/cases', 
    children,
    ...rest 
}: CardContentProps) => {
    
    const inlineStyle: React.CSSProperties = {
        ...style,
        backgroundImage: img ? `url(${img})` : undefined,
    };

    return (
        <article className={styles.Card} {...rest}>
            <header className={styles.Header} style={inlineStyle}>
                <div className={styles.Picture}></div>
                <div className={styles.TitleContainer}>
                    <h1>{title}</h1>
                    <span>{slug}</span>
                </div>
                <p>
                    {description}
                </p>
            </header>
            <ul>
                {children}
            </ul>
            <Link href={reference}>
                View Project <FaArrowRight />
            </Link>
        </article>
    );
};

export default CardContent;