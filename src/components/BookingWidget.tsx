import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { property } from "../config/property";
import {
  buildBookingUrl,
  formatNightDate,
  isBookingUrlConfigured,
  nightsBetween,
  todayIso,
} from "../utils/booking";

type Props = {
  /** Renders inside a fullscreen overlay with a close control. */
  onClose?: () => void;
  className?: string;
};

export default function BookingWidget({ onClose, className = "" }: Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => todayIso(), []);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return nightsBetween(checkIn, checkOut);
  }, [checkIn, checkOut]);

  function handleCheckIn(value: string) {
    setCheckIn(value);
    setConfirmed(false);
    setError(null);
    if (checkOut && value >= checkOut) {
      setCheckOut("");
    }
  }

  function handleCheckOut(value: string) {
    setCheckOut(value);
    setConfirmed(false);
    setError(null);
  }

  function adjustGuests(delta: number) {
    setGuests((g) => Math.min(property.maxGuests, Math.max(1, g + delta)));
    setConfirmed(false);
  }

  function handleCheckAvailability() {
    if (!checkIn || !checkOut) {
      setError("Select your check-in and check-out dates.");
      return;
    }
    if (checkIn < today) {
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
    setError(null);
    setConfirmed(true);
  }

  function handleReserve() {
    const url = buildBookingUrl({ checkIn, checkOut, guests });
    if (!isBookingUrlConfigured()) {
      // eslint-disable-next-line no-console
      console.warn(
        "MPI Hospitality: set property.bookingUrl in src/config/property.ts before going live."
      );
      return;
    }
    window.location.href = url;
  }

  const isModal = Boolean(onClose);

  return (
    <div
      className={`w-full ${
        isModal
          ? "bg-ivory p-8 sm:p-12 md:p-16"
          : "bg-ink text-ivory p-8 sm:p-12 md:p-16"
      } ${className}`}
    >
      {isModal && (
        <button
          onClick={onClose}
          aria-label="Close booking panel"
          className="absolute right-6 top-6 text-2xl font-display text-ink hover:opacity-60 transition-opacity"
        >
          ×
        </button>
      )}

      <p
        className={`eyebrow mb-6 ${
          isModal ? "text-stone" : "text-beige-dark"
        }`}
      >
        Check Availability
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
        <Field label="Check-in" light={!isModal}>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => handleCheckIn(e.target.value)}
            className={inputClass(isModal)}
            aria-label="Check-in date"
          />
        </Field>
        <Field label="Check-out" light={!isModal}>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => handleCheckOut(e.target.value)}
            disabled={!checkIn}
            className={inputClass(isModal)}
            aria-label="Check-out date"
          />
        </Field>
        <Field label="Guests" light={!isModal}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => adjustGuests(-1)}
              aria-label="Decrease guests"
              className={stepperClass(isModal)}
            >
              −
            </button>
            <span className="font-display text-lg tabular-nums">
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </span>
            <button
              type="button"
              onClick={() => adjustGuests(1)}
              aria-label="Increase guests"
              className={stepperClass(isModal)}
            >
              +
            </button>
          </div>
        </Field>
      </div>

      {error && (
        <p className={`mt-4 text-sm ${isModal ? "text-ink" : "text-beige-dark"}`}>
          {error}
        </p>
      )}

      <div className="mt-8">
        <button
          onClick={handleCheckAvailability}
          className={`w-full sm:w-auto px-10 py-4 text-[11px] uppercase tracking-widest2 font-medium transition-colors duration-300 ${
            isModal
              ? "bg-ink text-ivory hover:bg-stone"
              : "bg-ivory text-ink hover:bg-beige"
          }`}
        >
          Check Availability
        </button>
      </div>

      <AnimatePresence>
        {confirmed && checkIn && checkOut && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div
              className={`mt-10 pt-10 border-t ${
                isModal ? "border-ink/20" : "border-ivory/20"
              }`}
            >
              <p className={`eyebrow mb-4 ${isModal ? "text-stone" : "text-beige-dark"}`}>
                Your Stay
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-4 font-display text-2xl sm:text-3xl">
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 font-body opacity-60 mb-1">
                    Check-in
                  </div>
                  {formatNightDate(checkIn)}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 font-body opacity-60 mb-1">
                    Check-out
                  </div>
                  {formatNightDate(checkOut)}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 font-body opacity-60 mb-1">
                    Nights
                  </div>
                  {nights}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest2 font-body opacity-60 mb-1">
                    Guests
                  </div>
                  {guests}
                </div>
              </div>

              <button
                onClick={handleReserve}
                className={`mt-10 w-full sm:w-auto px-10 py-4 text-[11px] uppercase tracking-widest2 font-medium transition-colors duration-300 ${
                  isModal
                    ? "bg-ink text-ivory hover:bg-stone"
                    : "bg-ivory text-ink hover:bg-beige"
                }`}
              >
                Reserve on Booking.com →
              </button>
              <p
                className={`mt-4 text-xs ${
                  isModal ? "text-stone" : "text-beige-dark"
                }`}
              >
                You&rsquo;ll complete your reservation securely on Booking.com.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  children,
  light,
}: {
  label: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <label className="block">
      <span
        className={`block text-[11px] uppercase tracking-widest2 mb-2 ${
          light ? "text-beige-dark" : "text-stone"
        }`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

function inputClass(isModal: boolean) {
  return `w-full bg-transparent border-b py-2 font-display text-lg focus:outline-none transition-colors ${
    isModal
      ? "border-ink/20 text-ink focus:border-ink"
      : "border-ivory/30 text-ivory focus:border-ivory [color-scheme:dark]"
  }`;
}

function stepperClass(isModal: boolean) {
  return `w-8 h-8 flex items-center justify-center border rounded-full text-lg transition-colors ${
    isModal
      ? "border-ink/20 text-ink hover:bg-ink hover:text-ivory"
      : "border-ivory/30 text-ivory hover:bg-ivory hover:text-ink"
  }`;
}
