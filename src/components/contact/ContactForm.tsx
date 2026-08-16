"use client";

import { useState } from "react";
import Button from '@/components/ui/Button'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/contact/Contact.module.css'
import { LuPencilLine } from 'react-icons/lu'
import { MdLockOutline } from 'react-icons/md'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import type { ContactPage } from "@/lib/supabase/types";

type FormData = ContactPage["form"];

interface Props {
    data: FormData;
}

const ContactForm = ({ data }: Props) => {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        setError("");

        const form = new FormData(e.currentTarget);
        const payload = {
            name: form.get("name"),
            cname: form.get("cname"),
            email: form.get("email"),
            topic: form.get("topic"),
            message: form.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const json = await res.json();

            if (!res.ok) {
                setStatus("error");
                setError(json.error || "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            e.currentTarget.reset();
        } catch {
            setStatus("error");
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <article className={styles.Right}>
            <header>
                <PictureSvg variant='full' size={38} width={4} height={4} icon={LuPencilLine} />
                <span>
                    <h1><RichText>{data.title}</RichText></h1>
                    <p><RichText>{data.subtitle}</RichText></p>
                </span>
            </header>
            <form id="contact-form" onSubmit={handleSubmit}>
                <article>
                    {data.fields.filter((f) => f.type === 'text' || f.type === 'email').slice(0, 2).map((field, i) => (
                        <label key={i}>
                            <span><RichText>{field.label}</RichText></span>
                            <input required={field.required} name={field.name} placeholder={field.placeholder} type={field.type} />
                        </label>
                    ))}
                </article>
                {data.fields.filter((f) => f.type !== 'text' && f.type !== 'email').map((field, i) => (
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
                <p> <PictureSvg icon={MdLockOutline} /><RichText>{data.privacy}</RichText></p>
                {status === "sending" && <p>Enviando…</p>}
                {status === "success" && <p>¡Mensaje enviado! Te responderemos pronto.</p>}
                {status === "error" && <p>{error}</p>}
            </form>
            <footer>
                <section>
                    {data.buttons.map((btn, i) => (
                        <Button
                            key={i}
                            type="submit"
                            form="contact-form"
                            variant={btn.variant as 'full' | 'outline'}
                            arrow={true}
                        >
                            <RichText>{btn.label}</RichText>
                        </Button>
                    ))}
                </section>
                <p><PictureSvg icon={IoShieldCheckmarkOutline} /><RichText>{data.trust}</RichText></p>
            </footer>
        </article>
    )
}

export default ContactForm;
