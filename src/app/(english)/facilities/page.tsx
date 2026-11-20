import { FacilitiesPage } from "@/components/marketing-pages";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("facilities"); }

export default function EnglishFacilitiesPage() {
  return <FacilitiesPage />;
}
