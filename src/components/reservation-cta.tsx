"use client";

import { useTranslations } from "next-intl";
import { BOOKING_URL } from "../../config/booking";
import { FadeIn } from "@/components/motion";

export default function ReservationCta() {
  const t = useTranslations();
  return (
    <section className="reservation-cta" style={{ backgroundImage: "url('/optimized-images/hero/pexels-valera-rychman-1082044823-24913567.webp')" }}>
      <div className="reservation-overlay" aria-hidden="true" />
      <FadeIn><h2>{t("cta.homeHeading")}</h2></FadeIn>
      <FadeIn><a className="button button-light" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t("booking.bookNow")}</a></FadeIn>
    </section>
  );
}
