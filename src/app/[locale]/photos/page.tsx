import PhotoGalleryPage from "@/components/photo-gallery";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata() { return pageMetadata("photos"); }

export default function LocalizedPhotoGalleryPage() {
  return <PhotoGalleryPage />;
}
