import React from 'react'
import RichText from '../ui/RichText'
import styles from '@/styles/Home/ProfesionalCard.module.css'

interface ProfesionalCardProps {
    reference?: string;
    name: string;
    slug: string;
    children?: React.ReactNode
}

const ProfesionalCard = ({reference = '/cony.png', name, slug, children}:ProfesionalCardProps) => {
  return (
    <article className={`${styles.Card}`}>
        <picture style={{backgroundImage: `url(${reference})`}}></picture>
        <header>
            <h1><RichText>{name}</RichText></h1>
            <strong className='details'><RichText>{slug}</RichText></strong>
        </header>
        <footer>
            {children}
        </footer>
    </article>
  )
}

export default ProfesionalCard