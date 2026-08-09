import React from 'react'
import styles from '@/styles/Home/Third.module.css'
import PictureSvg from '../ui/PictureSvg'
import { CiGlobe } from 'react-icons/ci'
import { IoChatboxEllipsesOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'
import { GrLineChart } from 'react-icons/gr'
import { FiUsers } from 'react-icons/fi'
import { AiOutlineTruck } from 'react-icons/ai'
import Button from '../ui/Button'
const Third = () => {
    return (
        <section className={styles.Third}>
            <header className={styles.Header}>
                <article>
                    <header>
                        <strong className='details'>GLOBAL REACH</strong>
                        <h1>
                            <span>Delivering impact</span>
                            <span>across borders.</span>
                        </h1>
                        <div className='line'></div>
                        <p>
                            <span>We partner with organizations worldwide</span>
                            <span>to deliver integrated manufacturing and</span>
                            <span>logistics solutions that drive operational</span>
                            <span>excellence and sustainable growth.</span>
                        </p>
                    </header>
                    <ul>
                        <li>
                            <PictureSvg variant={'full'} width={3.5} size={32} height={3.5} icon={CiGlobe} />
                            <span>
                                <h1>Local expertise, global standard</h1>
                                <p>
                                    <span>On-the-ground teams with deep</span>
                                    <span>industry knowledge.</span>
                                </p>
                            </span>
                        </li>
                        <li>
                            <PictureSvg variant={'full'} width={3.5} size={32} height={3.5} icon={IoShieldCheckmarkOutline} />
                            <span>
                                <h1>Cross-border execution</h1>
                                <p>
                                    <span>Seamless coordination across</span>
                                    <span>regions and time zones.</span>
                                </p>
                            </span>
                        </li>
                        <li>
                            <PictureSvg variant={'full'} width={3.5} size={32} height={3.5} icon={GrLineChart} />
                            <span>
                                <h1>Trusted by industry leaders</h1>
                                <p>
                                    <span>Long-term partnerships built on</span>
                                    <span>results and reliability.</span>
                                </p>
                            </span>
                        </li>
                    </ul>
                </article>
                <div className={styles.mapWrapper}>
                    {/* Mapa de fondo */}
                    <div className={styles.mapContainer}></div>

                    {/* Capa SVG para las líneas curvas de conexión */}
                    <svg className={styles.curvesLayer} viewBox="0 0 800 400">
                        <defs>
                            <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Arcos curvos conectando puntos clave (coordenadas adaptadas al viewBox de 800x400) */}
                        <path className={styles.curveLine} d="M 160,140 Q 300,60 408,112" />
                        <path className={styles.curveLine} d="M 408,112 Q 520,60 600,140" />
                        <path className={styles.curveLine} d="M 240,260 Q 350,300 424,220" />
                        <path className={styles.curveLine} d="M 600,140 Q 680,200 656,280" />
                    </svg>

                    {/* Nodos y clústeres brillantes */}
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                    <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                </div>
            </header>
            <ul className={`${styles.List}`}>
                <li>
                    <PictureSvg variant={'full'} width={4} height={4} size={32} icon={CiGlobe} />
                    <span>
                        <h1>35+</h1>
                        <strong>Countries served</strong>
                        <p>
                            <span>Projects successfully delivered</span>
                            <span>across five continents.</span>
                        </p>
                    </span>
                </li>
                <li>
                    <PictureSvg variant={'full'} width={4} height={4} size={32} icon={FiUsers} />
                    <h1>250+</h1>
                        <strong>Global expert network</strong>
                        <p>
                            <span>Engineers, consultants, and</span>
                            <span>specialists worldwide.</span>
                        </p>

                </li>
                <li>
                    <PictureSvg variant={'full'} width={4} height={4} size={32} icon={IoChatboxEllipsesOutline} />
                    <span>
                        <h1>12+</h1>
                        <strong>Languages supported</strong>
                        <p>
                            <span>Multilingual teams ensuring clear</span>
                            <span>communication everywhere.</span>
                        </p>
                    </span>
                </li>
                <li>
                    <PictureSvg variant={'full'} width={4} height={4} size={32} icon={AiOutlineTruck} />
                    <span>
                        <h1>100+</h1>
                        <strong>Cross-border projects</strong>
                        <p>
                            <span>End-to-end delivery across</span>
                            <span>complex global operations.</span>
                        </p>
                    </span>
                </li>
            </ul>
            <Button variant='outlineG' arrow={true}>Explore our global capabilities</Button>
        </section>
    )
}

export default Third