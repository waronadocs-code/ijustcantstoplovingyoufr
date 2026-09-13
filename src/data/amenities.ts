// ============================================================================
// AMENITIES
// Only items with `confirmed: true` are rendered on the site. Flip a flag to
// `true` (and adjust `value`/`label` if needed) once it has been verified —
// nothing else needs to change. Never flip a flag to true without checking.
// ============================================================================

export type Amenity = {
  key: string;
  value: string;
  label: string;
  confirmed: boolean;
};

export const amenities: Amenity[] = [
  { key: "rooms", value: "01", label: "Room", confirmed: true },
  { key: "bathrooms", value: "01", label: "Bathroom", confirmed: true },
  { key: "guests", value: "2", label: "Guests", confirmed: true },
  { key: "ac", value: "AC", label: "Air Conditioning", confirmed: true },
  { key: "tv", value: "TV", label: "Smart TV", confirmed: true },
  { key: "kitchenette", value: "K", label: "Kitchenette", confirmed: true },
  { key: "wifi", value: "WIFI", label: "Wi-Fi", confirmed: false },
  { key: "parking", value: "P", label: "Parking", confirmed: false },
];

export const confirmedAmenities = amenities.filter((a) => a.confirmed);
