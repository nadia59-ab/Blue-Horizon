import { AccommodationIndexPage } from "@/components/accommodation-pages";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("accommodation"); }

export default function AccommodationPage() {
  return <AccommodationIndexPage />;
}
