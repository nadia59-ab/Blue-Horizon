import { AccommodationRoomPage } from "@/components/accommodation-pages";
import { roomMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return roomMetadata((await params).slug); }

export default async function AccommodationRoomRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AccommodationRoomPage roomId={slug} />;
}
