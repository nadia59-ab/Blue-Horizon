import { LocationPage } from "@/components/marketing-pages";

export default function LocalizedLocationPage() {
  return <LocationPage />;
}
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("location"); }
