"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ImageReveal } from "@/components/motion";

type RoomPhoto = { src: string; altKey: string };

export default function RoomImageGallery({
  images,
  roomName,
  imageAlts,
  selectLabels,
  previousLabel,
  nextLabel,
}: {
  images: readonly RoomPhoto[];
  roomName: string;
  imageAlts: string[];
  selectLabels: string[];
  previousLabel: string;
  nextLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];
  const alt = imageAlts[activeIndex];

  return (
    <div className="room-detail-photo">
      <div className="room-main-image">
        <AnimatePresence initial={false} mode="sync">
          <ImageReveal key={active.src} duration={0.3}>
            <Image src={active.src} alt={alt} fill priority sizes="(max-width: 800px) 100vw, 58vw" quality={75} />
          </ImageReveal>
        </AnimatePresence>
        {images.length > 1 && <>
          <button type="button" className="room-gallery-arrow room-gallery-arrow-prev" aria-label={previousLabel} onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}><ChevronLeft aria-hidden="true" size={28} /></button>
          <button type="button" className="room-gallery-arrow room-gallery-arrow-next" aria-label={nextLabel} onClick={() => setActiveIndex((activeIndex + 1) % images.length)}><ChevronRight aria-hidden="true" size={28} /></button>
        </>}
      </div>
      <div className="room-image-thumbnails" aria-label={`${roomName} photos`}>
        {images.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={selectLabels[index]}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            <Image src={photo.src} alt="" fill sizes="90px" quality={75} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
