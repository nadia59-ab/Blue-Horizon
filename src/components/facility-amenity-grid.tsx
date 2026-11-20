"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  MdAcUnit, MdAirportShuttle, MdAtm, MdBalcony, MdBeachAccess, MdDryCleaning,
  MdFamilyRestroom, MdIron, MdLocalBar, MdLocalLaundryService, MdLocalParking,
  MdLock, MdLuggage, MdMeetingRoom, MdOutdoorGrill, MdRestaurant, MdRoomService,
  MdSmokeFree, MdTour, MdWifi,
} from "react-icons/md";

const facilityIcons = {
  MdLocalParking, MdRestaurant, MdMeetingRoom, MdLocalBar, MdRoomService, MdBalcony,
  MdSmokeFree, MdAirportShuttle, MdLocalLaundryService, MdDryCleaning, MdFamilyRestroom,
  MdIron, MdLock, MdOutdoorGrill, MdBeachAccess, MdWifi, MdAcUnit, MdTour, MdAtm, MdLuggage,
} satisfies Record<string, IconType>;

type Amenity = { id: string; icon: keyof typeof facilityIcons; label: string };

export default function FacilityAmenityGrid({ items }: { items: Amenity[] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="facility-amenities-grid"
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      animate={reducedMotion ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {items.map((item) => {
        const Icon = facilityIcons[item.icon];
        return (
          <motion.article
            className="facility-amenity"
            key={item.id}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }}
            whileHover={reducedMotion ? undefined : "hover"}
          >
            <motion.span
              className="facility-amenity-icon-wrap"
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.7 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 18 } },
                hover: { y: -6, scale: 1.12, transition: { duration: 0.3 } },
              }}
            >
              <Icon aria-hidden="true" className="facility-amenity-icon" />
            </motion.span>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
              {item.label}
            </motion.h2>
            <motion.span
              className="facility-amenity-underline"
              aria-hidden="true"
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                hover: { scaleX: 1.5, transition: { duration: 0.3 } },
              }}
            />
          </motion.article>
        );
      })}
    </motion.div>
  );
}
