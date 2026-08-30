import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/cases/CardContent.module.css';
import { resolveStorageUrl } from '@/lib/supabase/client';
import RichText from '../ui/RichText';

interface CardContentProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    slug?: string;
    img?: string;
    logo?: string;
    description?: string;
    reference?: string;
    children?: React.ReactNode;
}

const CardContent = ({
    title = '',
    slug,
    style,
    img,
    logo,
    description = '',
    reference,
    children,
    ...rest
}: CardContentProps) => {

    const inlineStyle: React.CSSProperties = {
        ...style,
        backgroundImage: img ? `url(${resolveStorageUrl(img) ?? img})` : undefined,
    };
    const logoSrc = resolveStorageUrl(logo) ?? logo;

    return (
        <article className={styles.Card} {...rest}>
            <header className={styles.Header} style={inlineStyle}>
                <div className={styles.Picture}></div>
                <div className={styles.TitleContainer}>
                    {logoSrc && (
                        <div className={styles.LogoWrap}>
                            <img className={styles.Logo} src={logoSrc} alt={title} />
                        </div>
                    )}
                    <h1><RichText>{title}</RichText></h1>
                    {slug && <span><RichText>{slug}</RichText></span>}
                </div>
                {description && (
                    <p>
                        <RichText>{description}</RichText>
                    </p>
                )}
            </header>
            <ul>
                {children}
            </ul>
            {reference && (
                <Link href={reference}>
                    View Project <FaArrowRight />
                </Link>
            )}
        </article>
    );
};

export default CardContent;