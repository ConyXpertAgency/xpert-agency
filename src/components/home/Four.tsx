import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import { CiGlobe } from 'react-icons/ci'
import { IoRocketOutline, IoShieldCheckmarkOutline } from 'react-icons/io5'
import { GrGroup } from 'react-icons/gr'
import styles from '@/styles/Home/Four.module.css'
import { OperationsCard } from './index'
import { BiTargetLock } from 'react-icons/bi'

const Four = () => {
    return (
        <section className={styles.Four}>
            <header className={styles.Header}>
                <span className={styles.Hleft}>
                    <strong className='details'>ROLES & CAPABILITIES</strong>
                    <h1>
                        <span>The expertise to</span>
                        <span>transform operations.</span>
                    </h1>
                </span>
                <span className={styles.Hright}>
                    <p>
                        <span>Xpert.agency connects organizations with a curated</span>
                        <span>network of senior experts who drive project execution</span>
                        <span>and operational transformation across industrial and</span>
                        <span>logistics environments.</span>
                    </p>
                    <ul>
                        <li>
                            <PictureSvg icon={GrGroup} />
                            <strong>Senior specialists</strong>
                        </li>
                        <li>
                            <PictureSvg icon={IoShieldCheckmarkOutline} />
                            <strong>Proven impact</strong>
                        </li>
                        <li>
                            <PictureSvg icon={CiGlobe} />
                            <strong>Global coverage</strong>
                        </li>
                    </ul>
                </span>
            </header>
            <section className={`${styles.Content}`}>
                <OperationsCard title='Project Management'>
                    <span>Plan, execute and deliver complex</span>
                    <span>projects on time, on scope</span>
                    <span>and on budget.</span>
                </OperationsCard>
                <OperationsCard title='Operations Leadership'>
                    <span>Lead operations with focus on</span>
                    <span>performance, efficiency,</span>
                    <span>and team development.</span>
                </OperationsCard>
                <OperationsCard title='Systems Integration'>
                    <span>Integrate people, processes and</span>
                    <span>technologies to create seamless</span>
                    <span>and scalable operations.</span>
                </OperationsCard>
                <OperationsCard title='Process Optimization'>
                    <span>Identify bottlenecks and redesign</span>
                    <span>processes to improve productivity</span>
                    <span>and reduce costs.</span>
                </OperationsCard>
                <OperationsCard title='Data & Analytics'>
                    <span>Turn operational data into</span>
                    <span>actionable insights that drive</span>
                    <span>better decisions.</span>
                </OperationsCard>
                <OperationsCard title='Continuous Improvement'>
                    <span>Implement Lean, Six Sigma and</span>
                    <span>best practices for sustainable</span>
                    <span>performance gains.</span>
                </OperationsCard>
                <OperationsCard title='Supply Chain Consulting'>
                    <span>Optimize end-to-end supply chains</span>
                    <span>for resilience, visibility and</span>
                    <span>cost efficiency.</span>
                </OperationsCard>
                <OperationsCard title='Change Management'>
                    <span>Guide people through change</span>
                    <span>and ensure adoption for lasting</span>
                    <span>business results.</span>
                </OperationsCard>

            </section>
            <ul className={styles.List}>
                <li>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={GrGroup} />
                    <span className={styles.ListText}>
                        <h1>500+</h1>
                        <strong>Vetted experts</strong>
                        <p>
                            <span>Senior professionals with</span>
                            <span>real-world industrial experience.</span>
                        </p>

                    </span>
                </li>
                <li>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={BiTargetLock} />
                    <span className={styles.ListText}>
                        <h1>Tailored matching</h1>
                        <strong>Right expert for your challenge</strong>
                        <p>
                            <span>We match expertise to your industry,</span>
                            <span>context and goals.</span>
                        </p>

                    </span>
                </li>
                <li>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={IoRocketOutline} />
                    <span className={styles.ListText}>
                        <h1>Measurable impact</h1>
                        <strong>Results that move the needle</strong>
                        <p>
                            <span>Experts focused on delivering</span>
                            <span>outcomes that matter.</span>
                        </p>

                    </span>
                </li>
            </ul>
        </section>
    )
}

export default Four