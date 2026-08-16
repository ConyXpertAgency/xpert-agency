import React from 'react'
import styles from '@/styles/rbe/Five.module.css'
import Image from 'next/image'
import PictureSvg from '../ui/PictureSvg'
import { IoRocketOutline } from 'react-icons/io5'
import { PiUsersThree } from 'react-icons/pi'
import { BsBarChart } from 'react-icons/bs'
import { SlTarget } from 'react-icons/sl'

const Five = () => {
    return (
        <section className={styles.Five}>
            <header className={styles.Header}>
                <h1>What does RBE mean?</h1>
                <p>A phased framework that stabilizes operations fast and drives measurable improvement.</p>
            </header>
            <section className={styles.Content}>
                <picture>
                    <Image src={'/panel_5.png'} alt='apanel 5' width={600} height={600} />
                </picture>
                <ul>
                    <li>
                        <PictureSvg icon={IoRocketOutline} variant='full' size={28} width={5} height={5} />
                        <span className={styles.CardTxt}>
                            <h1>Rapid ramp-up</h1>
                            <p>Speed up operations to achieve
                                expected performance within the
                                planned timeframe.</p>
                        </span>
                        <div>R</div>
                    </li>
                    <li>
                        <PictureSvg icon={PiUsersThree} variant='full' size={28} width={5} height={5} />
                        <span className={styles.CardTxt}>
                            <h1>Business processes</h1>
                            <p>Strengthen people skills and process
                                discipline to complement embedded
                                technical systems for planning and
                                execution.</p>
                        </span>
                        <div>B</div>
                    </li>
                    <li>
                        <PictureSvg icon={BsBarChart} variant='full' size={28} width={5} height={5} />
                        <span className={styles.CardTxt}>
                            <h1>Elevating performance</h1>
                            <p>Bring new business to best level -
more than expected - stable and
scalable to foster additional business.</p>
                        </span>
                        <div>E</div>
                    </li>
                </ul>
            </section>
            <footer className={styles.Footer}>
                <PictureSvg icon={SlTarget} variant='full' size={28} height={4} width={4}/>
                <strong>RBE closes the gap between planned performance and actual performance.</strong>
            </footer>
        </section>
    )
}

export default Five