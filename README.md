# MPI Hospitality — 377 Jack Hindon

A single-property booking website (React + TypeScript + Vite + Tailwind CSS + Framer Motion).

The site showcases the room, lets guests pick dates and guest count, and hands off
the actual reservation to Booking.com. No payments are processed on this site.

## Setup

```
npm install
npm run dev
```

Build for production:

```
npm run build
```

## Before going live

1. **Booking.com URL** — edit `src/config/property.ts` and replace
   `bookingUrl` with the real Booking.com listing URL. Until this is set,
   the "Reserve on Booking.com" button will not redirect (a warning is
   logged to the console instead).
2. **Photography** — every image on the site is imported in
   `src/data/gallery.ts`. Replace the files in `src/assets/property/` with
   professional photography and update the imports; nothing else needs to
   change. The current images are stills extracted from property
   walkthrough video and are placeholders.
3. **Contact details** — `src/config/property.ts` has an empty
   `contact` object (email/WhatsApp/Instagram). The footer only renders
   what's filled in.
4. **Amenities** — `src/data/amenities.ts` marks Wi-Fi and Parking as
   unconfirmed (`confirmed: false`) since they weren't visible in the
   supplied media. Flip to `true` once verified.
