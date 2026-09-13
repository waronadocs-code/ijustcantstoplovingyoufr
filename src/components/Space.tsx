import { motion } from "framer-motion";
import { confirmedAmenities } from "../data/amenities";
import { spaceImage } from "../data/gallery";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Space() {
  return (
    <section id="space" className="container-edit py-28 sm:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 overflow-hidden"
        >
          <img
            src={spaceImage.src}
            alt={spaceImage.alt}
            className="w-full h-[420px] sm:h-[560px] object-cover"
          />
        </motion.div>

        <div className="lg:col-span-5">
          <span className="label text-stone">03 / 09 — The Space</span>
          <motion.h2
            {...fadeUp}
            className="mt-6 font-serif text-4xl sm:text-5xl leading-[1.05]"
          >
            A room, considered
            <br />
            <span className="italic font-light">down to the details.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 text-lg text-ink/80 font-light leading-relaxed"
          >
            A beautifully considered private room designed around comfort,
            simplicity and ease — exposed brick, warm lighting and quiet
            materials throughout.
          </motion.p>

          <motion.dl
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 border-t border-ink/10 pt-8"
          >
            {confirmedAmenities.map((a) => (
              <div key={a.key}>
                <dt className="font-serif text-2xl sm:text-3xl">{a.value}</dt>
                <dd className="label text-stone mt-1">{a.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
