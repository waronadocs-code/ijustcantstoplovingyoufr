/**
 * Single source of truth for property + booking configuration.
 * Replace bookingUrl with the live Booking.com listing URL when available.
 */
export const property = {
  brandName: "MPI Hospitality",
  brandShort: "MPI",
  locationLabel: "377 Jack Hindon",
  name: "MPI Hospitality — 377 Jack Hindon",
  address: "377 Jack Hindon Street",
  city: "Pretoria",
  country: "South Africa",
  fullAddress: "377 Jack Hindon Street, Pretoria, South Africa",

  tagline: "A considered stay in Pretoria.",

  // Public location only — used for the map + "Get Directions" link.
  mapQuery: "377 Jack Hindon Street, Pretoria, South Africa",

  // TODO: paste the property's real Booking.com listing URL here.
  bookingUrl: "PASTE_BOOKING_COM_URL_HERE",

  contact: {
    // Leave blank until supplied — the footer only renders what's provided.
    email: "" as string,
    whatsapp: "" as string,
    instagram: "" as string,
  },

  maxGuests: 2,
} as const;
