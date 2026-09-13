import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "../data/gallery";

type Props = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  function goPrev() {
    onNavigate((index - 1 + total) % total);
  }
  function goNext() {
    onNavigate((index + 1) % total);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  }

  const current = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-ink/95 flex flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-6 text-ivory">
        <span className="text-[11px] uppercase tracking-widest2 tabular-nums">
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="text-2xl font-display hover:opacity-60 transition-opacity"
        >
          ×
        </button>
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pb-10">
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-6 items-center justify-center w-11 h-11 rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink transition-colors"
        >
          ‹
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            src={current.src}
            alt={current.alt}
            className="max-h-full max-w-full object-contain select-none"
          />
        </AnimatePresence>

        <button
          onClick={goNext}
          aria-label="Next image"
          className="hidden sm:flex absolute right-6 items-center justify-center w-11 h-11 rounded-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink transition-colors"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}
