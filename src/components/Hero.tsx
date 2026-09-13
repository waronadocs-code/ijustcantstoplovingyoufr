import { motion } from "framer-motion";
import { property } from "../config/property";
import { heroImage } from "../data/gallery";

type Props = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: Props) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/35" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="label text-ivory/80 mb-6"
        >
          {property.location.toUpperCase()}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="font-serif text-ivory leading-[0.98] text-5xl xs:text-6xl sm:text-7xl md:text-8xl"
        >
          MPI
          <br />
          <span className="italic font-light">Hospitality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-6 text-ivory/90 text-base sm:text-lg font-light"
        >
          {property.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={onOpenBooking}
            className="label px-8 py-4 border border-ivory text-ivory hover:bg-ivory hover:text-ink transition-colors duration-300"
          >
            Check Availability
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-3 z-10"
      >
        <span className="label text-ivory/70">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-ivory/60"
        />
      </motion.div>
    </section>
  );
}
