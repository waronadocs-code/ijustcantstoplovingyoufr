import Reveal from "./Reveal";
import BookingWidget from "./BookingWidget";

export default function Book() {
  return (
    <section id="book" className="bg-ink text-ivory px-6 sm:px-10 py-24 sm:py-32">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <p className="eyebrow text-beige-dark mb-6">Book · 08 / 09</p>
          <h2 className="font-display text-[14vw] sm:text-7xl md:text-8xl leading-[0.9]">
            Ready
            <br />
            to stay?
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-16 sm:mt-20">
          <div className="relative border border-ivory/20">
            <BookingWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
