import Reveal from "./Reveal";
import { introImage } from "../data/gallery";
import { property } from "../config/property";

export default function Intro() {
  return (
    <section id="residence" className="bg-ivory py-24 sm:py-32 px-6 sm:px-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{property.locationLabel}</p>
              <h2 className="font-display text-[12vw] sm:text-6xl md:text-7xl leading-[0.98] text-ink">
                A private place
                <br />
                to come back to.
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-5 flex flex-col justify-end">
            <Reveal delay={0.15}>
              <p className="text-stone text-base sm:text-lg leading-relaxed max-w-md">
                Designed for guests who value comfort, privacy and effortless
                access to the city, MPI Hospitality offers a considered stay
                at {property.address}.
              </p>
              <a
                href="#space"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#space")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-block mt-8 text-[11px] uppercase tracking-widest2 border-b border-ink pb-1 hover:opacity-60 transition-opacity"
              >
                Discover the Residence →
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2} className="mt-20 sm:mt-28">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={introImage}
              alt="The private room at 377 Jack Hindon"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
