import Link from 'next/link'
import React from 'react'
import Button from '../ui/Button'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { CiGlobe } from 'react-icons/ci'
import { GiChart, GiRobotGrab } from 'react-icons/gi'
import styles from '@/styles/Home/First.module.css'
import InformationCard from './InformationCard'
import PictureSvg from '../ui/PictureSvg'
import { FaArrowRight, FaCogs, FaProjectDiagram, FaTruckMoving } from 'react-icons/fa'

const First = () => {
    return (
        <header className={styles.First}>
            <section className={styles.Left}>
                <strong className="details">MANUFACTURING & LOGISTICS CONSULTING</strong>
                <header>
                    <h1><span>Experts in integrated</span>
                        <span>improvement of</span>
                        manufacturing and
                        logistics.</h1>
                    <p><span>Process improvement, automation, digital transformation,</span>
                        and operational reengineering.</p>
                    <article className={styles.Buttons}>
                        <Link href={'/contact'}>
                            <Button variant="full" arrow={true}>
                                Contact us
                            </Button>
                        </Link>
                        <Link href={'/services'}>
                            <Button arrow={true} variant="outline">
                                View services
                            </Button>
                        </Link>

                    </article>
                </header>
                <footer>
                    <InformationCard icon={IoShieldCheckmarkOutline}>

                        <h1>45+ years</h1>
                        <p>Combined experience delivering results</p>

                    </InformationCard>
                    <InformationCard icon={CiGlobe}>

                        <h1>International reach</h1>
                        <p><span>Projects across Europe,</span>Americas & Asia</p>

                    </InformationCard>
                    <InformationCard icon={GiChart}>

                        <h1>Measurable impact</h1>
                        <p><span>Data-driven solutions</span> that scale</p>

                    </InformationCard>
                </footer>
            </section>
            <section className={styles.Right}>
                <article>
                    <article className={`${styles.FirstCard} ${styles.CardRight}`}>
                        <header>
                            <strong>Operational impact</strong>
                        </header>
                        <article>
                            <span>
                                <h1>+27%</h1>
                                <p>Average productivity increase</p>
                            </span>
                            <div className={`${styles.chartContainer}`}>
                                <svg viewBox="0 0 400 250" width="100%" height="100%">
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#a3e635" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                    <path className={`${styles.chartArea}`} d="M 20 220 Q 80 150, 120 180 T 220 140 T 320 90 T 380 40 L 380 230 L 20 230 Z" />
                                    <path className={`${styles.chartLine}`} d="M 20 220 Q 80 150, 120 180 T 220 140 T 320 90 T 380 40" />
                                    <circle className={`${styles.glowPoint}`} cx="380" cy="40" r="6" />
                                </svg>
                            </div>
                        </article>
                    </article>
                    <section>
                        <article className={`${styles.SecondCard} ${styles.CardRight}`}>
                            <h1>Core focus areas</h1>
                            <ul>
                                <li>
                                    <PictureSvg variant='full' width={3} height={3} icon={FaCogs} />
                                    <strong>Process Optimization</strong>
                                </li>
                                <li>
                                    <PictureSvg variant='full' width={3} height={3} icon={GiRobotGrab} />
                                    <strong>Automation & Digitalization</strong>
                                </li>
                                <li>
                                    <PictureSvg variant='full' width={3} height={3} icon={FaTruckMoving} />
                                    <strong>Supply Chain Excellence</strong>
                                </li>
                                <li>
                                    <PictureSvg variant='full' width={3} height={3} icon={FaProjectDiagram} />
                                    <strong>Operational Reengineering</strong>
                                </li>
                            </ul>
                        </article>
                        <article className={`${styles.ThirdCard} ${styles.CardRight}`}>
                            <strong>Project success rate</strong>
                            <div className={`${styles.circularProgress}`}>
                                <span className={`${styles.progressValue}`}>98%</span>
                            </div>
                            <p><span>On-time & on-scope</span> delivery</p>
                        </article>
                    </section>
                    <article className={`${styles.FourCard} ${styles.CardRight}`}>
                        <header>
                            <strong>Global project delivery</strong>
                        </header>
                        <article>
                            <section>
                                <div className={`${styles.mapWrapper}`}>
                                    <div className={styles.mapContainer}></div>

                                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                                    <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                                </div>
                            </section>
                            <span className={`${styles.TextFourCard}`}>
                                <div className={`${styles.Jeje}`}></div>
                                <p><span>Delivering value</span><span> across industries</span>  and borders.</p>
                                <Link href={'/cases'} className='details'>See our cases <FaArrowRight /></Link>
                            </span>

                        </article>
                    </article>
                </article>
            </section>
        </header>
    )
}

export default First