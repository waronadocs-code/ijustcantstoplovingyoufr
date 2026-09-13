// ============================================================================
// PROPERTY CONFIGURATION
// Edit this file to update the brand, address, contact details and the
// Booking.com URL. Nothing else in the codebase needs to change.
// ============================================================================

export const property = {
  brand: "MPI Hospitality",
  location: "377 Jack Hindon",
  address: "377 Jack Hindon Street",
  city: "Pretoria",
  country: "South Africa",
  fullAddress: "377 Jack Hindon Street, Pretoria, South Africa",

  tagline: "A considered stay in Pretoria.",

  // -------------------------------------------------------------------------
  // BOOKING
  // Paste the property's Booking.com listing URL below. Everything else
  // (date pickers, guest count, redirect) is wired up already.
  // -------------------------------------------------------------------------
  bookingUrl: "PASTE_BOOKING_COM_URL_HERE",

  // If true, the selected check-in/check-out dates and guest count are
  // appended to the Booking.com URL as query parameters (checkin, checkout,
  // group_adults, no_rooms) — these are the parameter names Booking.com's
  // property pages generally read. If the pasted URL doesn't support them,
  // set this to false and guests will simply land on the listing itself.
  appendBookingParams: true,

  // -------------------------------------------------------------------------
  // CONTACT — only rendered where a value is provided. Leave blank ("") to
  // hide a given channel in the footer.
  // -------------------------------------------------------------------------
  contact: {
    email: "" as string,
    whatsapp: "" as string,
    instagram: "" as string,
  },

  // Used to build a directions link and the embedded map. This is the public
  // street address only — no unit numbers or private access details.
  mapsQuery: "377 Jack Hindon Street, Pretoria, South Africa",

  year: new Date().getFullYear(),
} as const;

export type Property = typeof property;
