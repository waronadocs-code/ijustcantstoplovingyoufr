import { motion } from "framer-motion";
import { property } from "../config/property";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Location() {
  const query = encodeURIComponent(property.mapsQuery);
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section id="location" className="container-edit py-28 sm:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div {...fadeUp} className="lg:col-span-5">
          <span className="label text-stone">06 / 09 — Location</span>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
            Your base
            <br />
            <span className="italic font-light">in {property.city}.</span>
          </h2>

          <address className="not-italic mt-8 text-lg text-ink/80 font-light leading-relaxed">
            {property.address}
            <br />
            {property.city}
            <br />
            {property.country}
          </address>

          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer noopener"
            className="label mt-8 inline-flex items-center gap-3 w-fit border-b border-ink pb-1 hover:gap-4 transition-all"
          >
            Get Directions <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="lg:col-span-7 relative border border-ink/15"
        >
          <iframe
            title="Map location"
            src={embedSrc}
            className="w-full h-[380px] sm:h-[480px] grayscale-[35%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
