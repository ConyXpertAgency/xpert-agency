import React from 'react'
import styles from '@/styles/rbe/Second.module.css'
import Image from 'next/image'

const Second = () => {
    return (
        <section className={styles.Second}>
            <Image src={'/need_RBE.png'} alt='need rbe' width={620} height={620} />
            <article className={styles.Right}>
                <strong className='details'>THE CHALLENGE</strong>
                <header className={styles.Text}>
                    <h1>What are we talking about?</h1>
                    <p>What are we talking about?
                        Every investor, responsible manager and entrepreneur world-wide is knowing and
                        fearing the difficulties in projects, when business processes are going to change
                        and performance is expected quickly.</p>
                </header>
                <ul className={styles.List}>
                    <li>
                        <div>01</div>
                        <p>Project go-live is a milestone everybody knows as an inevitable
                            source of preoccupation, in spite of all possible closeness in
                            planning, cautiousness in execution and consequence in controlling.</p>
                    </li>
                    <li>
                        <div>02</div>
                        <p>{`The launch of a new system or automation solution, embedded into
business processes, is interfacing to many stakeholder interests,
at least to the customer's. Many projects are suffering - more or
less in any way - after go-live.`}</p>
                    </li>
                    <li>
                        <div>03</div>
                        <p>It is always a risky phase, where investors are losing money,
                            managers are losing jobs and - in worst case - entrepreneurs are
                            losing business, customer and reputation.</p>
                    </li>
                </ul>
                <span className={styles.TextCard}>
                    <p>It is not enough to get support for ramp-up from system supplier. As well,
                        additional manpower in operations is not able to compensate awaited
                        inefficiencies during ramp-up.</p>
                </span>
                <footer className={styles.RBEfocus}>
                    <Image src={'/rbe_icon.png'} alt='rbg icon' width={80} height={80} />
                    <span>
                        <strong className='details'>RBE focus</strong>
                        <h1>Let us talk about ramp-up with RBE -
                            our solution for risk mitigation.</h1>
                    </span>
                </footer>
            </article>
        </section>
    )
}

export default Second