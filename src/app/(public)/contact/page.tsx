import Button from '@/components/ui/Button'
import PictureSvg from '@/components/ui/PictureSvg'
import styles from '@/styles/contact/Contact.module.css'
import Link from 'next/link'
import React from 'react'
import { FaRegCheckCircle, FaRegClock } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { LuPencilLine, LuUsersRound } from 'react-icons/lu'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'

const page = () => {
    return (
        <main className='AppShell'>
            <section className={styles.Content}>
                <article className={styles.Left}>
                    <header>
                        <strong className="details">{"LET'S BUILD WHAT'S NEXT"}</strong>
                        <span className={styles.TextH}>
                            <h1>
                                Ready to improve your
                                operations?.
                            </h1>
                            <p>Share your goals and challenges. Our experts will help you
                                design practical solutions that drive measurable results.</p>
                        </span>
                        <ul>
                            <li>
                                <PictureSvg icon={IoShieldCheckmarkOutline} />
                                <span>
                                    <strong>Confidential
                                        & secure</strong>
                                    <p>Your information is
                                        safe with us.</p>

                                </span>
                            </li>
                            <li>
                                <PictureSvg icon={FaRegClock} />
                                <span>
                                    <strong>Quick response</strong>
                                    <p>We typically reply
                                        within 1 business day.</p>

                                </span>
                            </li>
                            <li>
                                <PictureSvg icon={FaRegCheckCircle} />
                                <span>
                                    <strong>No commitment</strong>
                                    <p>Initial consultation
                                        is 100% free.</p>

                                </span>
                            </li>
                        </ul>
                    </header>
                    <section className={styles.SecL}>
                        <strong className="details">TALK TO OUR TEAM</strong>
                        <ul>
                            <li>
                                <article>

                                    <PictureSvg variant='full' size={28} width={3.5} height={3.5} className={styles.PictureL} icon={FiPhone} />
                                    <span>
                                        <h1>WhatsApp / Phone</h1>
                                        <p>+52 55 2654 8997</p>

                                    </span>
                                </article>
                                <Link href={''}>
                                    <Button variant='outlineG' arrow={true}>Chat on WhatsApp</Button>
                                </Link>
                            </li>
                            <li>
                                <article>
                                    <PictureSvg variant='full' size={28} width={3.5} height={3.5} className={styles.PictureL} icon={MdOutlineEmail} />
                                    <span>
                                        <h1>Email</h1>
                                        <p>contacto@xpert.agency</p>
                                    </span>

                                </article>
                                <Link href={''}>
                                    <Button variant='outlineG' arrow={true}>Send email</Button>
                                </Link>
                            </li>
                            <li>
                                <article>
                                    <PictureSvg variant='full' size={28} width={3.5} height={3.5} className={styles.PictureL} icon={GrLocation} />
                                    <span>
                                        <h1>Headquarters</h1>
                                        <p>Mexico City, Mexico</p>
                                    </span>
                                </article>
                                <Link href={''}>
                                    <Button variant='outlineG' arrow={true}>View on map</Button>
                                </Link>
                            </li>
                        </ul>
                        <footer>
                            <section>
                                <PictureSvg className={styles.PictureFL} size={38} icon={LuUsersRound} />
                                <p>Trusted by manufacturers and logistics leaders across Latin America, North America, and Europe.</p>
                            </section>
                            <picture>
                                <PictureSvg icon={LuPencilLine} variant='full' width={3.5} size={28} height={3.5} />
                                <PictureSvg icon={LuPencilLine} variant='full' width={3.5} size={28} height={3.5} />
                                <PictureSvg icon={LuPencilLine} variant='full' width={3.5} size={28} height={3.5} />
                            </picture>
                        </footer>
                    </section>
                </article>
                <article className={styles.Right}>
                    <header>
                        <PictureSvg variant='full' size={38} width={4} height={4} icon={LuPencilLine} />
                        <span>
                            <h1>Send us a message</h1>
                            <p>{"Tell us about your project and we'll get back to you."}</p>
                        </span>
                    </header>
                    <form action="">
                        <article>
                            <label>
                                <span>Full name *</span>
                                <input required name='name' placeholder='Your name' type="text" />
                            </label>
                            <label>
                                <span>Company *</span>
                                <input required name='cname' placeholder='Company name' type="text" />
                            </label>
                        </article>
                        <label>
                            <span>Work email *</span>
                            <input required name='email' placeholder='you@company.com' type="email" />
                        </label>
                        <label>
                            <span>Area of interest</span>
                            <select name="topic">
                                <option value="">Select a topic</option>
                                <option value="consulting">Consulting</option>
                                <option value="partnership">Partnership</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label>
                            <span>Project brief *</span>
                            <textarea  required name='message' placeholder='Tell us about your objectives, current challenges, and what success looks like...'>

                            </textarea>
                        </label>
                        <p> <PictureSvg icon={MdLockOutline} />By submitting, you agree to our Privacy Policy.</p>
                    </form>
                    <footer>
                        <section>
                            <Button variant='full' arrow={true}>Book a consultation</Button>
                            <Button variant='outline' arrow={true}>Send message</Button>
                        </section>
                        <p><PictureSvg icon={IoShieldCheckmarkOutline} />We respect your time. No spam, ever.</p>
                    </footer>
                </article>
            </section>
        </main>
    )
}

export default page