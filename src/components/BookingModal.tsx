import { motion, AnimatePresence } from "framer-motion";
import BookingWidget from "./BookingWidget";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BookingModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-ivory w-full max-w-xl mt-16 sm:mt-0 p-6 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Reserve your stay"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 label text-stone hover:text-ink transition-colors"
            >
              Close
            </button>
            <span className="label text-stone">Reserve Your Stay</span>
            <h3 className="font-serif text-3xl sm:text-4xl mt-2 mb-8">
              Select your dates.
            </h3>
            <BookingWidget />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
