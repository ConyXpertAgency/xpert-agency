import React from 'react'
import styles from '@/styles/rbe/Four.module.css'
import PictureSvg from '../ui/PictureSvg'
import { FaChartLine, FaChevronDown, FaChevronRight, FaRegUser } from 'react-icons/fa'
import { LuBrainCog, LuUsers } from 'react-icons/lu'
import { IoSchoolOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'
import { FiTool } from 'react-icons/fi'
import { IoIosPulse } from 'react-icons/io'
import { BsBarChartLine } from 'react-icons/bs'

const Four = () => {
    return (
        <section className={styles.Four}>
            <header className={styles.Header}>
                <h1>10+1 Elements for ramp-up with RBE</h1>
                <p>A practical toolkit to stabilize operations fast, manage risks, and drive measurable performance improvements.</p>
            </header>
            <article className={styles.Content}>
                <ul className={styles.ListLeft}>
                    <li>
                        <PictureSvg variant='full' icon={FaRegUser} />
                        <div>01</div>
                        <span>
                            <strong>RBE Survey</strong>
                            <p>Shaping individual concepts</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={LuUsers} />
                        <div>03</div>
                        <span>
                            <strong>Interim Management Team</strong>
                            <p>Core team Specialists</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={IoShieldCheckmarkOutline} />
                        <div>05</div>
                        <span>
                            <strong>FMEA/What-If Analysis</strong>
                            <p>Described risks.
                                Preventives Correctives</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={FiTool} />
                        <div>07</div>
                        <span>
                            <strong>Embedded Tools</strong>
                            <p>Process mining Gamification.
                                Tutorials</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={IoSchoolOutline} />
                        <div>09</div>
                        <span>
                            <strong>Operations Training</strong>
                            <p>Shop floor based Skill training •
                                Skill coaching</p>
                        </span>
                    </li>
                </ul>
                <ul className={styles.ListRight}>
                    <li>
                        <PictureSvg variant='full' icon={FaRegUser} />
                        <div>02</div>
                        <span>
                            <strong>Three Phase Model</strong>
                            <p>Preparing Safeguarding
                                Performing</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={IoShieldCheckmarkOutline} />
                        <div>04</div>
                        <span>
                            <strong>Claim Management</strong>
                            <p>Requirements Set claims
                                Defend claims</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={IoIosPulse} />
                        <div>06</div>
                        <span>
                            <strong>Comprehensive Tests</strong>
                            <p>Flow exerciser System
                                exerciser etc.</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={LuBrainCog} />
                        <div>08</div>
                        <span>
                            <strong> Systems Training</strong>
                            <p>Systems thinking LEAN training.
                                Coaching</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg variant='full' icon={BsBarChartLine} />
                        <div>10</div>
                        <span>
                            <strong>Visualization & Reporting</strong>
                            <p>KPI tracking Gemba walks.
                                Standard reports</p>
                        </span>
                    </li>
                </ul>
            </article>
            <article className={styles.LastCard}>
                <header>
                <PictureSvg variant='full' icon={FaChartLine} size={38} width={5} height={5}/>
                    <h1>+1</h1>
                </header>
                <section>
                    <h1>Improvement Waves</h1>
                    <p>Exec-program Agile projects. Progress awards</p>
                </section>
                <PictureSvg className={styles.PictureLC} icon={FaChevronRight}/>
            </article>
        </section>
    )
}

export default Four