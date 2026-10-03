import type { MetadataRoute } from "next";

/**
 * Lets a phone save the site to the home screen with the right name and icon.
 * `display: "browser"` on purpose: this is a website people visit, not an app
 * to install, and a standalone window would hide the address bar they share
 * the link from.
 *
 * Icons are the favicon mark rendered to PNG once (public/icons); the
 * maskable one is full-bleed so Android can crop it to any shape.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AADI ENTERPRISE – Himatnagar",
    short_name: "AADI",
    description:
      "Aluminium windows and glass, PVC furniture, modular kitchens and all furniture in Himatnagar.",
    start_url: "/",
    display: "browser",
    background_color: "#faf9f7",
    theme_color: "#faf9f7",
    lang: "en-IN",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
