import { property } from "../config/property";

const PLACEHOLDER = "PASTE_BOOKING_COM_URL_HERE";

export function isBookingUrlConfigured(): boolean {
  return Boolean(property.bookingUrl) && property.bookingUrl !== PLACEHOLDER;
}

export function formatNightDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Appends Booking.com's supported search parameters (checkin, checkout,
 * group_adults, no_rooms) to the configured listing URL where possible.
 * Falls back to the bare configured URL if it can't be parsed as a URL.
 */
export function buildBookingUrl(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
}): string {
  const { checkIn, checkOut, guests } = params;

  if (!isBookingUrlConfigured()) {
    return property.bookingUrl;
  }

  try {
    const url = new URL(property.bookingUrl);
    url.searchParams.set("checkin", checkIn);
    url.searchParams.set("checkout", checkOut);
    url.searchParams.set("group_adults", String(guests));
    url.searchParams.set("no_rooms", "1");
    return url.toString();
  } catch {
    return property.bookingUrl;
  }
}

export function todayIso(): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString().slice(0, 10);
}
