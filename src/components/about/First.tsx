import React from 'react'
import styles from '@/styles/about/First.module.css'
import { CiGlobe } from 'react-icons/ci'
import PictureSvg from '../ui/PictureSvg'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { IoIosSettings } from 'react-icons/io'
import { GrGroup } from 'react-icons/gr'
import { RiTargetLine } from 'react-icons/ri'
import { FaChartLine } from 'react-icons/fa'

const First = () => {
    return (
        <header className={styles.First}>
            <section className={styles.Left}>
                <header>
                    <strong className='details'>| ABOUT XPERT.AGENCY</strong>
                    <h1>Who we are</h1>
                    <h2>
                        <span>Experts in integrated improvement of</span>
                        <span>manufacturing and logistics.</span>
                    </h2>
                    <p>
                        <span>At Xpert.agency, we help organizations transform how they operate.</span>
                        <span>We combine deep industry knowledge with digital solutions,</span>
                        <span>automation and process excellence to design smarter, more</span>
                        <span>connected and more efficient operations.</span>
                    </p>
                    <ul className={styles.ListLeftH}>
                        <li>
                            <PictureSvg size={28} icon={FaChartLine} variant='full' width={3.5} height={3.5} />
                            <span className={styles.Text}>
                                <h1>Industry expertise</h1>
                                <p>
                                    <span>Deep understanding of manufacturing.</span>
                                    <span>logistics and supply chain.</span>
                                </p>

                            </span>
                        </li>
                        <li>
                            <PictureSvg size={28} icon={IoIosSettings} variant='full' width={3.5} height={3.5} />
                            <span className={styles.Text}>
                                <h1>Smart operations</h1>
                                <p>
                                    <span>Automation, digitization and data-driven</span>
                                    <span>decision making.</span>
                                </p>
                            </span>
                        </li>
                        <li>
                            <PictureSvg size={28} icon={GrGroup} variant='full' width={3.5} height={3.5} />
                            <span className={styles.Text}>
                                <h1>End-to-end approach</h1>
                                <p>
                                    <span>From strategy and design to</span>
                                    <span>implementation and continuous</span>
                                    <span>improvement.</span>
                                </p>
                            </span>
                        </li>
                        <li>
                            <PictureSvg size={28} icon={RiTargetLine} variant='full' width={3.5} height={3.5} />
                            <span className={styles.Text}>
                                <h1>Results that last</h1>
                                <p>
                                    <span>Measurable impact, sustainable</span>
                                    <span>solutions and long-term partnerships.</span>
                                </p>
                            </span>
                        </li>
                    </ul>
                </header>
                <ul className={styles.ListLeft}>
                    <li className={`${styles.HCardF}`}>
                        <PictureSvg className='details' size={32} width={4} height={4} icon={IoShieldCheckmarkOutline} />
                        <span className={`${styles.TextCardH}`}>
                            <h1>45+</h1>
                            <strong>Years of experience</strong>
                            <p>Delivering measurable
                               results.
                            </p>
                        </span>
                    </li>
                    <li className={`${styles.HCardF}`}>
                        <PictureSvg className='details' size={32} width={4} height={4} icon={CiGlobe} />
                        <span className={`${styles.TextCardH}`}>
                            <h1>20+</h1>
                            <strong>Countries</strong>
                            <p>
                                Projects across Europе,
                                Americas & Asia
                            </p>
                        </span>
                    </li>
                    <li className={`${styles.HCardF}`}>
                        <PictureSvg className='details' size={32} width={4} height={4} icon={FaChartLine} />
                        <span className={`${styles.TextCardH}`}>
                            <h1>150+</h1>
                            <strong>Successful projects</strong>
                            <p>
                                Across industries and
                                company sizes
                            </p>
                        </span>
                    </li>
                    <li className={`${styles.HCardF}`}>
                        <PictureSvg className='details' size={32} width={4} height={4} icon={GrGroup} />
                        <span className={`${styles.TextCardH}`}>
                            <h1>30+</h1>
                            <strong>Cross-functional experts</strong>
                            <p>
                                Engineers, analysts and
                                project leaders
                            </p>
                        </span>
                    </li>
                </ul>

            </section>
            <section className={styles.Right}>
                <article className={`${styles.PictureCard}`}>
                    <section>
                        <PictureSvg variant='full' radius='var(--radius-md)' size={32} icon={CiGlobe} />
                        <span className={styles.Text}>
                            <h1>
                                <span>Global perspective.</span>
                                <span>Local understanding.</span>
                            </h1>
                            <p>
                                We work side by side with our clients
                                to deliver value that transcends borders.
                            </p>
                        </span>
                    </section>
                    <div className={`${styles.mapWrapper}`}>
                        <div className={styles.mapContainer}></div>

                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                        <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                    </div>
                </article>
            </section>
        </header>
    )
}

export default First