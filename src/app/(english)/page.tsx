import HomePage from "@/components/home-page";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("home"); }

export default function EnglishHomePage() {
  return <HomePage />;
}
