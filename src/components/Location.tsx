import Reveal from "./Reveal";
import { property } from "../config/property";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    property.mapQuery
  )}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    property.mapQuery
  )}`;

  return (
    <section id="location" className="bg-ivory px-6 sm:px-10 py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">Location · 06 / 09</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.98]">
              Your base
              <br />
              in Pretoria.
            </h2>

            <div className="mt-10 space-y-1 text-stone text-base sm:text-lg">
              <p>{property.address}</p>
              <p>{property.city}</p>
              <p>{property.country}</p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-[11px] uppercase tracking-widest2 border-b border-ink pb-1 hover:opacity-60 transition-opacity"
            >
              Get Directions →
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="md:col-span-7">
          <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden grayscale-[15%] contrast-[1.05]">
            <iframe
              title="Map to 377 Jack Hindon Street"
              src={mapSrc}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
