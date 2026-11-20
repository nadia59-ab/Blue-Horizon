const image = (path: string, altKey: string) => ({ src: `/optimized-images/${path.replace(/\.[^.]+$/, ".webp")}`, altKey });

export const hotel = {
  name: "Blue Horizon Hotel & Beach",
  location: {
    city: "Hurghada",
    country: "Egypt",
    address: "Hurghada, Red Sea Governorate, Egypt",
    coordinates: { latitude: 27.2579, longitude: 33.8116 },
  },
  contact: {
    email: "hello@bluehorizon.example",
    phone: "+20 000 000 0000",
  },
  checkIn: "15:00",
  checkOut: "11:00",
  socialLinks: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  currency: "USD",
} as const;

export const rooms = [
  {
    id: "double-mountain-view",
    nameKey: "rooms.doubleMountainView.name",
    descriptionKey: "rooms.doubleMountainView.description",
    bedsKey: "roomDetails.beds.double",
    sizeM2: 28,
    maxGuests: 2,
    beds: "1 double bed",
    amenities: ["airConditioning", "minibar", "flatScreenTv", "freeToiletries", "privateBathroom", "walkInShower", "hairdryer", "teaCoffeeMaker", "towels", "wardrobe", "desk", "wakeUpService", "telephone", "safe", "wifi", "bedLinen", "slippers", "bottledWater", "dailyHousekeeping", "mountainView"],
    images: [
      image("rooms/double-mountain-view/pexels-azli-nawawi-791168-34763215.jpg", "roomDetails.imageAlt"),
      image("rooms/double-mountain-view/pexels-misbaa-eri-426041722-36852547.jpg", "roomDetails.imageAlt"),
      image("rooms/double-mountain-view/pexels-mographe-34769651.jpg", "roomDetails.imageAlt"),
      image("rooms/double-mountain-view/pexels-quang-nguyen-vinh-222549-29000012.jpg", "roomDetails.imageAlt"),
      image("rooms/double-mountain-view/pexels-rajeshsyangtan005-12805883.jpg", "roomDetails.imageAlt"),
    ],
    pricePerNight: 85,
  },
  {
    id: "double-sea-view",
    nameKey: "rooms.doubleSeaView.name",
    descriptionKey: "rooms.doubleSeaView.description",
    bedsKey: "roomDetails.beds.double",
    sizeM2: 30,
    maxGuests: 2,
    beds: "1 double bed",
    amenities: ["airConditioning", "minibar", "flatScreenTv", "balcony", "freeToiletries", "privateBathroom", "walkInShower", "hairdryer", "teaCoffeeMaker", "towels", "wardrobe", "desk", "wakeUpService", "telephone", "safe", "wifi", "bedLinen", "slippers", "bottledWater", "dailyHousekeeping", "seaView"],
    images: [
      image("rooms/double-sea-view/pexels-ahmetcotur-29702284.jpg", "roomDetails.imageAlt"),
      image("rooms/double-sea-view/pexels-ahmetcotur-29702285.jpg", "roomDetails.imageAlt"),
      image("rooms/double-sea-view/pexels-ahmetcotur-29702286.jpg", "roomDetails.imageAlt"),
      image("rooms/double-sea-view/pexels-josef-panagiotopoulos-230385141-35431008.jpg", "roomDetails.imageAlt"),
      image("rooms/double-sea-view/pexels-rosie-c-94104461-14746022.jpg", "roomDetails.imageAlt"),
    ],
    pricePerNight: 110,
  },
  {
    id: "single-sea-view",
    nameKey: "rooms.singleSeaView.name",
    descriptionKey: "rooms.singleSeaView.description",
    bedsKey: "roomDetails.beds.single",
    sizeM2: 22,
    maxGuests: 1,
    beds: "1 single bed",
    amenities: ["airConditioning", "minibar", "flatScreenTv", "balcony", "freeToiletries", "privateBathroom", "walkInShower", "hairdryer", "teaCoffeeMaker", "towels", "wardrobe", "desk", "wakeUpService", "telephone", "safe", "wifi", "bedLinen", "slippers", "bottledWater", "dailyHousekeeping", "seaView"],
    images: [
      image("rooms/single-sea-view/pexels-ahmetcotur-24807137.jpg", "roomDetails.imageAlt"),
      image("rooms/single-sea-view/pexels-ahmetcotur-27626174.jpg", "roomDetails.imageAlt"),
      image("rooms/single-sea-view/pexels-jose-maria-ali-anaya-ccallocunto-2162070770-39333412.jpg", "roomDetails.imageAlt"),
      image("rooms/single-sea-view/pexels-lumverte-33198964.jpg", "roomDetails.imageAlt"),
    ],
    pricePerNight: 72,
  },
  {
    id: "suite-sea-view",
    nameKey: "rooms.suiteSeaView.name",
    descriptionKey: "rooms.suiteSeaView.description",
    bedsKey: "roomDetails.beds.suite",
    sizeM2: 48,
    maxGuests: 4,
    beds: "1 king bed and 1 sofa bed",
    amenities: ["airConditioning", "minibar", "flatScreenTv", "balcony", "freeToiletries", "privateBathroom", "walkInShower", "hairdryer", "teaCoffeeMaker", "towels", "wardrobe", "desk", "wakeUpService", "telephone", "safe", "wifi", "bedLinen", "slippers", "bottledWater", "dailyHousekeeping", "seaView", "separateLivingArea"],
    images: [
      image("rooms/suite-sea-view/pexels-ahmetcotur-27195986.jpg", "roomDetails.imageAlt"),
      image("rooms/suite-sea-view/pexels-ahmetcotur-31817153.jpg", "roomDetails.imageAlt"),
      image("rooms/suite-sea-view/pexels-enginakyurt-2899687.jpg", "roomDetails.imageAlt"),
      image("rooms/suite-sea-view/pexels-iamluisao-12652920.jpg", "roomDetails.imageAlt"),
      image("rooms/suite-sea-view/pexels-svh-manali-1801124329-28347472.jpg", "roomDetails.imageAlt"),
    ],
    pricePerNight: 175,
  },
] as const;

