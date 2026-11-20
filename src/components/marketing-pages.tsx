import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/site-header";
import { amenitiesServices, hotel, nearbyPlaces, reviews } from "../../data/hotel";
import { CONTACT_EMAIL } from "../../config/contact";
import ContactMailForm from "@/components/contact-mail-form";
import LocationExperiences from "@/components/location-experiences";
import PageHeader from "@/components/page-header";
import { FadeIn, PageEntrance, Stagger } from "@/components/motion";
import FacilityAmenityGrid from "@/components/facility-amenity-grid";

export async function FacilitiesPage() {
  const t = await getTranslations();

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("facilitiesPage.title")} />
      <section className="facility-amenities-section section-pad" aria-label={t("facilitiesPage.amenitiesHeading")}>
        <FadeIn><h2 className="facility-amenities-heading">{t("facilitiesPage.amenitiesHeading")}</h2></FadeIn>
        <FacilityAmenityGrid items={amenitiesServices.map((item) => ({ ...item, label: t(item.labelKey) }))} />
      </section>
    </PageEntrance>
  );
}

export async function ReviewsPage() {
  const t = await getTranslations();

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("reviewsPage.title")} />
      <section className="all-reviews section-pad" aria-label={t("reviewsPage.title")}>
        <Stagger className="all-review-grid">
          {reviews.map((review) => (
            <article className="all-review-card" key={review.id}>
              <div className="stars" aria-label={t("reviewsPage.rating", { rating: review.rating })}>
                {"★".repeat(review.rating)}<span>{"★".repeat(5 - review.rating)}</span>
              </div>
              <h2>{t(review.titleKey)}</h2>
              <p>{t(review.textKey)}</p>
              <div className="all-review-author"><span>{review.name.charAt(0)}</span>{review.name}</div>
            </article>
          ))}
        </Stagger>
      </section>
    </PageEntrance>
  );
}

export async function LocationPage() {
  const t = await getTranslations();
  const { latitude, longitude } = hotel.location.coordinates;
  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`;

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("locationPage.title")} />
      <section className="location-layout section-pad">
        <FadeIn className="location-map-wrap" direction="left">
          <iframe src={mapUrl} title={t("locationPage.mapTitle")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </FadeIn>
        <FadeIn className="location-details" direction="right">
          <p className="eyebrow"><span />{t("locationPage.addressLabel")}</p>
          <h2>{t("footer.address")}</h2>
          <div className="nearby-heading"><h3>{t("locationPage.nearbyTitle")}</h3><span>{t("locationPage.distanceLabel")}</span></div>
          <ul className="nearby-list">
            {nearbyPlaces.map((place) => (
              <li key={place.id}><span>{t(place.nameKey)}</span><strong>{place.distance}</strong></li>
            ))}
          </ul>
        </FadeIn>
      </section>
      <LocationExperiences />
    </PageEntrance>
  );
}

export async function ContactPage() {
  const t = await getTranslations();

  return (
    <PageEntrance className="inner-page">
      <SiteHeader />
      <PageHeader title={t("contactPage.title")} />
      <section className="contact-layout section-pad">
        <FadeIn className="contact-details" direction="left">
          <p className="eyebrow"><span />{t("contactPage.detailsTitle")}</p>
          <dl>
            <div><dt>{t("contactPage.address")}</dt><dd>{t("footer.address")}</dd></div>
            <div><dt>{t("contactPage.phone")}</dt><dd><a href={`tel:${hotel.contact.phone.replaceAll(" ", "")}`}>{hotel.contact.phone}</a></dd></div>
            <div><dt>{t("contactPage.email")}</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
          </dl>
          <p className="contact-hours">{t("contactPage.checkIn", { time: hotel.checkIn })}<br />{t("contactPage.checkOut", { time: hotel.checkOut })}</p>
        </FadeIn>
        <FadeIn direction="right"><ContactMailForm email={CONTACT_EMAIL} /></FadeIn>
      </section>
    </PageEntrance>
  );
}
