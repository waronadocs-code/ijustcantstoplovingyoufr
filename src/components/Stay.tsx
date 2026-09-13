import Reveal from "./Reveal";

const STEPS = [
  { n: "01", title: "Choose your dates", copy: "Select your check-in and check-out dates and how many guests are staying." },
  { n: "02", title: "Check availability", copy: "See your stay summarised — dates, nights and guests — before you continue." },
  { n: "03", title: "Reserve on Booking.com", copy: "Complete your reservation securely on Booking.com in a few clicks." },
];

export default function Stay() {
  return (
    <section id="stay" className="bg-ivory px-6 sm:px-10 py-24 sm:py-32 border-t border-ink/10">
      <div className="max-w-[1600px] mx-auto">
        <Reveal>
          <p className="eyebrow mb-4">Your Stay · 07 / 09</p>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[0.98] max-w-2xl">
            Your stay
            <br />
            starts here.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 mt-20">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.12}>
              <div className="font-display text-3xl text-stone/50 mb-4">{step.n}</div>
              <h3 className="font-display text-2xl text-ink mb-3">{step.title}</h3>
              <p className="text-stone leading-relaxed">{step.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="mt-20 max-w-xl">
          <p className="text-stone text-base sm:text-lg leading-relaxed">
            Select your preferred dates and continue to Booking.com to
            complete your reservation securely.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
