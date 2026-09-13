// ============================================================================
// GALLERY
// Every image on the site is referenced from here. Drop a new file into
// public/images/property/ and update the `src` below to replace a photo —
// nothing else needs to change.
//
// `layout` drives the editorial gallery grid (see components/Gallery.tsx):
// "large" | "small" | "portrait" | "full" | "split"
// ============================================================================

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  layout: "large" | "small" | "portrait" | "full" | "split";
};

export const galleryImages: GalleryImage[] = [
  {
    id: "tv-wall",
    src: "/images/property/tv-wall.jpg",
    alt: "Exposed brick feature wall with mounted television, MPI Hospitality",
    layout: "large",
  },
  {
    id: "kitchen",
    src: "/images/property/kitchen.jpg",
    alt: "Kitchenette with gas hob, kettle and cabinetry",
    layout: "small",
  },
  {
    id: "tv-lamp-detail",
    src: "/images/property/tv-lamp-detail.jpg",
    alt: "Tripod floor lamp against the brick wall, evening light",
    layout: "portrait",
  },
  {
    id: "lounge-corner",
    src: "/images/property/lounge-corner.jpg",
    alt: "Upholstered lounge chairs and round table beneath the brick wall",
    layout: "full",
  },
];

// Used for the hero and section backgrounds outside the gallery grid.
export const heroImage: GalleryImage = {
  id: "hero",
  src: "/images/property/tv-wall.jpg",
  alt: "MPI Hospitality, 377 Jack Hindon — the room's exposed brick wall",
  layout: "full",
};

export const spaceImage: GalleryImage = {
  id: "space",
  src: "/images/property/lounge-corner.jpg",
  alt: "The room's private lounge corner",
  layout: "full",
};

export const kitchenImage: GalleryImage = {
  id: "kitchen-wide",
  src: "/images/property/kitchen.jpg",
  alt: "Kitchenette detail",
  layout: "full",
};
