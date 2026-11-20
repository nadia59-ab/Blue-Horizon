import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { rooms } from "../../data/hotel";

const pageKeys = {
  home: ["site.homeHeading", "hero.galleryLabel"],
  location: ["locationPage.title", "locationPage.intro"],
  accommodation: ["accommodationPage.title", "accommodationPage.intro"],
  facilities: ["facilitiesPage.title", "facilitiesPage.intro"],
  photos: ["galleryPage.title", "galleryPage.intro"],
  reviews: ["reviewsPage.title", "reviewsPage.intro"],
  contact: ["contactPage.title", "contactPage.intro"],
  privacy: ["footer.privacyPolicy", "privacyPage.metaDescription"],
} as const;

export async function pageMetadata(page: keyof typeof pageKeys): Promise<Metadata> {
  const t = await getTranslations();
  if (page === "home") return { title: t("site.name"), description: t("cta.text") };
  const [titleKey, descriptionKey] = pageKeys[page];
  return { title: `${t(titleKey)} | ${t("site.name")}`, description: t(descriptionKey) };
}

export async function roomMetadata(roomId: string): Promise<Metadata> {
  const t = await getTranslations();
  const room = rooms.find((item) => item.id === roomId);
  if (!room) return pageMetadata("accommodation");
  return { title: `${t(room.nameKey)} | ${t("site.name")}`, description: t(room.descriptionKey) };
}
