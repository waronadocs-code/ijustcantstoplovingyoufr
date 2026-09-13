import Reveal from "./Reveal";
import { spaceImages } from "../data/gallery";
import { spaceFacts, confirmedAmenities } from "../data/amenities";

export default function Space() {
  return (
    <section id="space" className="bg-ivory px-6 sm:px-10 py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">The Space · 03 / 09</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink max-w-2xl leading-[0.98]">
            THE SPACE
          </h2>
          <p className="mt-6 text-stone text-base sm:text-lg max-w-lg">
            A beautifully considered private room designed around comfort,
            simplicity and ease.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          <Reveal delay={0.1} className="md:col-span-8">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={spaceImages.main}
                alt="Bed and brick feature wall in the private room"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-4">
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={spaceImages.detail}
                alt="Headboard and bedside detail"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-14 gap-y-8 border-t border-ink/10 pt-12">
          {spaceFacts.map((fact) => (
            <Reveal key={fact.id}>
              <div className="font-display text-4xl sm:text-5xl text-ink">
                {fact.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-widest2 text-stone">
                {fact.label}
              </div>
            </Reveal>
          ))}

          <Reveal className="flex flex-col justify-end gap-2">
            {confirmedAmenities.map((a) => (
              <span
                key={a.id}
                className="text-[11px] uppercase tracking-widest2 text-stone"
              >
                {a.label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
