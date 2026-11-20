"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { BOOKING_URL } from "../../config/booking";
import BookingArrow from "@/components/booking-arrow";

const navItems = [
  ["home", "/"],
  ["location", "/location"],
  ["accommodation", "/accommodation"],
  ["facilities", "/facilities"],
  ["gallery", "/photos"],
] as const;

const flags: { locale: AppLocale; labelKey: string; paths: React.ReactNode }[] = [
  { locale: "en", labelKey: "navigation.languageNames.en", paths: <><path fill="#012169" d="M0 0h24v16H0z"/><path stroke="#fff" strokeWidth="5" d="m0 0 24 16M24 0 0 16"/><path stroke="#c8102e" strokeWidth="2" d="m0 0 24 16M24 0 0 16"/><path stroke="#fff" strokeWidth="5" d="M12 0v16M0 8h24"/><path stroke="#c8102e" strokeWidth="2" d="M12 0v16M0 8h24"/></> },
  { locale: "zh", labelKey: "navigation.languageNames.zh", paths: <><path fill="#de2910" d="M0 0h24v16H0z"/><path fill="#ffde00" d="m5 2 1 .9-.4 1.2L7 3.4l1 .7-.3-1.2 1-.8-1.3-.1L7 1l-.5 1.1zM10 1.5l.3.6.7.1-.5.4.1.7-.6-.3-.6.3.1-.7-.5-.4.7-.1zM12 3.5l.3.6.7.1-.5.4.1.7-.6-.3-.6.3.1-.7-.5-.4.7-.1zM10 5.5l.3.6.7.1-.5.4.1.7-.6-.3-.6.3.1-.7-.5-.4.7-.1z"/></> },
  { locale: "ru", labelKey: "navigation.languageNames.ru", paths: <><path fill="#fff" d="M0 0h24v5.34H0z"/><path fill="#0039a6" d="M0 5.33h24v5.34H0z"/><path fill="#d52b1e" d="M0 10.66h24V16H0z"/></> },
  { locale: "de", labelKey: "navigation.languageNames.de", paths: <><path fill="#000" d="M0 0h24v5.34H0z"/><path fill="#dd0000" d="M0 5.33h24v5.34H0z"/><path fill="#ffce00" d="M0 10.66h24V16H0z"/></> },
];

export default function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  function switchLocale(nextLocale: AppLocale) {
    if (routing.locales.includes(nextLocale)) router.replace(pathname, { locale: nextLocale });
  }

  return (
    <motion.header className="site-header" initial={reduced ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}>
      <Link className="brand" href="/" aria-label="Blue Horizon Hotel & Beach" onClick={() => setMenuOpen(false)}>
        <span className="brand-copy"><strong>BLUE HORIZON</strong><small>HOTEL &amp; BEACH</small></span>
      </Link>
      <button aria-label={menuOpen ? t("navigation.closeMenu") : t("navigation.openMenu")} aria-expanded={menuOpen} className={`menu-toggle${menuOpen ? " is-open" : ""}`} onClick={() => setMenuOpen((open) => !open)} type="button"><span/><span/><span/></button>
      <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label={t("navigation.mainLabel")}>
        {navItems.map(([key, href]) => <Link key={key} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{t(`navigation.${key}`)}</Link>)}
      </nav>
      <div className="header-actions">
        <div className="language-flags" role="group" aria-label={t("navigation.language")}>
          {flags.map((flag) => <button key={flag.locale} type="button" aria-label={t(flag.labelKey)} aria-pressed={locale === flag.locale} onClick={() => switchLocale(flag.locale)}><svg viewBox="0 0 24 16" aria-hidden="true">{flag.paths}</svg></button>)}
        </div>
        <a className="button button-sand header-booking" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t("booking.bookNow")} <BookingArrow /></a>
      </div>
    </motion.header>
  );
}
