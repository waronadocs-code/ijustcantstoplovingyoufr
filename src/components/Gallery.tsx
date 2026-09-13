import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import { galleryImages, type GalleryImage } from "../data/gallery";

type Segment =
  | { type: "full"; image: GalleryImage }
  | { type: "grid"; images: GalleryImage[] };

function buildSegments(images: GalleryImage[]): Segment[] {
  const segments: Segment[] = [];
  let buffer: GalleryImage[] = [];

  for (const img of images) {
    if (img.span === "full") {
      if (buffer.length) {
        segments.push({ type: "grid", images: buffer });
        buffer = [];
      }
      segments.push({ type: "full", image: img });
    } else {
      buffer.push(img);
    }
  }
  if (buffer.length) segments.push({ type: "grid", images: buffer });
  return segments;
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const segments = useMemo(() => buildSegments(galleryImages), []);

  return (
    <section id="gallery" className="bg-ivory px-6 sm:px-10 py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto">
        <Reveal className="mb-16">
          <p className="eyebrow mb-4">Gallery · 05 / 09</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink">
            The Gallery
          </h2>
        </Reveal>

        <div className="space-y-6 sm:space-y-8">
          {segments.map((segment, i) =>
            segment.type === "full" ? (
              <Reveal key={`full-${i}`}>
                <Tile
                  image={segment.image}
                  index={galleryImages.indexOf(segment.image)}
                  onOpen={setLightboxIndex}
                  className="aspect-[16/9] sm:aspect-[21/8] w-full"
                />
              </Reveal>
            ) : (
              <div
                key={`grid-${i}`}
                className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 [column-fill:_balance]"
              >
                {segment.images.map((img, j) => (
                  <Reveal
                    key={img.id}
                    delay={(j % 3) * 0.08}
                    className="mb-6 sm:mb-8 break-inside-avoid"
                  >
                    <Tile
                      image={img}
                      index={galleryImages.indexOf(img)}
                      onOpen={setLightboxIndex}
                      className={
                        img.span === "portrait"
                          ? "aspect-[3/4] w-full"
                          : img.span === "small"
                          ? "aspect-[4/5] w-full"
                          : "aspect-[4/3] w-full"
                      }
                    />
                  </Reveal>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Tile({
  image,
  index,
  onOpen,
  className,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
  className: string;
}) {
  return (
    <button
      onClick={() => onOpen(index)}
      className={`group block overflow-hidden w-full text-left ${className}`}
      aria-label={`Open image: ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.05]"
      />
    </button>
  );
}
