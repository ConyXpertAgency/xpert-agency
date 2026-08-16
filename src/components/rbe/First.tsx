import React from 'react'
import Button from '../ui/Button'
import PictureSvg from '../ui/PictureSvg'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { SlTarget } from 'react-icons/sl'
import { LuChartNoAxesCombined } from 'react-icons/lu'
import styles from '@/styles/rbe/First.module.css'
import Link from 'next/link'

const First = () => {
    return (
        <header className={styles.First}>
            <section className={styles.Left}>
                <section className={styles.Fleft}>
                    <article className={styles.TextLeft}>
                        <strong className='details'>Interim Management</strong>
                        <h1>Rapid Business
                            Elevating <strong>RBE™</strong></h1>
                        <p>
                            Interim Management, elevate performance safe and quickly.
                        </p>
                        <p>
                            {`RBE™ is Xpert.agency's proprietary framework for rapid ramp-up
and business process elevation. We step in, stabilize operations,
protect value and drive measurable performance improvement
fast, safe and sustainable.`}
                        </p>
                    </article>
                    <article className={styles.ButtonsLeft}>
                        <Link href={'/rbe'}>
                            <Button variant='full' arrow={true}>See the approach</Button>
                        </Link>
                        <Link href={'/rbe'}>
                            <Button variant='ghost' arrow={true}>Explore the framework</Button>
                        </Link>
                    </article>
                </section>
                <ul className={styles.ListLeft}>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <span>
                            <h1>Rapid ramp-up</h1>
                            <p>Speed up operations to
                                achieve expected results.</p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg icon={SlTarget} />
                        <span>
                            <h1>Process elevation</h1>
                            <p>Strengthen people, skills and systems. </p>
                        </span>
                    </li>
                    <li>
                        <PictureSvg icon={LuChartNoAxesCombined} />
                        <span>
                            <h1>Measurable impact</h1>
                            <p>Elevate performance to best level - fast.</p>
                        </span>
                    </li>
                </ul>
            </section>
            <section className={styles.Right}>
                <article className={styles.Card}>
                    <div>01</div>
                    <strong>PREPARING</strong>
                    <p>Plan and prepare for
                        corrective actions.</p>
                </article>
                <article className={styles.Card}>
                    <div>02</div>
                    <strong>SAFEGUARDING</strong>
                    <p>Stabilize operations
                        and protect value.</p>
                </article>
                <article className={styles.Card}>
                    <div>03</div>
                    <strong>PREFORMING</strong>
                    <p>Execute improvements
                        and elevate performance.</p>
                </article>
            </section>
        </header>
    )
}

export default First