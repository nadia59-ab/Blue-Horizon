"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { galleryPhotos } from "../../data/hotel";
import SiteHeader from "@/components/site-header";
import PageHeader from "@/components/page-header";
import { ImageReveal, PageEntrance, Stagger } from "@/components/motion";

export default function PhotoGalleryPage() {
  const t = useTranslations();
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const movePhoto = (step: number) => {
    setActivePhoto((current) => current === null ? null : (current + step + galleryPhotos.length) % galleryPhotos.length);
  };

  const active = activePhoto === null ? null : galleryPhotos[activePhoto];

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("galleryPage.title")} />
      <section className="photo-gallery section-pad" aria-label={t("galleryPage.title")}>
        <Stagger className="photo-grid">
          {galleryPhotos.map((photo, index) => {
            const description = t(photo.altKey);
            return (
              <button className={`photo-tile photo-tile-${index + 1}`} type="button" key={photo.id} onClick={() => setActivePhoto(index)} aria-label={t("galleryPage.openImage", { description })}>
                <ImageReveal><Image src={photo.src} alt={description} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" quality={75} loading="lazy" /></ImageReveal>
                <span>{description}</span>
              </button>
            );
          })}
        </Stagger>
      </section>
      {active && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t("galleryPage.openImage", { description: t(active.altKey) })}
          tabIndex={-1}
          data-lenis-prevent
          onClick={(event) => { if (event.target === event.currentTarget) setActivePhoto(null); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActivePhoto(null);
            if (event.key === "ArrowLeft") movePhoto(-1);
            if (event.key === "ArrowRight") movePhoto(1);
          }}
        >
          <button className="lightbox-close" type="button" aria-label={t("galleryPage.close")} onClick={() => setActivePhoto(null)}>×</button>
          <button className="lightbox-arrow lightbox-previous" type="button" aria-label={t("galleryPage.previous")} onClick={() => movePhoto(-1)}>‹</button>
          <figure>
            <Image src={active.src} alt={t(active.altKey)} fill sizes="92vw" priority quality={75} />
            <figcaption>{t(active.altKey)}</figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" aria-label={t("galleryPage.next")} onClick={() => movePhoto(1)}>›</button>
        </div>
      )}
    </PageEntrance>
  );
}
