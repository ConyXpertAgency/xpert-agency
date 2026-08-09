import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import type { IconType } from 'react-icons'
import { CiGlobe } from 'react-icons/ci';
import { FaArrowRight } from 'react-icons/fa';
import styles from '@/styles/Home/OperationsCard.module.css'


interface OperationsCardProps {
    icon?: IconType;
    title?: string;
    children?: React.ReactNode
}

const OperationsCard = ({icon = CiGlobe,title = "test", children}:OperationsCardProps) => {
  return (
    <article className={`${styles.Card}`}>
        <PictureSvg className={styles.Img} radius={'var(--radius-md)'} width={4} height={4} variant='full' icon={icon} size={32}/>
        <span className={`${styles.Text}`}>
            <h1>{title} <FaArrowRight/></h1>
            <p>
                {children}
            </p>
        </span>
    </article>
  )
}

export default OperationsCard