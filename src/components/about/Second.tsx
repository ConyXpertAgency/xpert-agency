import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import { BiSolidQuoteAltLeft } from 'react-icons/bi'
import { FaChartLine, FaRegUser } from 'react-icons/fa'
import styles from '@/styles/about/Second.module.css'
import { IoIosSearch, IoMdClipboard } from 'react-icons/io'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { FiBarChart, FiUsers } from 'react-icons/fi'
import { TfiReload } from 'react-icons/tfi'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { CiGlobe } from 'react-icons/ci'

const Second = () => {
    return (
        <section className={styles.Second}>
            <header className={styles.Header}>
                <span className={styles.TextH}>
                    <strong className='details'>HOW WE WORK.</strong>
                    <h1>
                        <span>A proven methodology.</span>
                        <span>Measurable results.</span>
                    </h1>
                    <p>
                        <span>We combine operational expertise, advanced analytics and hands-on execution</span>
                        <span>to deliver integrated solutions that drive efficiency, agility and sustainable growth</span>
                        <span>in manufacturing and logistics.</span>
                    </p>
                </span>
                <article className={styles.CardH}>
                    <header>
                        <PictureSvg icon={BiSolidQuoteAltLeft} size={32} />
                        <p>
                            <span>{"We don't just advise."}</span>
                            <span>We work side by side with</span>
                            <span>your team to deliver change</span>
                            <span>
                                that lasts.
                            </span>
                        </p>
                    </header>
                    <footer>
                        <PictureSvg icon={FaRegUser} />
                        <span>
                            <strong>Execution. Teamwork. Impact.</strong>
                            <p>{"That's how we work."}</p>
                        </span>
                    </footer>
                </article>
            </header>
            <ul className={styles.Content}>
                <li className={styles.number}>
                    01
                </li>
                <li className={styles.number}>
                    02
                </li>
                <li className={styles.number}>
                    03
                </li>
                <li className={styles.number}>
                    04
                </li>
                <li>
                    <article>
                        <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={IoIosSearch} />
                        <h1>1. Diagnose operations</h1>
                        <div className="line"></div>
                        <span className={styles.CardCText}>
                            <p>
                                <span>We analyze your processes,</span>
                                <span>data and performance</span>
                                <span>to uncover opportunities,</span>
                                <span>bottlenecks and risks.</span>
                            </p>
                            <ul>
                                <li>Process & data assessment</li>
                                <li>KPI baseline & benchmarking</li>
                                <li>Root cause analysis</li>
                            </ul>
                        </span>
                    </article>
                </li>
                <li>
                    <article>
                        <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={IoMdClipboard} />
                        <h1>2. Design improvement
                            roadmap</h1>
                        <div className="line"></div>
                        <span className={styles.CardCText}>
                            <p>
                                We co-createa tailored roadmap
                                with prioritized initiatives
                                and clear business impact.
                            </p>
                            <ul>
                                <li>Solution & process design</li>
                                <li>Business case & prioritization</li>
                                <li>Change & risk planning</li>
                            </ul>
                        </span>
                    </article>
                </li>
                <li>
                    <article>
                        <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={HiOutlineCog6Tooth} />
                        <h1>3. Implement
                            and coordinate</h1>
                        <div className="line"></div>
                        <span className={styles.CardCText}>
                            <p>We execute with precision,
                                coordinating people, technology
                                and processes for results.</p>
                            <ul>
                                <li>Project & program management</li>
                                <li>Technology & integration</li>
                                <li>Training & change enablement</li>
                            </ul>
                        </span>
                    </article>
                </li>
                <li>
                    <article>
                        <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={FiBarChart} />
                        <h1>4. Measure
                            and optimize</h1>
                        <div className="line"></div>
                        <span className={styles.CardCText}>
                            <p>We track results in real time
                                and continuously optimize
                                for long-term value.</p>
                            <ul>
                                <li>Performance tracking (KPI)</li>
                                <li>Continuous improvement</li>
                                <li>Scalability & innovation</li>
                            </ul>
                        </span>
                    </article>
                </li>
            </ul>
            <article className={styles.FooterCard}>
                <PictureSvg icon={TfiReload} size={32} />
                <span>
                    <strong>Continuous improvement cycle</strong>
                    <p>We learn, adapt and evolve-driving sustained impact across your organization.</p>    
                </span>
                <div></div>
            </article>
            <ul className={styles.List}>
                <li>
                    <PictureSvg size={32} icon={IoShieldCheckmarkOutline} variant='full' width={4.5} height={4.5} />
                    <span>
                        <h1>45+ years</h1>
                        <p>Of combined experience
delivering results </p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} icon={CiGlobe} variant='full' width={4.5} height={4.5} />
                    <span>
                        <h1>Global perspective</h1>
                        <p>Projects across Europе, Americas & Asia</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} icon={FaChartLine} variant='full' width={4.5} height={4.5} />
                    <span>
                        <h1>Measurable impact</h1>
                        <p>Data-driven solutions
that scale</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} icon={FiUsers} variant='full' width={4.5} height={4.5} className={styles.Svg} />
                    <span>
                        <h1>Client partnership</h1>
                        <p>Collaborative approach
focused on your success</p>
                    </span>
                </li>
            </ul>
        </section>
    )
}

export default Second