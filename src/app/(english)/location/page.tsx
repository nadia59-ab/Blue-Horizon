import { LocationPage } from "@/components/marketing-pages";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("location"); }

export default function EnglishLocationPage() {
  return <LocationPage />;
}
