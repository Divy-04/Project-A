import { aboutPage } from "./aboutPage";
import { division } from "./division";
import { homePage } from "./homePage";
import { photo } from "./photo";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

/**
 * Three lists and three single documents.
 *
 * `photo` is not a document — it is the image type every photograph field
 * uses, so alt text and the size check are defined once.
 */
export const schemaTypes = [
  project,
  division,
  testimonial,
  homePage,
  aboutPage,
  siteSettings,
  photo,
];

/** Documents that exist exactly once. The structure pins them, the "create
 *  new" menu hides them, and the delete/duplicate actions are removed. */
export const SINGLETONS = ["homePage", "aboutPage", "siteSettings"] as const;
