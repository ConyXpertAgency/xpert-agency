"use client";

import { useState } from "react";
import Button from '@/components/ui/Button'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/contact/Contact.module.css'
import { LuPencilLine } from 'react-icons/lu'
import { MdLockOutline } from 'react-icons/md'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import type { ContactPage, RegionalContact } from "@/lib/supabase/types";

type FormData = ContactPage["form"];

interface Props {
    data: FormData;
    contacts?: RegionalContact[];
    selectedContactId?: string;
    onSelectedContactChange?: (contactId: string) => void;
    getContactLabel?: (contact: RegionalContact) => string;
}

const ContactForm = ({
    data,
    contacts = [],
    selectedContactId = "",
    onSelectedContactChange,
    getContactLabel = (contact) => `${contact.region} — ${contact.name}`,
}: Props) => {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState("");
    const isSending = status === "sending";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSending) return;
        setStatus("sending");
        setError("");

        const form = new FormData(e.currentTarget);
        const payload = {
            contactId: form.get("contactId"),
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
            const json = await res.json().catch(() => null);

            if (!res.ok || json?.ok !== true) {
                setStatus("error");
                setError(json?.error || "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            e.currentTarget.reset();
        } catch {
            setStatus("error");
            setError("Something went wrong. Please try again.");
        }
    };

    const renderField = (field: FormData["fields"][number]) => {
        if (field.type === 'select') {
            return (
                <label key={field.name}>
                    <span><RichText>{field.label}</RichText></span>
                    <select required={field.required} name={field.name}>
                        {(field.options ?? []).map((opt, j) => (
                            <option key={j} value={j === 0 ? '' : opt.toLowerCase()}>{opt}</option>
                        ))}
                    </select>
                </label>
            );
        }

        if (field.type === 'textarea') {
            return (
                <label key={field.name}>
                    <span><RichText>{field.label}</RichText></span>
                    <textarea required={field.required} name={field.name} placeholder={field.placeholder}></textarea>
                </label>
            );
        }

        return (
            <label key={field.name}>
                <span><RichText>{field.label}</RichText></span>
                <input required={field.required} name={field.name} placeholder={field.placeholder} type={field.type} />
            </label>
        );
    };

    const renderFields = () => {
        const nodes: React.ReactNode[] = [];
        let row: FormData["fields"] = [];

        const flushRow = () => {
            if (row.length === 0) return;
            if (row.length === 1) {
                nodes.push(renderField(row[0]));
            } else {
                nodes.push(
                    <article key={row.map((field) => field.name).join('-')}>
                        {row.map(renderField)}
                    </article>
                );
            }
            row = [];
        };

        data.fields.forEach((field) => {
            if (field.type === 'text' || field.type === 'email') {
                row.push(field);
                if (row.length === 2) flushRow();
                return;
            }

            flushRow();
            nodes.push(renderField(field));
        });

        flushRow();
        return nodes;
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
                {contacts.length > 0 && (
                    <label>
                        <span>Region / team</span>
                        <select
                            name="contactId"
                            value={selectedContactId}
                            onChange={(e) => onSelectedContactChange?.(e.target.value)}
                        >
                            {contacts.map((contact) => (
                                <option key={contact.id} value={contact.id}>
                                    {getContactLabel(contact)}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
                {renderFields()}
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
                            disabled={isSending}
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
