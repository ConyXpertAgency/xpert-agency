import CardContent from '@/components/cases/CardContent'
import PictureSvg from '@/components/ui/PictureSvg'
import styles from '@/styles/cases/Cases.module.css'
import React from 'react'
import { FaRegChartBar, FaRegClock } from 'react-icons/fa'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'

const page = () => {
    return (
        <main className='AppShell'>
            <header className={styles.Header}>
                <article>
                    <strong className='details'>CASE STUDIES</strong>
                    <h1>Proven impact across
                        industries and challenges.</h1>
                </article>
                <p>We partner with organizations worldwide to solve complex
                    operational challenges through integrated improvement,
                    automation, and logistics solutions.</p>
            </header>
            <ul className={styles.Content}>
                <CardContent title='NOVENTIS' slug='Advanced Manufacturing' description='Streamlined production and quality control
across multi-site operations.'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>28%</strong>
                        <p> increase in overall equipment effectiveness</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <strong>22%</strong>
                        <p> reduction in cycle time</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <strong>99.2%</strong>
                        <p> quality compliance achieved</p>
                    </li>
                </CardContent>
                <CardContent title='LUMINA LOGISTICS' slug='Logistics & Supply Chain' description='Designed and implemented an end-to-end
supply chain optimization program.'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>31%</strong>
                        <p>reduction in logistics costs</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <p>On-time delivery improved to 98%</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <p>Real-time visibility across 4 regions</p>
                    </li>
                </CardContent>
                <CardContent title='NEXORA ENERGY' slug='Energy & Utilities' description='Integrated reliability and maintenance systems
to improve asset performance.'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>18%</strong>
                        <p>reduction in unplanned downtime</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <strong>25%</strong>
                        <p>improvement in maintenance efficiency</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <strong>$4.2M</strong>
                        <p>annual savings realized</p>
                    </li>
                </CardContent>
                <CardContent title='VERIDIAN LABS' description='Modernized operations and ensured regulatory
compliance at scale.' slug='Life Sciences'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>300%</strong>
                        <p>increase in production throughput</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <strong>100%</strong>
                        <p> regulatory audit compliance</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <strong>15+</strong>
                        <p> reduction in operational costs</p>
                    </li>
                </CardContent>
                <CardContent title='MARITEX GROUP' slug='Marine & Shipping' description='Optimized fleet operations and predictive
maintenance capabilities.'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>20%</strong>
                        <p>improvement in fleet utilization</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <strong>35%</strong>
                        <p>reduction in maintenance incidents</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <strong>$2.1M</strong>
                        <p>annual fuel savings</p>
                    </li>
                </CardContent>
                <CardContent title='ALTRAX DISTRIBUTION' slug='Retail & Distribution' description='Automated warehouse operations and
optimized inventory flow.'>
                    <li>
                        <PictureSvg icon={FaRegChartBar} />
                        <strong>40%</strong>
                        <p>increase in order fulfillment rate</p>
                    </li>
                    <li>
                        <PictureSvg icon={FaRegClock} />
                        <strong>26%</strong>
                        <p> reduction in picking time</p>
                    </li>
                    <li>
                        <PictureSvg icon={IoShieldCheckmarkOutline} />
                        <strong>99.5%</strong>
                        <p>inventory accuracy achieved</p>
                    </li>
                </CardContent>
            </ul>
        </main>
    )
}

export default page