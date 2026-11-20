"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUp, CalendarDays, Clock3, Cloud, CloudSun, Globe, Mail, MapPin, MessagesSquare, Phone, Printer, Sun } from "lucide-react";
import { hotel } from "../../data/hotel";

type WeatherForecast = {
  current: { temperature: number; code: number };
  days: { date: string; high: number; low: number }[];
};

type WeatherCondition = "clear" | "mostlyClear" | "partlyCloudy" | "overcast" | "fog" | "drizzle" | "rain" | "snow" | "showers" | "thunderstorm" | "unknown";
type SharePlatform = "facebook" | "x" | "linkedin" | "pinterest" | "email";
type BrandName = SharePlatform | "instagram";

function weatherConditionKey(code: number): WeatherCondition {
  if (code === 0) return "clear";
  if (code === 1) return "mostlyClear";
  if (code === 2) return "partlyCloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "rain";
  if ([71, 73, 75, 77].includes(code)) return "snow";
  if ([80, 81, 82, 85, 86].includes(code)) return "showers";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "unknown";
}

function WeatherIcon({ code, size = 34 }: { code: number; size?: number }) {
  const Icon = code === 0 ? Sun : code <= 3 ? CloudSun : Cloud;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.7} />;
}

function BrandGlyph({ name }: { name: BrandName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      {name === "facebook" && <path d="M13.4 21v-8h2.7l.4-3h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7v3h2.7v8h3.7z" />}
      {name === "x" && <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.5 22H2.4l7.3-8.4L1.9 2h6.4l4.4 6.9L18.9 2zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20z" />}
      {name === "linkedin" && <path d="M5.2 7.6A2.1 2.1 0 1 0 5.2 3.4a2.1 2.1 0 0 0 0 4.2zM3.4 9.2H7v11.4H3.4zM9.1 9.2h3.5v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2h-3.7v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.6H9.1z" />}
      {name === "pinterest" && <path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.8 1.5 1.7 0 1-.6 2.5-.9 3.9-.3 1.2.6 2.1 1.7 2.1 2 0 3.5-2.1 3.5-5.1 0-2.7-1.9-4.5-4.6-4.5-3.2 0-5 2.4-5 4.8 0 1 .4 2.1.9 2.7.1.2.2.3.1.6l-.3 1.1c-.1.4-.3.5-.7.3-1.4-.7-2.2-2.8-2.2-4.5 0-3.7 2.7-7.1 7.7-7.1 4 0 7.1 2.9 7.1 6.8 0 4.1-2.6 7.5-6.1 7.5-1.2 0-2.3-.7-2.7-1.4l-.8 3c-.3 1-.9 2-1.4 2.8A10 10 0 1 0 12 2z" />}
      {name === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.6" cy="6.7" r="1.2" /></>}
    </svg>
  );
}

function openShare(platform: SharePlatform) {
  const encodedPage = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(hotel.name);
  const destinations = {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=" + encodedPage,
    x: "https://twitter.com/intent/tweet?url=" + encodedPage + "&text=" + title,
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + encodedPage,
    pinterest: "https://www.pinterest.com/pin/create/button/?url=" + encodedPage + "&description=" + title,
    email: "mailto:?subject=" + title + "&body=" + encodedPage,
  };
  if (platform === "email") window.location.href = destinations.email;
  else window.open(destinations[platform], "_blank", "noopener,noreferrer");
}

export default function SiteFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [showToTop, setShowToTop] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setShowToTop(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams({
      latitude: "27.26",
      longitude: "33.81",
      current: "temperature_2m,weather_code",
      daily: "temperature_2m_max,temperature_2m_min",
      forecast_days: "4",
      timezone: "auto",
    });

    fetch("https://api.open-meteo.com/v1/forecast?" + query.toString(), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Weather request failed");
        return response.json();
      })
      .then((data: {
        current?: { temperature_2m?: number; weather_code?: number };
        daily?: { time?: string[]; temperature_2m_max?: number[]; temperature_2m_min?: number[] };
      }) => {
        const times = data.daily?.time;
        const highs = data.daily?.temperature_2m_max;
        const lows = data.daily?.temperature_2m_min;
        const temperature = data.current?.temperature_2m;
        const code = data.current?.weather_code;
        if (!times || !highs || !lows || !Number.isFinite(temperature) || !Number.isFinite(code) || times.length < 4 || highs.length < 4 || lows.length < 4) {
          throw new Error("Weather response is incomplete");
        }
        setWeather({
          current: { temperature: temperature as number, code: code as number },
          days: times.slice(1, 4).map((date, index) => ({ date, high: highs[index + 1], low: lows[index + 1] })),
        });
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setWeather(null);
      });

    return () => controller.abort();
  }, []);

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-shell">
        <div className="footer-share">
          <span className="footer-share-label">{t("footer.share")}</span>
          <div className="footer-share-buttons">
            <a className="footer-share-button" href="#share-facebook" aria-label="Facebook" onClick={(event) => { event.preventDefault(); openShare("facebook"); }}><BrandGlyph name="facebook" /></a>
            <a className="footer-share-button" href="#share-x" aria-label="X / Twitter" onClick={(event) => { event.preventDefault(); openShare("x"); }}><BrandGlyph name="x" /></a>
            <a className="footer-share-button" href="#share-linkedin" aria-label="LinkedIn" onClick={(event) => { event.preventDefault(); openShare("linkedin"); }}><BrandGlyph name="linkedin" /></a>
            <a className="footer-share-button" href="#share-pinterest" aria-label="Pinterest" onClick={(event) => { event.preventDefault(); openShare("pinterest"); }}><BrandGlyph name="pinterest" /></a>
            <a className="footer-share-button" href="#share-email" aria-label={t("footer.emailShare")} onClick={(event) => { event.preventDefault(); openShare("email"); }}><Mail aria-hidden="true" size={19} /></a>
          </div>
          <span className="footer-share-label">{t("footer.print")}</span>
          <button type="button" className="footer-share-button" aria-label={t("footer.print")} onClick={() => window.print()}><Printer aria-hidden="true" size={19} /></button>
        </div>

        <div className="footer-main">
          <section className="footer-info" id="location">
            <h2>{t("footer.contactUs")}</h2>
            <h3>{hotel.name}</h3>
            <p className="footer-hotel-description">{t("footer.hotelDescription")}</p>
            <div className="footer-contact-list">
              <p><MapPin aria-hidden="true" /><span>{t("footer.address")}</span></p>
              <a href={`tel:${hotel.contact.phone.replaceAll(" ", "")}`}><Phone aria-hidden="true" /><span>{hotel.contact.phone}</span></a>
              <p><Clock3 aria-hidden="true" /><span>{t("footer.checkIn", { time: hotel.checkIn })}<br />{t("footer.checkOut", { time: hotel.checkOut })}</span></p>
              <p><CalendarDays aria-hidden="true" /><span>{t("footer.openAllYear")}</span></p>
            </div>
          </section>

          <section className="footer-follow">
            <h2>{t("footer.followUs")}</h2>
            <div className="footer-social-links">
              <a className="footer-social-icon" aria-label="Facebook" href={hotel.socialLinks.facebook} target="_blank" rel="noreferrer"><BrandGlyph name="facebook" /></a>
              <a className="footer-social-icon" aria-label="Instagram" href={hotel.socialLinks.instagram} target="_blank" rel="noreferrer"><BrandGlyph name="instagram" /></a>
              <a className="footer-social-icon" aria-label="Tripadvisor" href="https://www.tripadvisor.com/" target="_blank" rel="noreferrer"><Globe aria-hidden="true" size={24} strokeWidth={1.7} /></a>
            </div>
            <div className="footer-review-block">
              <h2>{t("footer.reviews")}</h2>
              <Link className="footer-review-link" href="/reviews" aria-label={t("footer.reviews")}><MessagesSquare aria-hidden="true" size={42} fill="currentColor" strokeWidth={1.6} /></Link>
            </div>
          </section>

          {weather && (
            <section className="weather-card" aria-label={t("footer.weatherTitle")}>
              <h2>{t("footer.weatherTitle")}</h2>
              <div className="weather-current">
                <div className="weather-current-reading">
                  <strong>{Math.round(weather.current.temperature)}°C</strong>
                  <span>{t(`footer.weatherConditions.${weatherConditionKey(weather.current.code)}`)}</span>
                </div>
                <WeatherIcon code={weather.current.code} size={42} />
              </div>
              <div className="weather-days">
                {weather.days.map((day) => (
                  <div className="weather-day" key={day.date}>
                    <span>{new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(`${day.date}T12:00:00`))}</span>
                    <strong className="weather-high" aria-label={t("footer.high")}>{Math.round(day.high)}°</strong>
                    <strong className="weather-low" aria-label={t("footer.low")}>{Math.round(day.low)}°</strong>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="footer-demo">{t("footer.disclaimer")}</div>
      </div>
      <div className="privacy-bar">
        <p>{t("footer.privacyBefore")} <Link href="/privacy">{t("footer.privacyPolicy")}</Link>.</p>
        <p><Link href="/privacy#delete-data">{t("footer.deleteData")}</Link></p>
        <motion.a className="to-top" href="#home" aria-label={t("footer.backToTop")} aria-hidden={!showToTop} tabIndex={showToTop ? 0 : -1} animate={{ opacity: showToTop ? 1 : 0, y: showToTop ? 0 : 8 }} transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }} style={{ pointerEvents: showToTop ? "auto" : "none" }}><ArrowUp aria-hidden="true" size={18} /></motion.a>
      </div>
    </footer>
  );
}
