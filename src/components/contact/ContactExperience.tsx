"use client";

import { useMemo, useState } from "react";
import PictureSvg from "@/components/ui/PictureSvg";
import RichText from "@/components/ui/RichText";
import ContactForm from "@/components/contact/ContactForm";
import styles from "@/styles/contact/Contact.module.css";
import { resolveStorageUrl } from "@/lib/supabase/client";
import { getIcon } from "@/lib/supabase/icons";
import type { ContactPage, ContactTeams, RegionalContact } from "@/lib/supabase/types";

interface Props {
    pageData: ContactPage;
    teamsData: ContactTeams;
}

const formatList = (items?: string[]) => items?.filter(Boolean).join(" · ");

const contactLabel = (contact: RegionalContact) => `${contact.region} — ${contact.name}`;

const ContactExperience = ({ pageData, teamsData }: Props) => {
    const contactGroups = useMemo(
        () => teamsData.items.filter((group) => group.id && group.region && group.contacts.length > 0),
        [teamsData.items]
    );
    const contacts = useMemo(
        () => contactGroups.flatMap((group) =>
            group.contacts
                .filter((contact) => contact.id && contact.name)
                .map((contact) => ({ ...contact, region: contact.region ?? group.region }))
        ),
        [contactGroups]
    );
    const [selectedContactId, setSelectedContactId] = useState(() => contacts[0]?.id ?? "");
    const selectedContact = contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0];

    const selectContact = (contactId: string) => {
        setSelectedContactId(contactId);
    };

    return (
        <section className={styles.Experience}>
            <header className={styles.Hero}>
                <strong className="details"><RichText>{pageData.badge}</RichText></strong>
                <span className={styles.TextH}>
                    <h1><RichText>{pageData.title}</RichText></h1>
                    <p><RichText>{pageData.subtitle}</RichText></p>
                </span>
                {pageData.features.length > 0 && (
                    <ul className={styles.FeatureList}>
                        {pageData.features.map((feature, i) => (
                            <li key={i}>
                                <PictureSvg icon={getIcon(feature.icon)} />
                                <span>
                                    <strong><RichText>{feature.title}</RichText></strong>
                                    <p><RichText>{feature.text}</RichText></p>
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </header>

            <section className={styles.ContactGrid}>
                <aside className={styles.Directory} aria-label={teamsData.title ?? pageData.team_section.title}>
                    <header>
                        <strong className="details"><RichText>{teamsData.title ?? pageData.team_section.title}</RichText></strong>
                        {pageData.team_section.footer && <p><RichText>{pageData.team_section.footer}</RichText></p>}
                    </header>

                    <div className={styles.DirectoryList}>
                        <ul className={styles.ContactList} role="listbox" aria-label="Regional contacts">
                            {contactGroups.map((group) => (
                                <li className={styles.RegionGroup} key={group.id}>
                                    <strong className={styles.RegionHeading}>{group.region}</strong>
                                    <ul>
                                        {group.contacts.map((rawContact) => {
                                            const contact = { ...rawContact, region: rawContact.region ?? group.region };
                                            const isActive = contact.id === selectedContact?.id;
                                            const countries = formatList(contact.countries);
                                            const phones = formatList(contact.phones);
                                            const photoSrc = resolveStorageUrl(contact.photo);

                                            return (
                                                <li key={contact.id}>
                                                    <button
                                                        type="button"
                                                        className={`${styles.ContactCard} ${isActive ? styles.ContactCardActive : ""}`}
                                                        onClick={() => selectContact(contact.id)}
                                                        role="option"
                                                        aria-selected={isActive}
                                                    >
                                                        {photoSrc && (
                                                            <span className={styles.ContactPhoto}>
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={photoSrc} alt="" loading="lazy" />
                                                            </span>
                                                        )}
                                                        <span className={styles.ContactBody}>
                                                            <span className={styles.ContactName}><RichText>{contact.name}</RichText></span>
                                                            {contact.role && <span className={styles.ContactMeta}><RichText>{contact.role}</RichText></span>}
                                                            {contact.organization && <span className={styles.ContactMeta}><RichText>{contact.organization}</RichText></span>}
                                                            {countries && <span className={styles.ContactMeta}>{countries}</span>}
                                                            {contact.addresses?.length ? (
                                                                <span className={styles.AddressList}>
                                                                    {contact.addresses.map((address, i) => (
                                                                        <span key={i}>{address}</span>
                                                                    ))}
                                                                </span>
                                                            ) : null}
                                                            {phones && <span className={styles.ContactMeta}>{phones}</span>}
                                                            {contact.publicEmail && <span className={styles.ContactMeta}>{contact.publicEmail}</span>}
                                                            {contact.website && <span className={styles.ContactMeta}>{contact.website}</span>}
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <ContactForm
                    data={pageData.form}
                    contacts={contacts}
                    selectedContactId={selectedContact?.id ?? selectedContactId}
                    onSelectedContactChange={selectContact}
                    getContactLabel={contactLabel}
                />
            </section>
        </section>
    );
};

export default ContactExperience;
