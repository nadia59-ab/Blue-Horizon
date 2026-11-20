import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL } from "../../config/booking";
import { rooms } from "../../data/hotel";
import SiteHeader from "@/components/site-header";
import RoomCard from "@/components/room-card";
import RoomImageGallery from "@/components/room-image-gallery";
import PageHeader from "@/components/page-header";
import { FadeIn, PageEntrance, Stagger } from "@/components/motion";
import BookingArrow from "@/components/booking-arrow";
import { BedDouble, Check, List, Maximize2, UsersRound } from "lucide-react";

function RoomFacts({ room, t }: { room: (typeof rooms)[number]; t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="room-facts">
      <span><Maximize2 aria-hidden="true" size={15} />{t("roomDetails.size", { size: room.sizeM2 })}</span>
      <span><UsersRound aria-hidden="true" size={15} />{t("roomDetails.guests", { count: room.maxGuests })}</span>
      <span><BedDouble aria-hidden="true" size={15} />{t(room.bedsKey)}</span>
    </div>
  );
}

export async function AccommodationIndexPage() {
  const t = await getTranslations();

  return (
    <PageEntrance className="accommodation-page">
      <SiteHeader />
      <PageHeader title={t("accommodationPage.title")} />
      <section className="accommodation-list section-pad" aria-label={t("accommodationPage.title")}>
        <Stagger className="rooms-grid">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </Stagger>
      </section>
    </PageEntrance>
  );
}

export async function AccommodationRoomPage({ roomId }: { roomId: string }) {
  const t = await getTranslations();
  const room = rooms.find((item) => item.id === roomId);
  if (!room) notFound();

  const roomName = t(room.nameKey);

  return (
    <PageEntrance className="accommodation-page">
      <SiteHeader />
      <section className="room-detail-shell section-pad">
        <Link className="back-to-accommodation" href="/accommodation">&larr; {t("accommodationPage.back")}</Link>
        <header className="room-detail-heading">
          <h1>{roomName}</h1>
          <span aria-hidden="true" />
        </header>
        <div className="room-detail-grid">
          <FadeIn direction="left">
          <RoomImageGallery
            images={room.images}
            roomName={roomName}
            imageAlts={room.images.map((image, index) => t(image.altKey, { roomName, number: index + 1 }))}
            selectLabels={room.images.map((_, index) => t("accommodationPage.selectImage", { roomName, number: index + 1 }))}
            previousLabel={t("accommodationPage.previousImage")}
            nextLabel={t("accommodationPage.nextImage")}
          />
          </FadeIn>
          <FadeIn className="room-detail-content" direction="right">
            <RoomFacts room={room} t={t} />
            <p className="room-detail-description">{t(room.descriptionKey)}</p>
            <h2 className="room-amenities-heading"><List aria-hidden="true" size={21} strokeWidth={1.7} />{t("accommodationPage.amenitiesTitle")}</h2>
            <ul className="room-amenities">
              {room.amenities.map((amenity) => (
                <li key={amenity}>
                  <Check className="amenity-check" aria-hidden="true" size={18} />
                  <span>{t(`accommodationPage.amenities.${amenity}`)}</span>
                </li>
              ))}
            </ul>
            <a className="button button-dark room-detail-book" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t("booking.bookNow")} <BookingArrow /></a>
          </FadeIn>
        </div>
        <section className="other-rooms" aria-labelledby="other-rooms-heading">
          <FadeIn><h2 id="other-rooms-heading">{t("accommodationPage.otherRooms")}</h2></FadeIn>
          <Stagger className="rooms-grid other-rooms-grid">
            {rooms.filter((item) => item.id !== room.id).map((otherRoom) => <RoomCard key={otherRoom.id} room={otherRoom} />)}
          </Stagger>
        </section>
      </section>
    </PageEntrance>
  );
}
