import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { UserIcon } from "@sanity/icons/User";
import type { StructureResolver } from "sanity/structure";

/**
 * What the editor sees in the left-hand pane.
 *
 * The three lists come first because that is where the day-to-day work is —
 * a new project is the thing that gets added most. The three single pages
 * sit below a divider and open straight into their one document; there is
 * no list to click through and no "create" button to create a second one.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("division").title("Divisions"),
      S.documentTypeListItem("testimonial").title("Testimonials"),

      S.divider(),

      S.listItem()
        .title("Home page")
        .id("homePage")
        .icon(HomeIcon)
        .child(
          S.document().schemaType("homePage").documentId("homePage").title("Home page"),
        ),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .icon(UserIcon)
        .child(
          S.document().schemaType("aboutPage").documentId("aboutPage").title("About page"),
        ),
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
    ]);
