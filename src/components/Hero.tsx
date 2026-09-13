import { motion } from "framer-motion";
import { heroImage, heroVideo } from "../data/gallery";
import { property } from "../config/property";

type Props = {
  onOpenBooking: () => void;
};

export default function Hero({ onOpenBooking }: Props) {
  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.12, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          className="w-full h-full object-cover motion-reduce:hidden"
        >
          <source src={heroVideo.webm} type="video/webm" />
          <source src={heroVideo.mp4} type="video/mp4" />
        </video>
        <img
          src={heroImage}
          alt="MPI Hospitality — 377 Jack Hindon private room"
          className="hero-zoom hidden w-full h-full object-cover motion-reduce:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 pb-16 sm:pb-20 max-w-[1600px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="eyebrow text-beige mb-5"
        >
          {property.locationLabel} · Pretoria
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="font-display text-ivory leading-[0.95]"
        >
          <span className="block text-[13vw] sm:text-[7vw] md:text-[6vw] tracking-tight">
            MPI Hospitality
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="mt-5 text-ivory/90 text-base sm:text-lg font-light max-w-md"
        >
          {property.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10"
        >
          <button
            onClick={onOpenBooking}
            className="px-10 py-4 bg-ivory text-ink text-[11px] uppercase tracking-widest2 font-medium hover:bg-beige transition-colors duration-300"
          >
            Check Availability
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-6 sm:right-10 z-10 hidden sm:flex items-center gap-3 text-ivory/70"
      >
        <span className="text-[10px] uppercase tracking-widest2">Scroll to Discover</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="block w-px h-8 bg-ivory/50"
        />
      </motion.div>
    </section>
  );
}
