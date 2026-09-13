import { motion } from "framer-motion";
import { galleryImages } from "../data/gallery";

const moments = [
  {
    label: "Morning",
    text: "Kettle on. Quiet light through the curtain.",
    image: galleryImages.find((g) => g.id === "kitchen"),
  },
  {
    label: "Evening",
    text: "Lamplight against brick. The city exhales.",
    image: galleryImages.find((g) => g.id === "tv-lamp-detail"),
  },
  {
    label: "Rest",
    text: "A room built for stillness.",
    image: galleryImages.find((g) => g.id === "lounge-corner"),
  },
  {
    label: "City",
    text: "Pretoria, close enough to reach — far enough to unwind.",
    image: null,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Experience() {
  return (
    <section id="experience" className="bg-ink text-ivory py-28 sm:py-36">
      <div className="container-edit">
        <span className="label text-ivory/60">04 / 09 — The Experience</span>
        <motion.h2
          {...fadeUp}
          className="mt-6 font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl leading-[0.98]"
        >
          Arrive. Unwind.
          <br />
          <span className="italic font-light">Stay a while.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10">
          {moments.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-ink relative h-[380px] overflow-hidden group"
            >
              {m.image ? (
                <img
                  src={m.image.src}
                  alt={m.image.alt}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-stone/40 via-ink to-ink" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="label text-ivory/60 mb-2">{m.label}</span>
                <p className="font-serif text-xl italic font-light leading-snug">
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
