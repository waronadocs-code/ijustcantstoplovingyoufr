import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "../data/gallery";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const current = open ? images[index] : null;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate(((index as number) - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || index === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) onNavigate((index + 1) % images.length);
      else onNavigate((index - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  }

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between p-5 sm:p-8 text-ivory">
            <span className="label">
              {String(index! + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="label hover:opacity-60 transition-opacity"
            >
              Close ✕
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 pb-6">
            <button
              type="button"
              onClick={() => onNavigate((index! - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="hidden sm:flex absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 text-ivory label hover:opacity-60 transition-opacity"
            >
              ← Prev
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-[75vh] max-w-full object-contain"
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={() => onNavigate((index! + 1) % images.length)}
              aria-label="Next image"
              className="hidden sm:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 text-ivory label hover:opacity-60 transition-opacity"
            >
              Next →
            </button>
          </div>

          <div className="flex sm:hidden items-center justify-center gap-8 pb-8 text-ivory label">
            <button
              type="button"
              onClick={() => onNavigate((index! - 1 + images.length) % images.length)}
            >
              ← Prev
            </button>
            <button type="button" onClick={() => onNavigate((index! + 1) % images.length)}>
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
