import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { property } from "../config/property";

const LINKS = [
  { href: "#residence", label: "The Residence" },
  { href: "#space", label: "The Space" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#book", label: "Book" },
];

type Props = {
  onOpenBooking: () => void;
};

export default function Navigation({ onOpenBooking }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          dark
            ? "bg-ivory/90 backdrop-blur-sm border-b border-ink/10 text-ink"
            : "bg-transparent text-ivory border-b border-transparent"
        }`}
      >
        <nav className="container-edit flex items-center justify-between h-20">
          <a href="#top" className="font-serif tracking-[0.15em] text-sm sm:text-base">
            {property.brand.toUpperCase()}
          </a>

          <ul className="hidden lg:flex items-center gap-9 label">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:opacity-60 transition-opacity">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={onOpenBooking}
              className={`label px-6 py-3 border transition-colors ${
                dark
                  ? "border-ink text-ink hover:bg-ink hover:text-ivory"
                  : "border-ivory text-ivory hover:bg-ivory hover:text-ink"
              }`}
            >
              Check Availability
            </button>
          </div>

          <button
            type="button"
            className="lg:hidden label flex items-center gap-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-30 bg-ivory flex flex-col justify-center"
          >
            <ul className="container-edit flex flex-col gap-6">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-4xl xs:text-5xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * LINKS.length }}
                className="pt-6"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="label px-7 py-4 border border-ink"
                >
                  Check Availability
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
