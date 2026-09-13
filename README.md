# MPI Hospitality — 377 Jack Hindon

A premium, single-property accommodation website. React + TypeScript + Vite +
Tailwind CSS v4 + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

## Before going live

1. **Booking.com link** — paste the property's listing URL into
   `src/config/property.ts` (`bookingUrl`). Everything else (date pickers,
   guest count, redirect, URL params) is already wired up.
2. **Photos** — every image on the site is referenced from
   `src/data/gallery.ts`. Drop new files into `public/images/property/` and
   update the paths there; nothing else needs to change. The current photos
   are frame grabs from a property walkthrough video — replace with
   professional photography when available.
3. **Amenities** — `src/data/amenities.ts` only renders items marked
   `confirmed: true`. Flip Wi-Fi / parking to `true` once verified.
4. **Contact details** — `src/config/property.ts` (`contact`). Leave blank to
   hide a channel in the footer.

## Structure

```
src/
  components/   Navigation, Hero, Intro, Space, Experience, Gallery,
                Lightbox, Location, YourStay, Book, BookingWidget,
                BookingModal, Footer, MobileCTA
  config/       property.ts  — brand, address, Booking.com URL
  data/         gallery.ts, amenities.ts, reviews.ts
  pages/        Home.tsx
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run lint` — oxlint
