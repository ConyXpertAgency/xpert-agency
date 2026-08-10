import React from 'react'
import styles from '@/styles/industries/Industries.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import { HiOutlineCog } from 'react-icons/hi2'
import { FiCoffee } from 'react-icons/fi'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { AiOutlineTruck } from 'react-icons/ai'
import { IoBagHandleOutline } from 'react-icons/io5'
import { PiFactoryLight } from 'react-icons/pi'
import Link from 'next/link'
import IndustrieCard from '@/components/industries/IndustrieCard'
import { GrGroup } from 'react-icons/gr'
import { FaArrowRight } from 'react-icons/fa'

const page = () => {
    return (
        <main className='AppShell'>
            <header className={styles.Header}>
                <strong className="details">OUR INDUSTRIES</strong>
                <h1>Industries.</h1>
                <p>We combine domain expertise with digital innovation to solve
                    complex challenges and drive measurable impact across
                    key industries.</p>
            </header>
            <ul className={styles.Content}>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={HiOutlineCog}>
                            <h1>Manufacturing</h1>
                            <p>Optimizing production, quality, and supply chains
with smart automation and data-driven insights.</p>
                        </IndustrieCard>
                    </li>
                </Link>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={FiCoffee}>
                            <h1>Food & Beverage</h1>
                            <p>Ensuring safety, traceability, and efficiency across
the entire value chain.</p>
                        </IndustrieCard>
                    </li>
                </Link>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={MdOutlineShoppingCart}>
                            <h1>Retail & E-commerce</h1>
                            <p>Enhancing customer experiences and streamlining
operations across omnichannel ecosystems.</p>
                        </IndustrieCard>
                    </li>
                </Link>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={AiOutlineTruck}>
                            <h1>Warehousing & Logistics</h1>
                            <p>Driving visibility, agility, and on-time delivery
through intelligent logistics solutions.</p>
                        </IndustrieCard>
                    </li>
                </Link>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={IoBagHandleOutline}>
                            <h1>Consumer Goods</h1>
                            <p>Accelerating innovation and ensuring consistency
from product development to delivery.</p>
                        </IndustrieCard>
                    </li>
                </Link>
                <Link href={'/industrie'}>
                    <li>
                        <IndustrieCard icon={PiFactoryLight}>
                            <h1>Industrial Operations</h1>
                            <p>Improving asset performance, safety, and
sustainability with data-driven operations.</p>
                        </IndustrieCard>
                    </li>
                </Link>
            </ul>
            <article className={`${styles.InfoCard}`}>
                <header>
                    <PictureSvg icon={GrGroup} variant='full' width={4} height={4} size={32}/>
                    <span className={styles.Text}>
                        <h1>
                            Cross-industry expertise. Measurable results.
                        </h1>
                        <p>We bring proven frameworks and deep industry knowledge to every engagement-delivering solutions that scale.</p>
                    </span>
                </header>
                <Link href={'/services'}>View all services <FaArrowRight /></Link>
            </article>
        </main>
    )
}

export default page