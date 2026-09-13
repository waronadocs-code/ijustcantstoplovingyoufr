import { useState } from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Space from "../components/Space";
import Experience from "../components/Experience";
import Gallery from "../components/Gallery";
import Location from "../components/Location";
import YourStay from "../components/YourStay";
import Book from "../components/Book";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import MobileCTA from "../components/MobileCTA";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navigation onOpenBooking={() => setBookingOpen(true)} />
      <main>
        <Hero onOpenBooking={() => setBookingOpen(true)} />
        <Intro />
        <Space />
        <Experience />
        <Gallery />
        <Location />
        <YourStay />
        <Book />
      </main>
      <Footer />
      <MobileCTA onOpenBooking={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  );
}
