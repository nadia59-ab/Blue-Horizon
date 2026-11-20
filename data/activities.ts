const gallery = (file: string) => `/optimized-images/gallery/${file.replace(/\.[^.]+$/, ".webp")}`;

export const activities = [
  { id: "divingTrip", title: "activities.items.divingTrip.title", description: "activities.highlights.divingTrip", rating: 4.8, location: "activities.location", price: 42, image: gallery("pexels-kindelmedia-8824630.jpg") },
  { id: "snorkelingBoatTrip", title: "activities.items.snorkelingBoatTrip.title", description: "activities.highlights.snorkelingBoatTrip", rating: 4.9, location: "activities.location", price: 29, image: gallery("pexels-leonardo-lamas-32247393-7001653.jpg") },
  { id: "desertSafari", title: "activities.items.desertSafari.title", description: "activities.highlights.desertSafari", rating: 4.7, location: "activities.location", price: 36, image: gallery("pexels-quang-nguyen-vinh-222549-12387908.jpg") },
  { id: "islandDayTrip", title: "activities.items.islandDayTrip.title", description: "activities.highlights.islandDayTrip", rating: 4.9, location: "activities.location", price: 48, image: gallery("pexels-rdne-8760413.jpg") },
  { id: "sunsetCruise", title: "activities.items.sunsetCruise.title", description: "activities.highlights.sunsetCruise", rating: 4.8, location: "activities.location", price: 33, image: gallery("pexels-mahmoud-atashi-238541199-17104363.jpg") },
  { id: "dolphinWatching", title: "activities.items.dolphinWatching.title", description: "activities.highlights.dolphinWatching", rating: 4.6, location: "activities.location", price: 39, image: gallery("pexels-smirnofnina-11583821.jpg") },
  { id: "quadBiking", title: "activities.items.quadBiking.title", description: "activities.highlights.quadBiking", rating: 4.7, location: "activities.location", price: 31, image: gallery("pexels-bilge-celik-245699833-34113471.jpg") },
  { id: "glassBottomBoat", title: "activities.items.glassBottomBoat.title", description: "activities.highlights.glassBottomBoat", rating: 4.5, location: "activities.location", price: 24, image: gallery("pexels-asadphoto-3293192.jpg") },
  { id: "kitesurfLesson", title: "activities.items.kitesurfLesson.title", description: "activities.highlights.kitesurfLesson", rating: 4.8, location: "activities.location", price: 55, image: gallery("pexels-harvey-clements-13141095-15763632.jpg") },
  { id: "cityTour", title: "activities.items.cityTour.title", description: "activities.highlights.cityTour", rating: 4.6, location: "activities.location", price: 27, image: gallery("pexels-rachel-claire-6127022.jpg") },
  { id: "luxorDayTrip", title: "activities.items.luxorDayTrip.title", description: "activities.highlights.luxorDayTrip", rating: 4.9, location: "activities.location", price: 72, image: gallery("pexels-richard-segal-732340-1645028.jpg") },
  { id: "cairoDayTrip", title: "activities.items.cairoDayTrip.title", description: "activities.highlights.cairoDayTrip", rating: 4.8, location: "activities.location", price: 89, image: gallery("pexels-asadphoto-12516846.jpg") },
] as const;
