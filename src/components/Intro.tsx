import { motion } from "framer-motion";
import { property } from "../config/property";
import { reviews } from "../data/reviews";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Intro() {
  return (
    <section id="residence" className="container-edit py-28 sm:py-36">
      <span className="label text-stone">02 / 09 — The Residence</span>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.h2
          {...fadeUp}
          className="lg:col-span-7 font-serif text-4xl xs:text-5xl sm:text-6xl md:text-7xl leading-[1.02]"
        >
          {property.location.toUpperCase()}.
          <br />A private place
          <br />
          <span className="italic font-light">to come back to.</span>
        </motion.h2>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <p className="text-lg sm:text-xl leading-relaxed text-ink/80 font-light">
            Designed for guests who value comfort, privacy and effortless
            access to the city, {property.brand} offers a considered stay in
            the heart of {property.city}.
          </p>

          {reviews.length > 0 && (
            <blockquote className="border-l border-ink/20 pl-5 text-stone italic font-serif text-lg">
              “{reviews[0].quote}”
              <footer className="mt-2 label not-italic text-stone">
                {reviews[0].attribution}
              </footer>
            </blockquote>
          )}

          <a
            href="#space"
            className="label inline-flex items-center gap-3 w-fit border-b border-ink pb-1 hover:gap-4 transition-all"
          >
            Discover the Residence <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