export const reviews = [
  { id: "mariam", name: "Mariam Hassan", titleKey: "reviews.items.mariam.title", textKey: "reviews.items.mariam.text", rating: 5 },
  { id: "oliver", name: "Oliver James", titleKey: "reviews.items.oliver.title", textKey: "reviews.items.oliver.text", rating: 5 },
  { id: "salma", name: "Salma Nabil", titleKey: "reviews.items.salma.title", textKey: "reviews.items.salma.text", rating: 5 },
  { id: "daniel", name: "Daniel Weber", titleKey: "reviews.items.daniel.title", textKey: "reviews.items.daniel.text", rating: 4 },
  { id: "layla", name: "Layla Farouk", titleKey: "reviews.items.layla.title", textKey: "reviews.items.layla.text", rating: 5 },
  { id: "sofia", name: "Sofia Rossi", titleKey: "reviews.items.sofia.title", textKey: "reviews.items.sofia.text", rating: 4 },
] as const;

export const facilities = [
  { id: "parking", titleKey: "why.items.parking.title", descriptionKey: "why.items.parking.description", icon: "parking" },
  { id: "restaurant", titleKey: "why.items.restaurant.title", descriptionKey: "why.items.restaurant.description", icon: "restaurant" },
  { id: "room-service", titleKey: "why.items.roomService.title", descriptionKey: "why.items.roomService.description", icon: "roomService" },
  { id: "bar", titleKey: "why.items.bar.title", descriptionKey: "why.items.bar.description", icon: "bar" },
  { id: "front-desk", titleKey: "why.items.frontDesk.title", descriptionKey: "why.items.frontDesk.description", icon: "frontDesk" },
  { id: "family-rooms", titleKey: "why.items.familyRooms.title", descriptionKey: "why.items.familyRooms.description", icon: "family" },
] as const;

