import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { property } from "../config/property";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDisplayDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase()
    .replace(/,/g, "");
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(`${checkIn}T00:00:00`);
  const b = new Date(`${checkOut}T00:00:00`);
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function buildBookingUrl(checkIn: string, checkOut: string, guests: number): string {
  const base = property.bookingUrl;
  if (!property.appendBookingParams || !base || base === "PASTE_BOOKING_COM_URL_HERE") {
    return base;
  }
  try {
    const url = new URL(base);
    if (checkIn) url.searchParams.set("checkin", checkIn);
    if (checkOut) url.searchParams.set("checkout", checkOut);
    url.searchParams.set("group_adults", String(guests));
    url.searchParams.set("no_rooms", "1");
    return url.toString();
  } catch {
    return base;
  }
}

type Props = {
  variant?: "default" | "compact";
};

export default function BookingWidget({ variant = "default" }: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const min = todayISO();
  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);
  const bookingUnset = !property.bookingUrl || property.bookingUrl === "PASTE_BOOKING_COM_URL_HERE";

  function handleCheckAvailability() {
    setError("");
    if (!checkIn || !checkOut) {
      setError("Please select a check-in and check-out date.");
      return;
    }
    if (checkIn < min) {
      setError("Check-in cannot be in the past.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    if (guests < 1) {
      setError("At least 1 guest is required.");
      return;
    }
    setConfirmed(true);
  }

  function handleReserve() {
    const url = buildBookingUrl(checkIn, checkOut, guests);
    if (!url || url === "PASTE_BOOKING_COM_URL_HERE") return;
    window.location.href = url;
  }

  function editDates() {
    setConfirmed(false);
  }

  const compact = variant === "compact";

  return (
    <div className={compact ? "w-full" : "w-full max-w-xl"}>
      <AnimatePresence mode="wait">
        {!confirmed ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="border border-ink/15 bg-ivory/60"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-ink/15">
              <label className="flex flex-col gap-2 p-5">
                <span className="label text-stone">Check-in</span>
                <input
                  type="date"
                  value={checkIn}
                  min={min}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent font-serif text-lg outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 p-5">
                <span className="label text-stone">Check-out</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || min}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent font-serif text-lg outline-none"
                />
              </label>
              <div className="flex flex-col gap-2 p-5">
                <span className="label text-stone">Guests</span>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease guests"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="w-7 h-7 border border-ink/25 text-sm hover:border-ink transition-colors"
                    >
                      −
                    </button>
                    <button
                      type="button"
                      aria-label="Increase guests"
                      onClick={() => setGuests((g) => Math.min(4, g + 1))}
                      className="w-7 h-7 border border-ink/25 text-sm hover:border-ink transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <p className="px-5 pb-2 text-sm text-stone" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckAvailability}
              className="w-full py-4 bg-ink text-ivory label tracking-[0.22em] hover:bg-ink/85 transition-colors"
            >
              Check Availability
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="border border-ink/15 bg-ivory/60 p-6 sm:p-8"
          >
            <span className="label text-stone">Your Stay</span>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <span className="label text-stone block mb-1">Check-in</span>
                <span className="font-serif text-2xl">{formatDisplayDate(checkIn)}</span>
              </div>
              <div>
                <span className="label text-stone block mb-1">Check-out</span>
                <span className="font-serif text-2xl">{formatDisplayDate(checkOut)}</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-6 label text-stone">
              <span>
                {nights} {nights === 1 ? "Night" : "Nights"}
              </span>
              <span>
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReserve}
              disabled={bookingUnset}
              className="mt-8 w-full py-4 bg-ink text-ivory label tracking-[0.22em] hover:bg-ink/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Reserve on Booking.com →
            </button>
            {bookingUnset && (
              <p className="mt-3 text-sm text-stone">
                Booking.com link not yet configured — add it to src/config/property.ts.
              </p>
            )}
            <p className="mt-4 text-sm text-stone leading-relaxed">
              You'll complete your reservation securely on Booking.com.
            </p>
            <button
              type="button"
              onClick={editDates}
              className="mt-4 label text-stone underline underline-offset-4 hover:text-ink transition-colors"
            >
              Edit dates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
