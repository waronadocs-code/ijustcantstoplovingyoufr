import tvCornerClean from "../assets/property/tv-corner-clean.jpg";
import tvCornerAlt from "../assets/property/tv-corner-alt.jpg";
import bedBlinds from "../assets/property/bed-blinds.jpg";
import roomWideMirror from "../assets/property/room-wide-mirror.jpg";
import hallway from "../assets/property/hallway.jpg";
import loungeCornerAlt from "../assets/property/lounge-corner-alt.jpg";
import nightstandDetail from "../assets/property/nightstand-detail.jpg";
import bedHero from "../assets/property/bed-hero.jpg";
import loungeChairsTv from "../assets/property/lounge-chairs-tv.jpg";
import loungeChairRug from "../assets/property/lounge-chair-rug.jpg";
import bedAc from "../assets/property/bed-ac.jpg";
import bedAlt from "../assets/property/bed-alt.jpg";
import kitchenetteAppliances from "../assets/property/kitchenette-appliances.jpg";
import bedCurtain from "../assets/property/bed-curtain.jpg";
import bedNightstand from "../assets/property/bed-nightstand.jpg";
import bathroomSink from "../assets/property/bathroom-sink.jpg";
import kitchenShelf from "../assets/property/kitchen-shelf.jpg";
import kitchenHobClose from "../assets/property/kitchen-hob-close.jpg";
import bathroomShower from "../assets/property/bathroom-shower.jpg";
import heroPosterImage from "../assets/property/hero-poster.jpg";
import heroVideoMp4 from "../assets/video/hero-full.mp4";
import heroVideoWebm from "../assets/video/hero-full.webm";

/**
 * Every image on the site is sourced from this file. Replace the imports
 * above with new photography whenever it becomes available — nothing
 * else in the codebase needs to change.
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  /** editorial layout hint used by the Gallery section */
  span?: "large" | "small" | "portrait" | "full" | "half";
};

/** Poster frame shown before the hero video loads, and for reduced-motion visitors. */
export const heroImage = heroPosterImage;

/** Muted, looping walkthrough clip for the hero background (WebM first, MP4 fallback). */
export const heroVideo = {
  webm: heroVideoWebm,
  mp4: heroVideoMp4,
};

export const introImage = loungeChairsTv;

export const spaceImages = {
  main: bedHero,
  detail: roomWideMirror,
};

export const experienceImages = {
  arrive: hallway,
  morning: kitchenShelf,
  evening: kitchenetteAppliances,
  rest: bedAc,
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: tvCornerClean, alt: "Mounted television in the brick-walled corner", span: "large" },
  { id: "g2", src: bedBlinds, alt: "Made-up bed with navy headboard and window blinds", span: "portrait" },
  { id: "g3", src: nightstandDetail, alt: "Bedside lamp and nightstand detail against the brick wall", span: "small" },
  { id: "g4", src: roomWideMirror, alt: "The room with kitchenette, oval mirror and en-suite doorway", span: "full" },
  { id: "g5", src: loungeCornerAlt, alt: "Lounge chairs and floor lamp in the brick corner", span: "half" },
  { id: "g6", src: bedAlt, alt: "Bed and nightstand, alternate angle", span: "half" },
  { id: "g7", src: bathroomSink, alt: "En-suite bathroom sink and toilet", span: "small" },
  { id: "g8", src: kitchenHobClose, alt: "Gas hob and kettle in the kitchenette", span: "small" },
  { id: "g9", src: bathroomShower, alt: "Tiled shower in the en-suite bathroom", span: "portrait" },
  { id: "g10", src: hallway, alt: "Brick-lined corridor leading to the room", span: "large" },
  { id: "g11", src: loungeChairRug, alt: "Lounge chair on the cowhide rug facing the television", span: "half" },
  { id: "g12", src: bedCurtain, alt: "Bed against the brick wall with curtains and air conditioning", span: "half" },
  { id: "g13", src: tvCornerAlt, alt: "Television and floor lamp in the brick corner, alternate angle", span: "small" },
  { id: "g14", src: bedNightstand, alt: "Bed, nightstand and lamp against the brick wall", span: "portrait" },
];