export const amenitiesServices = [
  { id: "parking", icon: "MdLocalParking", labelKey: "facilitiesPage.amenities.parking" },
  { id: "restaurant", icon: "MdRestaurant", labelKey: "facilitiesPage.amenities.restaurant" },
  { id: "room-service", icon: "MdMeetingRoom", labelKey: "facilitiesPage.amenities.roomService" },
  { id: "bar", icon: "MdLocalBar", labelKey: "facilitiesPage.amenities.bar" },
  { id: "front-desk", icon: "MdRoomService", labelKey: "facilitiesPage.amenities.frontDesk" },
  { id: "terrace", icon: "MdBalcony", labelKey: "facilitiesPage.amenities.terrace" },
  { id: "non-smoking", icon: "MdSmokeFree", labelKey: "facilitiesPage.amenities.nonSmokingRooms" },
  { id: "airport-shuttle", icon: "MdAirportShuttle", labelKey: "facilitiesPage.amenities.airportShuttle" },
  { id: "laundry", icon: "MdLocalLaundryService", labelKey: "facilitiesPage.amenities.laundry" },
  { id: "dry-cleaning", icon: "MdDryCleaning", labelKey: "facilitiesPage.amenities.dryCleaning" },
  { id: "family-rooms", icon: "MdFamilyRestroom", labelKey: "facilitiesPage.amenities.familyRooms" },
  { id: "ironing", icon: "MdIron", labelKey: "facilitiesPage.amenities.ironingService" },
  { id: "safe-deposit-box", icon: "MdLock", labelKey: "facilitiesPage.amenities.safeDepositBox" },
  { id: "bbq", icon: "MdOutdoorGrill", labelKey: "facilitiesPage.amenities.bbqFacilities" },
  { id: "private-beach", icon: "MdBeachAccess", labelKey: "facilitiesPage.amenities.privateBeachArea" },
  { id: "wifi", icon: "MdWifi", labelKey: "facilitiesPage.amenities.freeWifi" },
  { id: "air-conditioning", icon: "MdAcUnit", labelKey: "facilitiesPage.amenities.airConditioning" },
  { id: "tours", icon: "MdTour", labelKey: "facilitiesPage.amenities.toursExcursions" },
  { id: "atm", icon: "MdAtm", labelKey: "facilitiesPage.amenities.atm" },
  { id: "luggage", icon: "MdLuggage", labelKey: "facilitiesPage.amenities.luggageStorage" },
] as const;

export const galleryPhotos = [
  { id: "restaurant", ...image("gallery/pexels-asadphoto-12516846.jpg", "galleryPage.images.restaurant") },
  { id: "terrace", ...image("gallery/pexels-asadphoto-3293192.jpg", "galleryPage.images.terrace") },
  { id: "sunset", ...image("gallery/pexels-bilge-celik-245699833-34113471.jpg", "galleryPage.images.sunset") },
  { id: "sea", ...image("gallery/pexels-harvey-clements-13141095-15763632.jpg", "galleryPage.images.sea") },
  { id: "reef", ...image("gallery/pexels-kindelmedia-8824630.jpg", "galleryPage.images.sea") },
  { id: "reef-life", ...image("gallery/pexels-leonardo-lamas-32247393-7001653.jpg", "galleryPage.images.sea") },
  { id: "sunset-boat", ...image("gallery/pexels-mahmoud-atashi-238541199-17104363.jpg", "galleryPage.images.sunset") },
  { id: "coast", ...image("gallery/pexels-quang-nguyen-vinh-222549-12387908.jpg", "galleryPage.images.exterior") },
  { id: "hotel", ...image("gallery/pexels-rachel-claire-6127022.jpg", "galleryPage.images.exterior") },
  { id: "beach", ...image("gallery/pexels-rdne-8760413.jpg", "galleryPage.images.beach") },
  { id: "restaurant-evening", ...image("gallery/pexels-richard-segal-732340-1645028.jpg", "galleryPage.images.restaurant") },
  { id: "gallery-12", ...image("gallery/pexels-smirnofnina-11583821.jpg", "galleryPage.images.terrace") },
  { id: "gallery-13", ...image("gallery/pexels-zeynep-sahin-363019162-37097894.jpg", "galleryPage.images.beach") },
] as const;

export const heroSlides = [
  image("hero/pexels-g-cicconeto-2152098123-33648513.jpg", "galleryPage.images.beach"),
  image("hero/pexels-jess-vide-5232286.jpg", "galleryPage.images.sea"),
  image("hero/pexels-valera-rychman-1082044823-24913567.jpg", "galleryPage.images.terrace"),
] as const;

export const nearbyPlaces = [
  { id: "airport", nameKey: "locationPage.nearby.airport", distance: "12 km" },
  { id: "marina", nameKey: "locationPage.nearby.marina", distance: "7 km" },
  { id: "aquarium", nameKey: "locationPage.nearby.aquarium", distance: "4 km" },
  { id: "beaches", nameKey: "locationPage.nearby.beaches", distance: "0.2 km" },
] as const;
