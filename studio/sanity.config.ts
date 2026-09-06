import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { SINGLETONS, schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

/**
 * The Studio — the editing app for the AADI ENTERPRISE site.
 *
 * Hosted by Sanity at aadi-enterprise.sanity.studio, not embedded in the Next
 * app, so the site's JavaScript bundle does not carry an editor nobody
 * visiting the site will use.
 *
 * Project ID and dataset are fixed here rather than read from env: there is
 * one project and one dataset, and a Studio that could point at the wrong
 * one is a Studio that eventually does.
 */
const singletons = new Set<string>(SINGLETONS);

/** Actions that make sense on a document that exists exactly once. */
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "AADI Enterprise",

  projectId: "hhvsb0rp",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    colorInput(),
    // Vision is a GROQ console for developers. Left out of the hosted build
    // so the owner's Studio has only the tabs he needs.
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],

  schema: {
    types: schemaTypes,
    // Keep the single pages out of the "create new document" menu.
    templates: (templates) =>
      templates.filter((t) => !singletons.has(t.schemaType)),
  },

  document: {
    // No delete, duplicate or unpublish on the single pages — the site
    // fails its build without them, on purpose.
    actions: (actions, context) =>
      singletons.has(context.schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
});
