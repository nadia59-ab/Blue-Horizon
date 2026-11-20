"use client";

import { useTranslations } from "next-intl";
import type { FormEvent } from "react";

export default function ContactMailForm({ email }: { email: string }) {
  const t = useTranslations();

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const senderEmail = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = `${t("contactPage.formTitle")}: ${name}`;
    const body = `${t("contactPage.name")}: ${name}\n${t("contactPage.email")}: ${senderEmail}\n\n${t("contactPage.message")}:\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={sendMessage}>
      <h2>{t("contactPage.formTitle")}</h2>
      <label htmlFor="contact-name">{t("contactPage.name")}</label>
      <input id="contact-name" name="name" autoComplete="name" placeholder={t("contactPage.namePlaceholder")} required />
      <label htmlFor="contact-email">{t("contactPage.email")}</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" placeholder={t("contactPage.emailPlaceholder")} required />
      <label htmlFor="contact-message">{t("contactPage.message")}</label>
      <textarea id="contact-message" name="message" rows={5} placeholder={t("contactPage.messagePlaceholder")} required />
      <button className="button button-dark" type="submit">{t("contactPage.send")} <span aria-hidden="true">↗</span></button>
    </form>
  );
}
