import React from 'react'
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
            <h1>{name}</h1>
            <strong className='details'>{slug}</strong>
        </header>
        <footer>
            {children}
        </footer>
    </article>
  )
}

export default ProfesionalCard