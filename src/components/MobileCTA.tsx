type Props = {
  onOpenBooking: () => void;
};

export default function MobileCTA({ onOpenBooking }: Props) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-ivory via-ivory/95 to-transparent">
      <button
        type="button"
        onClick={onOpenBooking}
        className="w-full py-4 bg-ink text-ivory label tracking-[0.2em] shadow-lg"
      >
        Check Availability
      </button>
    </div>
  );
}
