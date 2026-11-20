import { ContactPage } from "@/components/marketing-pages";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("contact"); }

export default function EnglishContactPage() {
  return <ContactPage />;
}
