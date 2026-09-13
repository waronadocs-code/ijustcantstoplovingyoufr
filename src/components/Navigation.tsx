import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { property } from "../config/property";

const LINKS = [
  { href: "#residence", label: "The Residence" },
  { href: "#space", label: "The Space" },
  { href: "#experience", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleLinkClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  const dark = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          dark
            ? "bg-ivory/95 backdrop-blur-sm border-b border-ink/10 text-ink"
            : "bg-transparent text-ivory"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 sm:px-10 py-5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-sm sm:text-base tracking-[0.2em] uppercase"
          >
            <span className="hidden sm:inline">{property.brandName}</span>
            <span className="sm:hidden">{property.brandShort}</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-[11px] uppercase tracking-widest2 hover:opacity-60 transition-opacity"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenBooking}
              className={`text-[11px] uppercase tracking-widest2 border px-5 py-2.5 transition-colors duration-300 ${
                dark
                  ? "border-ink hover:bg-ink hover:text-ivory"
                  : "border-ivory hover:bg-ivory hover:text-ink"
              }`}
            >
              Book
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-[11px] uppercase tracking-widest2"
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-ivory flex flex-col items-center justify-center gap-8"
          >
            {LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                onClick={() => handleLinkClick(link.href)}
                className="font-display text-3xl text-ink"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * LINKS.length, duration: 0.5 }}
              onClick={() => {
                setMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-4 text-[11px] uppercase tracking-widest2 border border-ink px-8 py-3"
            >
              Check Availability
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
