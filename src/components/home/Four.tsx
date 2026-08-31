"use client";

import React, { useState } from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import styles from '@/styles/Home/Four.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import { getUiCopy } from '@/lib/i18n'
import { getIcon } from '@/lib/supabase/icons'
import type { HomeRoles, Lang } from '@/lib/supabase/types'
import type { ExpertiseGroup } from '@/lib/expertiseGroups'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'
import { FaArrowRight } from 'react-icons/fa'

interface FourProps {
    roles: HomeRoles
    groups: ExpertiseGroup[]
    lang: Lang
}

const Four = ({ roles, groups, lang }: FourProps) => {
    const [activeGroup, setActiveGroup] = useState<string | null>(null)
    const active = activeGroup ? groups.find((g) => g.id === activeGroup) : null
    const copy = getUiCopy(lang).roles

    // Líneas decorativas según nivel y count (coordenadas 0-100 en SVG 100x100)
// Posiciones colectivas fijas por id se resuelven vía CSS .pos-{id} (Four.module.css)
    const collectiveSpokes: [number, number][] = [
        [50, 16], // supply 2,1
        [16, 50], // projects 1,2
        [84, 50], // data 3,2
        [18, 82], // operations 1,3
        [50, 84], // people 2,3
        [82, 82], // technology 3,3
    ]
    const spokesByCount: Record<number, [number, number][]> = {
        // Hub arriba (50,32) → capabilities debajo en fila única
        3: [
            [18, 58],
            [50, 58],
            [82, 58],
        ],
        4: [
            [15, 58],
            [38, 58],
            [62, 58],
            [85, 58],
        ],
        5: [
            [18, 58],
            [50, 58],
            [82, 58],
            [28, 86],
            [72, 86],
        ],
        6: [
            [18, 58],
            [50, 58],
            [82, 58],
            [18, 86],
            [50, 86],
            [82, 86],
        ],
    }
    const spokes = active
        ? (spokesByCount[active.items.length] ?? spokesByCount[6].slice(0, active.items.length))
        : collectiveSpokes

    // Hub content según nivel
    const hubSub = active ? `${active.items.length} ${copy.capabilities}` : copy.expertCapabilities

    return (
        <section className={`${styles.Four} ${theme.LightSurface} ${sectionBgClass(roles)}`} style={sectionBgStyle(roles)}>
            <header className={styles.Header}>
                <span className={styles.Hleft}>
                    <strong className='details'><RichText>{copy.headingBadge}</RichText></strong>
                    <h1>
                        <span><RichText>{copy.headingTitle}</RichText></span>
                    </h1>
                </span>
                <span className={styles.Hright}>
                    <p className={styles.Description}>
                        {roles.description.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </p>
                    <ul className={styles.ProofPoints}>
                        {roles.features.map((feature, i) => (
                            <li key={i}>
                                <PictureSvg icon={getIcon(feature.icon)} />
                                <strong><RichText>{feature.title}</RichText></strong>
                            </li>
                        ))}
                    </ul>
                </span>
            </header>
            <section className={styles.HubWrap} aria-label={copy.expertiseMap}>
                <p className={styles.InteractionHint}>{copy.interactionHint}</p>
                <div
                    key={activeGroup ?? 'collective'}
                    className={`${styles.HubGrid} ${active ? styles.HubGridActive : ''}`}
                    data-level={active ? 'detail' : 'collective'}
                    data-count={active ? active.items.length : groups.length}
                >
                    <svg className={styles.Spokes} aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {spokes.map(([x2, y2], i) => (
                            <line key={i} x1="50" y1={active ? 32 : 50} x2={x2} y2={y2} />
                        ))}
                    </svg>
                    <div className={styles.Hub}>
                        {active && (
                            <button className={styles.BackBtn} onClick={() => setActiveGroup(null)} aria-label={copy.backToAllExpertise}>
                                ← {copy.allExpertise}
                            </button>
                        )}
                        {!active ? (
                            <>
                                <span className={styles.HubEyebrow}>{copy.collective}</span>
                                <strong className={styles.HubTitle}>{copy.expertise}</strong>
                            </>
                        ) : (
                            <strong className={styles.HubTitleActive}>{active.title}</strong>
                        )}
                        <span className={styles.HubSub}>{hubSub}</span>
                        <span className={styles.HubRing} aria-hidden="true" />
                    </div>
                    {!active
                        ? groups.map((group) => (
                              <button
                                  key={group.id}
                                  className={`${styles.Node} ${styles.CategoryNode} ${styles['pos-' + group.id]}`}
                                  onClick={() => setActiveGroup(group.id)}
                                  aria-label={copy.viewGroup.replace("{title}", group.title)}
                              >
                                      <h3 className={styles.NodeTitle}>
                                          <span>{group.title}</span>
                                          <FaArrowRight aria-hidden="true" />
                                      </h3>
                                      <span className={styles.NodeMeta}>{group.items.length} {copy.capabilities}</span>
                                  </button>
                              ))
                        : active.items.map((cap, i) => (
                              <article key={i} className={`${styles.Node} ${styles.CapabilityNode}`}>
                                  <h3 className={styles.NodeTitle}>
                                      <span>{cap}</span>
                                  </h3>
                              </article>
                          ))}
                </div>
            </section>
            <ul className={styles.List}>
                {roles.stats.map((stat, i) => (
                    <li key={i}>
                        <PictureSvg variant='full' width={5} height={5} size={32} icon={getIcon(stat.icon)} />
                        <span className={styles.ListText}>
                            <h1><RichText>{stat.value}</RichText></h1>
                            <strong><RichText>{stat.label}</RichText></strong>
                            <p>
                                <span><RichText>{stat.text}</RichText></span>
                            </p>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Four
