import Reveal from "./Reveal";
import { experienceImages } from "../data/gallery";

const MOMENTS = [
  {
    id: "morning",
    label: "Morning",
    copy: "Light through the curtains. Coffee within reach.",
    image: experienceImages.morning,
  },
  {
    id: "evening",
    label: "Evening",
    copy: "The city slows. The room holds its quiet.",
    image: experienceImages.evening,
  },
  {
    id: "rest",
    label: "Rest",
    copy: "A room made for staying a little longer.",
    image: experienceImages.rest,
  },
  {
    id: "city",
    label: "City",
    copy: "Close enough to everything. Private from all of it.",
    image: experienceImages.arrive,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-ink text-ivory px-6 sm:px-10 py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <p className="eyebrow text-beige-dark mb-8">The Experience · 04 / 09</p>
          <h2 className="font-display text-[11vw] sm:text-6xl md:text-8xl leading-[0.95] max-w-4xl">
            Arrive. Unwind.
            <br />
            Stay a while.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10 mt-20">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.1} className="bg-ink">
              <div className="group relative aspect-[3/4] overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.label} at MPI Hospitality`}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-[11px] uppercase tracking-widest2 text-beige-dark mb-2">
                    {m.label}
                  </p>
                  <p className="font-display text-lg leading-snug max-w-[20ch]">
                    {m.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
