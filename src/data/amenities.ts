/**
 * Only amenities that are visually confirmed in the supplied property
 * photography/video are marked `confirmed: true` and rendered on the site.
 * Toggle an item to `confirmed: true` once it has been verified — never
 * invent amenities that haven't been confirmed for this specific room.
 */
export type Amenity = {
  id: string;
  label: string;
  confirmed: boolean;
};

export const spaceFacts = [
  { id: "room", value: "01", label: "Room" },
  { id: "bathroom", value: "01", label: "Bathroom" },
  { id: "guests", value: "2", label: "Guests" },
] as const;

export const amenities: Amenity[] = [
  { id: "air-con", label: "Air Conditioning", confirmed: true },
  { id: "smart-tv", label: "Smart TV", confirmed: true },
  { id: "kitchenette", label: "Kitchenette", confirmed: true },
  { id: "private-bathroom", label: "Private Bathroom", confirmed: true },
  { id: "wifi", label: "Wi-Fi", confirmed: false },
  { id: "parking", label: "Parking", confirmed: false },
];

export const confirmedAmenities = amenities.filter((a) => a.confirmed);
