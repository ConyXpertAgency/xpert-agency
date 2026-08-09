import React from 'react'
import { ProfesionalCard } from './index'
import Button from '../ui/Button'
import styles from '@/styles/Home/Second.module.css'
import { GiGlobe } from 'react-icons/gi'
import { FaPerson } from 'react-icons/fa6'
import { PiSuitcaseSimpleDuotone } from 'react-icons/pi'
import { GrLineChart } from 'react-icons/gr'
import PictureSvg from '../ui/PictureSvg'
import { CiGlobe } from 'react-icons/ci'
import { FiUsers } from 'react-icons/fi'
import Link from 'next/link'

const Second = () => {
    return (
        <section className={styles.Second}>
            <header className={`${styles.Header}`}>
                <article>
                    <strong className='details'>OUR EXPERT NETWORK</strong>
                    <h1>
                        <span>Partners driving </span>
                        operational excellence.
                    </h1>
                </article>
                <p><span>Our network of senior specialists combines deep industry experiencе</span>
                    <span>with a hands-on approach to deliver measurable results.</span>
                    <span>Trusted advisors. Proven operators. Real impact.</span>
                </p>
            </header>
            <section className={`${styles.Content}`}>
                <ProfesionalCard name='Cony' slug='owner'>
                    <p>
                        <span>20+ years optimizing operations </span>
                        <span>and driving lean transformation </span>
                        <span>across global manufacturing.</span>
                    </p>
                    <section>
                        <Button variant='outlineG'>
                            Learn Operations
                        </Button>
                        <Button variant='outlineG'>
                            Process Design
                        </Button>
                    </section>
                </ProfesionalCard>
                <ProfesionalCard name='Cony' slug='owner'>
                    <p>
                        <span>20+ years optimizing operations </span>
                        <span>and driving lean transformation </span>
                        <span>across global manufacturing.</span>
                    </p>
                    <section>
                        <Button variant='outlineG'>
                            Learn Operations
                        </Button>
                        <Button variant='outlineG'>
                            Process Design
                        </Button>
                    </section>
                </ProfesionalCard>
                <ProfesionalCard name='Cony' slug='owner'>
                    <p>
                        <span>20+ years optimizing operations </span>
                        <span>and driving lean transformation </span>
                        <span>across global manufacturing.</span>
                    </p>
                    <section>
                        <Button variant='outlineG'>
                            Learn Operations
                        </Button>
                        <Button variant='outlineG'>
                            Process Design
                        </Button>
                    </section>
                </ProfesionalCard>
                <ProfesionalCard name='Cony' slug='owner'>
                    <p>
                        <span>20+ years optimizing operations </span>
                        <span>and driving lean transformation </span>
                        <span>across global manufacturing.</span>
                    </p>
                    <section>
                        <Button variant='outlineG'>
                            Learn Operations
                        </Button>
                        <Button variant='outlineG'>
                            Process Design
                        </Button>
                    </section>
                </ProfesionalCard>
            </section>
            <ul>
                <li>
                    <PictureSvg icon={FiUsers} size={48} />
                    <span>
                        <h1>30+</h1>
                        <p>Senior experts</p>
                    </span>
                </li>
                <li>
                    <PictureSvg icon={CiGlobe} size={48} />
                    <span>
                        <h1>12+</h1>
                        <p>Countries covered</p>
                    </span>
                </li>
                <li>
                    <PictureSvg icon={PiSuitcaseSimpleDuotone} size={48} />
                    <span>
                        <h1>200+</h1>
                        <p>Projects delivered</p>
                    </span>
                </li>
                <li>
                    <PictureSvg icon={GrLineChart} size={48} />
                    <span>
                        <h1>98%</h1>
                        <p>Client satisfaction</p>
                    </span>
                </li>
            </ul>
            <footer className={`${styles.Footer}`}>
                <strong>Looking for a specific expertise?</strong>
                <Link href={'/contact'}>
                    <Button variant='outlineG'>{"Let's connect"}</Button>
                </Link>
            </footer>
        </section>
    )
}

export default Second