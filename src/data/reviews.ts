/**
 * No verified guest reviews have been supplied for this property yet.
 * Populate this array once real testimonials (e.g. from Booking.com) are
 * available. Left empty intentionally — the UI never fabricates reviews.
 */
export type Review = {
  id: string;
  guestName: string;
  quote: string;
  rating: number;
};

export const reviews: Review[] = [];
