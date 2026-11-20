import { ReviewsPage } from "@/components/marketing-pages";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("reviews"); }

export default function LocalizedReviewsPage() {
  return <ReviewsPage />;
}
