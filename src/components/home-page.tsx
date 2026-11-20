"use client";

import Image from "next/image";
import { facilities, heroSlides, reviews, rooms } from "../../data/hotel";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SiteHeader from "@/components/site-header";
import RoomCard from "@/components/room-card";
import { FadeIn, PageEntrance, Stagger } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { BedDouble, ConciergeBell, DoorOpen, Martini, MessagesSquare, Utensils } from "lucide-react";

type IconName = "parking" | "restaurant" | "roomService" | "bar" | "frontDesk" | "family";

const facilityIcons = {
  restaurant: Utensils,
  roomService: DoorOpen,
  bar: Martini,
  frontDesk: ConciergeBell,
  family: BedDouble,
};

function FacilityIcon({ name, className = "" }: { name: IconName; className?: string }) {
  if (name === "parking") {
    return <span aria-hidden="true" className={`feature-icon-parking ${className}`}>P</span>;
  }
  const Icon = facilityIcons[name];
  return <Icon aria-hidden="true" className={className} fill="currentColor" strokeWidth={1.8} />;
}

export default function HomePage() {
  const t = useTranslations();
  const reducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [reviewStart, setReviewStart] = useState(0);
  const [previousReview, setPreviousReview] = useState<number | null>(null);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  useEffect(() => {
    if (heroPaused) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 4000);
    return () => window.clearInterval(timer);
  }, [heroPaused, activeSlide]);

  useEffect(() => {
    if (reviewsPaused) return;
    const timer = window.setTimeout(() => {
      setPreviousReview(reviewStart);
      setReviewStart((reviewStart + 1) % reviews.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [reviewsPaused, reviewStart]);

  useEffect(() => {
    if (previousReview === null) return;
    const timer = window.setTimeout(() => setPreviousReview(null), 400);
    return () => window.clearTimeout(timer);
  }, [previousReview]);


  function selectReview(index: number) {
    if (reviewStart === index) return;
    setPreviousReview(reviewStart);
    setReviewStart(index);
  }

  return (
    <PageEntrance>
      <SiteHeader />
      <h1 className="sr-only">{t("site.homeHeading")}</h1>

      <section className="hero" id="home" aria-label={t("hero.galleryLabel")} onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)}>
        <div className="hero-slides" id="gallery">
          {heroSlides.map((slide, index) => (
            <div className={`hero-slide${activeSlide === index ? " is-active" : ""}`} key={slide.src} aria-hidden="true">
              <Image src={slide.src} alt={t(slide.altKey)} fill priority={index === activeSlide || index === (activeSlide + 1) % heroSlides.length} sizes="100vw" quality={75} />
            </div>
          ))}
        </div>
        <button className="hero-arrow hero-arrow-prev" type="button" aria-label={t("hero.previousSlide")} onClick={() => setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}><span /></button>
        <button className="hero-arrow hero-arrow-next" type="button" aria-label={t("hero.nextSlide")} onClick={() => setActiveSlide((current) => (current + 1) % heroSlides.length)}><span /></button>
        <div className="hero-pagination" aria-label={t("hero.slideControls")}>
          {heroSlides.map((slide, index) => (
            <button key={slide.src} type="button" aria-label={t("hero.goToSlide", { number: index + 1 })} aria-pressed={activeSlide === index} onClick={() => setActiveSlide(index)}>
              <span />
            </button>
          ))}
        </div>
      </section>

      <motion.section
        className="why-section section-pad"
        id="why-us"
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        animate={reducedMotion ? "visible" : undefined}
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="section-heading centered-heading why-heading">
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >{t("why.title")}</motion.h2>
        </div>
        <motion.div className="feature-grid" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {facilities.map((facility, index) => (
            <motion.article
              className="feature-card"
              key={facility.id}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
              whileHover={reducedMotion ? undefined : "hover"}
            >
              <span className="feature-number">0{index + 1}</span>
              <motion.span
                className="feature-icon-wrap"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.7 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
                  hover: { y: -6, scale: 1.12, transition: { duration: 0.3 } },
                }}
              >
                <FacilityIcon name={facility.icon} className="feature-icon" />
              </motion.span>
              <motion.h3
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              >{t(facility.titleKey)}</motion.h3>
              <motion.span
                className="feature-underline"
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] } },
                  hover: { scaleX: 3.6, transition: { duration: 0.3 } },
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <section className="rooms-section section-pad" id="accommodation">
        <div className="section-heading centered-heading rooms-section-heading">
          <FadeIn><h2>{t("roomsSection.title")}</h2></FadeIn>
          <FadeIn><p>{t("roomsSection.subtitle")}</p></FadeIn>
        </div>
        <Stagger className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Stagger>
        <Link className="button button-sand choose-type" href="/accommodation">{t("roomsSection.chooseType")}</Link>
      </section>

      <section className="reviews-section section-pad" id="reviews" onMouseEnter={() => setReviewsPaused(true)} onMouseLeave={() => setReviewsPaused(false)}>
        <div className="reviews-heading">
          <FadeIn><h2>{t("reviews.homeHeading")}</h2></FadeIn>
          <FadeIn><MessagesSquare aria-hidden="true" className="reviews-chat-icon" size={56} fill="currentColor" strokeWidth={1.7} /></FadeIn>
        </div>
        <div className="review-showcase" aria-live="polite">
          {previousReview !== null && (
            <article className="review-slide is-leaving" aria-hidden="true">
              <span className="review-rule" />
              <h3>&ldquo;{t(reviews[previousReview].titleKey)}&rdquo;</h3>
              <span className="review-rule" />
              <p className="review-text">{t(reviews[previousReview].textKey)}</p>
              <p className="review-author">{reviews[previousReview].name}</p>
            </article>
          )}
          <article className="review-slide is-current" key={reviews[reviewStart].id}>
            <span className="review-rule" />
            <h3>&ldquo;{t(reviews[reviewStart].titleKey)}&rdquo;</h3>
            <span className="review-rule" />
            <p className="review-text">{t(reviews[reviewStart].textKey)}</p>
            <p className="review-author">{reviews[reviewStart].name}</p>
          </article>
        </div>
        <div className="review-pagination" aria-label={t("reviews.homeHeading")}>
          {reviews.map((review, index) => (
            <button key={review.id} type="button" aria-label={t(review.titleKey)} aria-pressed={reviewStart === index} onClick={() => selectReview(index)} />
          ))}
        </div>
      </section>

    </PageEntrance>
  );
}
