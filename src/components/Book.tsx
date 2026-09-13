import { motion } from "framer-motion";
import BookingWidget from "./BookingWidget";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Book() {
  return (
    <section id="book" className="bg-ivory-dim py-28 sm:py-36">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <span className="label text-stone">08 / 09 — Book</span>
          <h2 className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98]">
            Ready
            <br />
            <span className="italic font-light">to stay?</span>
          </h2>
          <p className="mt-8 text-lg text-ink/70 font-light leading-relaxed max-w-sm">
            Reservations are completed securely through Booking.com. No
            payment is taken on this site.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  );
}
