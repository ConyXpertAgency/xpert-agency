import React from 'react'
import styles from '@/styles/services/Services.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import { HiOutlineCog } from 'react-icons/hi2'
import { GiRobotGrab } from 'react-icons/gi'
import { FiClipboard } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'
import { PiFactory } from 'react-icons/pi'
import { AiOutlineTruck } from 'react-icons/ai'
import { LuPuzzle } from 'react-icons/lu'
import { RiGraduationCapLine } from 'react-icons/ri'
import { IoBarChartOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'
import Button from '@/components/ui/Button'


const page = () => {
    return (
        <main className='AppShell'>
            <header className={styles.Header}>
                <article>
                    <strong className='details'>AREAS OF EXPERTISE</strong>
                    <h1>
                        Services
                    </h1>
                    <p>End-to-end expertise to optimize operations, accelerate
                        transformation, and drive measurable results.</p>
                </article>
                <article>
                    <p>
                        <strong className='details'>Expert-led transformation </strong>across manufacturing
                        and logistics-combining deep industry knowledge
                        with proven methodologies.
                    </p>
                </article>
            </header>
            <ul className={styles.Content}>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={HiOutlineCog} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Process Optimization</h1>
                        <p>Improve efficiency and reduce waste
                            across your operations.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={GiRobotGrab} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Automation & Digitalization</h1>
                        <p>Leverage automation and digital tools
                            to boost productivity.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={FiClipboard} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Project Management</h1>
                        <p>Deliver projects on time, on scope,
                            and on budget.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={FaRegUser} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Interim Management</h1>
                        <p>Experienced leaders to drive results
                            during critical transitions.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={PiFactory} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Lean Manufacturing</h1>
                        <p>Eliminate waste and builda culture of
                            continuous improvement.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={AiOutlineTruck} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Supply Chain Consulting</h1>
                        <p>Strengthen supply chains for agility,
                            resilience, and performance.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={LuPuzzle} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Systems Integration</h1>
                        <p>Connect people, processes, and
                            systems for seamless operations.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={RiGraduationCapLine} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Coaching & Training</h1>
                        <p>Build capabilities and empower teams
                            to excel.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={IoBarChartOutline} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>KPI Development</h1>
                        <p>Define and track the metrics that
                            drive meaningful results.</p>
                    </span>
                </li>
                <li>
                    <PictureSvg size={32} className={styles.Picture} icon={IoShieldCheckmarkOutline} variant='full' width={4.5} height={4.5} />
                    <span className={styles.TextCardC}>
                        <h1>Solution Validation</h1>
                        <p>Test, validate, and ensure solutions deliver
                            real-world impact.</p>
                    </span>
                </li>
            </ul>
            <article className={styles.FooterCard}>
                <header>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={FaRegUser} />
                    <span>
                        <strong>Need a tailored approach?</strong>
                        <p>{"Let's discuss how our experts can help you achieve your goals."}</p>
                    </span>
                </header>
                <Button variant='full' arrow={true}>Contact us</Button>
            </article>
        </main>
    )
}

export default page