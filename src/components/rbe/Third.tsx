import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import { FiClipboard } from 'react-icons/fi'
import { MdWeb } from 'react-icons/md'
import { PiUsersThree } from 'react-icons/pi'
import styles from '@/styles/rbe/Third.module.css'

const Third = () => {
    return (
        <section className={styles.Third}>
            <header className={styles.Header}>
                <h1>What can you expect from
                    RBE Interim Management</h1>
                <p>A well-structured, systematic management approach to success.</p>
            </header>
            <ul className={styles.Content}>
                <li className={styles.CardContent}>
                    <header>
                        <PictureSvg icon={FiClipboard} size={68} variant='ghost' />
                        <h1>Preparing phase</h1>
                        <p> <span>Build clarity, assess risks and</span><span>prepare the operation for ramp-up.</span>

                        </p>

                    </header>
                    <ul className={styles.ListCard}>
                        <li>Check data and processes
                        </li>
                        <li>Check rampup plan</li>
                        <li>Identify risks</li>
                        <li>Calculate RBE proposal</li>
                        <li>Define and execute preventing actions</li>
                        <li>Evaluate management training and plan</li>
                    </ul>
                </li>
                <li className={styles.CardContent}>
                    <header>
                        <PictureSvg icon={MdWeb} size={68} variant='ghost' />
                        <h1>Safeguarding phase</h1>
                        <p> <span>Stabilize operations, monitor KPls</span><span>and strengthen control during execution.</span>
                        </p>
                    </header>
                    <ul className={styles.ListCard}>
                        <li>Check & monitor KPI</li>
                        <li>Check alert system</li>
                        <li>Execute corrective actions</li>
                        <li>Adapt corrective actions</li>
                        <li>Develop strategies to improve
                            operations and system</li>
                        <li>Do process mining to measure progress</li>
                    </ul>
                </li>
                <li className={styles.CardContent}>
                    <header>
                        <PictureSvg icon={PiUsersThree} size={68} variant='ghost' />
                        <h1>Performing phase</h1>
                        <p> <span>Drive improvement waves, train teams</span><span>and prepare long-term handover.</span>
                        </p>
                    </header>
                    <ul className={styles.ListCard}>
                        <li>Define waves</li>
                        <li>Establish improvement waves</li>
                        <li>Provide collaborative team games</li>
                        <li>Establish progress visualization & reporting</li>
                        <li>Train-the-trainer coaching</li>
                        <li>Handover to executives</li>
                    </ul>
                </li>
            </ul>
            <footer className={styles.Footer}>
                <h1>RBE 3-PHASE MODEL</h1>
                <p>A structured management approach that drives rapid ramp-up, protects value, and delivers measurable impact - fast, safe and sustainable.</p>
            </footer>
        </section>
    )
}

export default Third