import { locale } from "next/root-params";
import Button from '@/components/ui/Button'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/contact/Contact.module.css'
import Link from 'next/link'
import { LuPencilLine, LuUsersRound } from 'react-icons/lu'
import { MdLockOutline } from 'react-icons/md'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { getIcon } from '@/lib/supabase/icons'
import { getContactPage } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getContactPage(lang);

    return (
        <main className='AppShell'>
            <section className={styles.Content}>
                <article className={styles.Left}>
                    <header>
                        <strong className="details"><RichText>{data.badge}</RichText></strong>
                        <span className={styles.TextH}>
                            <h1>
                                <RichText>{data.title}</RichText>
                            </h1>
                            <p><RichText>{data.subtitle}</RichText></p>
                        </span>
                        <ul>
                            {data.features.map((feature, i) => (
                                <li key={i}>
                                    <PictureSvg icon={getIcon(feature.icon)} />
                                    <span>
                                        <strong><RichText>{feature.title}</RichText></strong>
                                        <p><RichText>{feature.text}</RichText></p>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </header>
                    <section className={styles.SecL}>
                        <strong className="details"><RichText>{data.team_section.title}</RichText></strong>
                        <ul>
                            {data.methods.map((method, i) => (
                                <li key={i}>
                                    <article>
                                        <PictureSvg variant='full' size={28} width={3.5} height={3.5} className={styles.PictureL} icon={getIcon(method.icon)} />
                                        <span>
                                            <h1><RichText>{method.title}</RichText></h1>
                                            <p><RichText>{method.value}</RichText></p>
                                        </span>
                                    </article>
                                    <Link href={method.href || '#'}>
                                        <Button variant='outlineG' arrow={true}><RichText>{method.cta}</RichText></Button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <footer>
                            <section>
                                <PictureSvg className={styles.PictureFL} size={38} icon={LuUsersRound} />
                                <p><RichText>{data.team_section.footer}</RichText></p>
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
                            <h1><RichText>{data.form.title}</RichText></h1>
                            <p><RichText>{data.form.subtitle}</RichText></p>
                        </span>
                    </header>
                    <form action="">
                        <article>
                            {data.form.fields.filter((f) => f.type === 'text' || f.type === 'email').slice(0, 2).map((field, i) => (
                                <label key={i}>
                                    <span><RichText>{field.label}</RichText></span>
                                    <input required={field.required} name={field.name} placeholder={field.placeholder} type={field.type} />
                                </label>
                            ))}
                        </article>
                        {data.form.fields.filter((f) => f.type !== 'text' && f.type !== 'email').map((field, i) => (
                            field.type === 'select' ? (
                                <label key={i}>
                                    <span><RichText>{field.label}</RichText></span>
                                    <select name={field.name}>
                                        {(field.options ?? []).map((opt, j) => (
                                            <option key={j} value={j === 0 ? '' : opt.toLowerCase()}>{opt}</option>
                                        ))}
                                    </select>
                                </label>
                            ) : field.type === 'textarea' ? (
                                <label key={i}>
                                    <span><RichText>{field.label}</RichText></span>
                                    <textarea required={field.required} name={field.name} placeholder={field.placeholder}></textarea>
                                </label>
                            ) : (
                                <label key={i}>
                                    <span><RichText>{field.label}</RichText></span>
                                    <input required={field.required} name={field.name} placeholder={field.placeholder} type={field.type} />
                                </label>
                            )
                        ))}
                        <p> <PictureSvg icon={MdLockOutline} /><RichText>{data.form.privacy}</RichText></p>
                    </form>
                    <footer>
                        <section>
                            {data.form.buttons.map((btn, i) => (
                                <Button key={i} variant={btn.variant as 'full' | 'outline'} arrow={true}><RichText>{btn.label}</RichText></Button>
                            ))}
                        </section>
                        <p><PictureSvg icon={IoShieldCheckmarkOutline} /><RichText>{data.form.trust}</RichText></p>
                    </footer>
                </article>
            </section>
        </main>
    )
}

export default page
