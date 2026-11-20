"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Maximize2, UsersRound, BedDouble } from "lucide-react";
import { BOOKING_URL } from "../../config/booking";
import { rooms } from "../../data/hotel";
import { ImageReveal } from "@/components/motion";

type Room = (typeof rooms)[number];

export default function RoomCard({ room }: { room: Room }) {
  const t = useTranslations();
  const roomName = t(room.nameKey);

  return (
    <article className="room-card">
      <Link className="room-photo-wrap" href={`/accommodation/${room.id}`} aria-label={t("accommodationPage.imageAlt", { roomName })}>
        <ImageReveal>
          <Image src={room.images[0].src} alt={t(room.images[0].altKey, { roomName, number: 1 })} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" className="room-photo" quality={75} loading="lazy" />
        </ImageReveal>
      </Link>
      <div className="room-card-content">
        <h2>{roomName}</h2>
        <div className="room-facts">
          <span><Maximize2 aria-hidden="true" size={18} />{t("roomDetails.size", { size: room.sizeM2 })}</span>
          <span><UsersRound aria-hidden="true" size={18} />{t("roomDetails.guests", { count: room.maxGuests })}</span>
          <span><BedDouble aria-hidden="true" size={18} />{t(room.bedsKey)}</span>
        </div>
        <div className="room-card-actions">
          <Link className="text-link" href={`/accommodation/${room.id}`}>{t("common.viewMore")}</Link>
          <a className="room-book-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{t("booking.bookNow")}</a>
        </div>
      </div>
    </article>
  );
}
