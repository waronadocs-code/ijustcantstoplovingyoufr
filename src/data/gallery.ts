import livingBrickWide from "../assets/property/living-brick-wide.jpg";
import loungeCorner from "../assets/property/lounge-corner.jpg";
import tvBrickWall from "../assets/property/tv-brick-wall.jpg";
import mirrorReflection from "../assets/property/mirror-reflection.jpg";
import kitchenHob from "../assets/property/kitchen-hob.jpg";
import kitchenetteBrick from "../assets/property/kitchenette-brick.jpg";
import kitchenCounter from "../assets/property/kitchen-counter.jpg";
import entranceWardrobe from "../assets/property/entrance-wardrobe.jpg";
import entranceCorridor01 from "../assets/property/entrance-corridor-01.jpg";
import entranceCorridor02 from "../assets/property/entrance-corridor-02.jpg";
import heroPosterImage from "../assets/property/hero-poster.jpg";
import heroLoopVideoMp4 from "../assets/video/hero-loop.mp4";
import heroLoopVideoWebm from "../assets/video/hero-loop.webm";

/**
 * Every image on the site is sourced from this file. Replace the imports
 * above with professional photography whenever it becomes available —
 * nothing else in the codebase needs to change.
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

/** Muted, looping ambient clip for the hero background (WebM first, MP4 fallback). */
export const heroVideo = {
  webm: heroLoopVideoWebm,
  mp4: heroLoopVideoMp4,
};

export const introImage = livingBrickWide;

export const spaceImages = {
  main: tvBrickWall,
  detail: mirrorReflection,
};

export const experienceImages = {
  arrive: entranceCorridor01,
  morning: kitchenHob,
  evening: kitchenetteBrick,
  rest: loungeCorner,
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: livingBrickWide, alt: "Wide view of the private room, brick feature wall and lounge chairs", span: "large" },
  { id: "g2", src: entranceWardrobe, alt: "Entrance corridor with wardrobe and oval mirror", span: "small" },
  { id: "g3", src: mirrorReflection, alt: "Oval mirror reflecting the brick-walled room", span: "portrait" },
  { id: "g4", src: tvBrickWall, alt: "Mounted television set into the exposed brick wall", span: "full" },
  { id: "g5", src: loungeCorner, alt: "Lounge corner with round table, floor lamp and brick wall", span: "half" },
  { id: "g6", src: kitchenetteBrick, alt: "Kitchenette corner against the exposed brick wall", span: "half" },
  { id: "g7", src: kitchenHob, alt: "Gas hob and kettle in the private kitchenette", span: "small" },
  { id: "g8", src: entranceCorridor01, alt: "Brick-lined entrance corridor leading into the residence", span: "large" },
  { id: "g9", src: entranceCorridor02, alt: "Looking through the corridor into the residence", span: "portrait" },
  { id: "g10", src: kitchenCounter, alt: "Kitchenette counter with sink and kettle", span: "small" },
];
