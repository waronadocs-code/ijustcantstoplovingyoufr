import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Space from "../components/Space";
import Experience from "../components/Experience";
import Gallery from "../components/Gallery";
import Location from "../components/Location";
import Stay from "../components/Stay";
import Book from "../components/Book";
import Footer from "../components/Footer";
import BookingWidget from "../components/BookingWidget";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="bg-ivory">
      <Navigation onOpenBooking={() => setBookingOpen(true)} />

      <main>
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <Intro />
        <Space />
        <Experience />
        <Gallery />
        <Location />
        <Stay />
        <Book />
      </main>

      <Footer />

      <div className="fixed bottom-0 inset-x-0 z-30 md:hidden">
        <button
          onClick={() => setBookingOpen(true)}
          className="w-full bg-ink text-ivory py-4 text-[11px] uppercase tracking-widest2 font-medium"
        >
          Check Availability
        </button>
      </div>

      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) setBookingOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-ivory"
            >
              <BookingWidget onClose={() => setBookingOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
