import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Choose your dates", text: "Select your check-in and check-out." },
  { n: "02", title: "Check availability", text: "See your stay confirmed at a glance." },
  { n: "03", title: "Reserve on Booking.com", text: "Complete your reservation securely." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function YourStay() {
  return (
    <section className="container-edit py-28 sm:py-36">
      <span className="label text-stone">07 / 09 — Your Stay</span>
      <motion.h2
        {...fadeUp}
        className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05]"
      >
        Your stay
        <br />
        <span className="italic font-light">starts here.</span>
      </motion.h2>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 border-t border-ink/10 pt-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label text-stone">{step.n}</span>
            <h3 className="mt-4 font-serif text-2xl">{step.title}</h3>
            <p className="mt-2 text-ink/70 font-light leading-relaxed">{step.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.3 }}
        className="mt-14 text-lg text-ink/70 font-light max-w-xl"
      >
        Select your preferred dates and continue to Booking.com to complete
        your reservation securely.
      </motion.p>
    </section>
  );
}
