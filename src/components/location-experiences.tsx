"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Globe2, Star } from "lucide-react";
import { activities } from "../../data/activities";
import { galleryPhotos } from "../../data/hotel";
import { BOOKING_URL } from "../../config/booking";
import { FadeIn, ImageReveal, Stagger } from "@/components/motion";

const locationPhotos = galleryPhotos.slice(0, 6);
const activityHighlights = activities.slice(0, 11);

export default function LocationExperiences() {
  const t = useTranslations();
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const movePhoto = (step: number) => setActivePhoto((current) => current === null ? null : (current + step + locationPhotos.length) % locationPhotos.length);
  const active = activePhoto === null ? null : locationPhotos[activePhoto];

  return (
    <>
      <section className="location-experience section-pad">
        <FadeIn className="location-activities" direction="left">
          <FadeIn><h2>{t("activities.thingsToDo")}</h2></FadeIn>
          <ol>
            {activityHighlights.map((activity, index) => (
              <li key={activity.id}>
                <span className="location-activity-number">{String(index + 1).padStart(2, "0")}</span>
                <p><strong>{t(activity.title)}</strong> {t(activity.description)}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
        <Stagger className="location-photo-grid" aria-label={t("locationPage.title")}>
          {locationPhotos.map((photo, index) => {
            const description = t(photo.altKey);
            return (
              <button key={photo.id} type="button" className="location-photo-tile" aria-label={t("galleryPage.openImage", { description })} onClick={() => setActivePhoto(index)}>
                <ImageReveal><Image src={photo.src} alt={description} fill sizes="(max-width: 850px) 50vw, 22vw" quality={75} loading="lazy" /></ImageReveal>
              </button>
            );
          })}
        </Stagger>
      </section>

      <section className="activity-tour-section section-pad" aria-labelledby="activity-tour-heading">
        <FadeIn><h2 id="activity-tour-heading">{t("activities.sectionTitle")}</h2></FadeIn>
        <Stagger className="activity-tour-grid">
          {activities.map((activity) => (
            <article className="activity-tour-card" key={activity.id}>
              <div className="activity-tour-photo">
                <ImageReveal><Image src={activity.image} alt={t(activity.title)} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 33vw, 16vw" quality={75} loading="lazy" /></ImageReveal>
              </div>
              <div className="activity-tour-content">
                <div className="activity-tour-rating"><Star aria-hidden="true" size={15} fill="currentColor" /><span>{activity.rating.toFixed(1)}</span></div>
                <h3>{t(activity.title)}</h3>
                <p className="activity-tour-detail"><Globe2 aria-hidden="true" size={16} /><span>{t(activity.location)}</span></p>
                <p className="activity-tour-detail"><Check aria-hidden="true" size={16} /><span>{t("activities.freeCancellation")}</span></p>
                <p className="activity-tour-price"><span>{t("activities.from")}</span> <strong>${activity.price}</strong></p>
                <a className="activity-tour-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t("activities.bookNow")}</a>
              </div>
            </article>
          ))}
        </Stagger>
        <p className="activity-tour-note">{t("activities.sampleNote")}</p>
      </section>

      {active && (
        <div className="photo-lightbox" data-lenis-prevent role="dialog" aria-modal="true" aria-label={t("galleryPage.openImage", { description: t(active.altKey) })} tabIndex={-1}
          onClick={(event) => { if (event.target === event.currentTarget) setActivePhoto(null); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActivePhoto(null);
            if (event.key === "ArrowLeft") movePhoto(-1);
            if (event.key === "ArrowRight") movePhoto(1);
          }}>
          <button className="lightbox-close" type="button" aria-label={t("galleryPage.close")} onClick={() => setActivePhoto(null)}>×</button>
          <button className="lightbox-arrow lightbox-previous" type="button" aria-label={t("galleryPage.previous")} onClick={() => movePhoto(-1)}>‹</button>
          <figure>
            <Image src={active.src} alt={t(active.altKey)} fill sizes="92vw" priority quality={75} />
            <figcaption>{t(active.altKey)}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label={t("galleryPage.next")} onClick={() => movePhoto(1)}>›</button>
        </div>
      )}
    </>
  );
}
