import { useState } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "../data/gallery";
import Lightbox from "./Lightbox";

// Explicit placement (rather than free grid auto-flow) so the editorial
// layout never leaves an accidental gap when an item doesn't fill its row.
const layoutClasses: Record<string, string> = {
  large: "lg:col-start-1 lg:col-span-7 lg:row-start-1 h-[380px] sm:h-[520px]",
  portrait: "lg:col-start-8 lg:col-span-5 lg:row-start-1 h-[380px] sm:h-[520px]",
  small: "lg:col-start-4 lg:col-span-5 lg:row-start-2 h-[380px] sm:h-[420px]",
  full: "lg:col-start-1 lg:col-span-12 lg:row-start-3 h-[340px] sm:h-[480px]",
  split: "lg:col-span-6 h-[380px] sm:h-[420px]",
};

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="container-edit py-28 sm:py-36">
      <span className="label text-stone">05 / 09 — Gallery</span>
      <h2 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
        A closer look at
        <span className="italic font-light"> the residence.</span>
      </h2>

      {/* Mobile: swipeable row */}
      <div className="mt-14 flex sm:hidden gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6">
        {galleryImages.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="shrink-0 w-[82vw] h-[420px] snap-start overflow-hidden"
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Desktop / tablet: editorial grid */}
      <div className="hidden sm:grid mt-14 grid-cols-1 lg:grid-cols-12 gap-6">
        {galleryImages.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden text-left ${layoutClasses[img.layout]}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={galleryImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
