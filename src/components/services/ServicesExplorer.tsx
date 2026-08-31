"use client"

import { useState } from 'react'
import styles from '@/styles/services/Services.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import { getIcon } from '@/lib/supabase/icons'
import type { ServiceGroup } from '@/lib/serviceGroups'
import { FaArrowRight } from 'react-icons/fa'

interface ServicesExplorerProps {
  groups: ServiceGroup[]
}

const ServicesExplorer = ({ groups }: ServicesExplorerProps) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const active = activeGroup ? groups.find((g) => g.id === activeGroup) : null

  if (active) {
    return (
      <div className={styles.Explorer}>
        <div className={styles.ExplorerHeader}>
          <button className={styles.BackBtn} onClick={() => setActiveGroup(null)}>
            ← All services
          </button>
          <h2 className={styles.ActiveTitle}>
            <PictureSvg icon={getIcon(active.icon)} size={28} />
            <RichText>{active.title}</RichText>
            <span className={styles.Count}>{active.services.length} services</span>
          </h2>
        </div>
        <ul className={styles.Content}>
          {active.services.map((svc, i) => (
            <li key={i}>
              <PictureSvg size={32} className={styles.Picture} icon={getIcon(svc.icon)} variant='full' width={4.5} height={4.5} />
              <span className={styles.TextCardC}>
                <h1><RichText>{svc.title}</RichText></h1>
                {svc.text && <p><RichText>{svc.text}</RichText></p>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <ul className={styles.CategoryGrid}>
      {groups.map((group) => (
        <li key={group.id} className={styles.CategoryCard} onClick={() => setActiveGroup(group.id)}>
          <PictureSvg size={32} className={styles.Picture} icon={getIcon(group.icon)} variant='full' width={4.5} height={4.5} />
          <span className={styles.TextCardC}>
            <h1><RichText>{group.title}</RichText></h1>
            <p>{group.services.length} services</p>
          </span>
          <FaArrowRight className={styles.CategoryArrow} />
        </li>
      ))}
    </ul>
  )
}

export default ServicesExplorer
