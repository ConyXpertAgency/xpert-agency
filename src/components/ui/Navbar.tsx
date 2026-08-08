import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/ui/Navbar.module.css'
import { FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
    return (
        <nav className={styles.Navbar}>
            <Image src={"/xpert_agency_logo.png"} alt='' width={500} height={20} />
            <ul>
                <Link href={'/'}>
                    <li className={styles.active}><strong>Home</strong></li>
                </Link>
                <Link href={'/about'}>
                    <li><strong>About</strong></li>
                </Link>
                <Link href={'/services'}>
                    <li>
                        <strong>Services <FaChevronDown size={12}/></strong>
                    </li>
                </Link>
                <Link href={'/industries'}>
                    <li>
                        <strong>Industries <FaChevronDown size={12}/></strong>
                    </li>
                </Link>
                <Link href={'/cases'}>
                    <li><strong>Cases</strong></li>
                </Link>
            </ul>
            <section>
                <select id="lang">
                    <option value="en">EN </option>
                    <option value="es">ES </option>
                    <option value="de">DE </option>
                </select>
                <Link href={'/contact'}>
                    Contact us
                </Link>
            </section>
        </nav>
    )
}

export default Navbar