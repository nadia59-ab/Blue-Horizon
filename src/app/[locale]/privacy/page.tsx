import PrivacyPage from "@/components/privacy-page";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("privacy"); }

export default function LocalizedPrivacyPage() {
  return <PrivacyPage />;
}
