/**
 * GROQ, in one place. Each projection returns exactly the shape in `types.ts`
 * — with `coalesce(..., [])` on every array so components can map without
 * null checks, and `slug.current` flattened to `slug`.
 */

const IMAGE = /* groq */ `{
  alt,
  hotspot,
  crop,
  "asset": asset->{
    _id,
    url,
    "metadata": metadata{ lqip, dimensions{ width, height, aspectRatio } }
  }
}`;

const DIVISION_REF = /* groq */ `{
  _id,
  title,
  short,
  tone,
  "slug": slug.current
}`;

const PROJECT = /* groq */ `{
  _id,
  title,
  "slug": slug.current,
  location,
  completedOn,
  summary,
  "division": division->${DIVISION_REF},
  "images": coalesce(images[]${IMAGE}, [])
}`;

/** Most recent first — this order drives the gallery and previous/next links. */
export const projectsQuery = /* groq */ `
  *[_type == "project" && defined(slug.current) && defined(division)]
    | order(completedOn desc, _createdAt desc) ${PROJECT}
`;

export const divisionsQuery = /* groq */ `
  *[_type == "division" && defined(slug.current)] | order(order asc, title asc) {
    _id,
    title,
    short,
    tone,
    "slug": slug.current,
    blurb,
    intro,
    "items": coalesce(items, []),
    "finishGroups": coalesce(finishGroups[]{
      label,
      note,
      "swatches": coalesce(swatches[]{ name, "hex": color.hex, ring }, [])
    }, []),
    "specs": coalesce(specs[]{ label, value }, []),
    "faqs": coalesce(faqs[]{ q, a }, []),
    "image": image${IMAGE}
  }
`;

export const testimonialsQuery = /* groq */ `
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id, quote, name, town, work
  }
`;

export const settingsQuery = /* groq */ `
  *[_id == "siteSettings"][0] {
    name,
    owner,
    phone,
    phoneDisplay,
    whatsapp,
    email,
    address{ line1, city, district, state, postalCode },
    hours,
    hoursShort,
    establishedYear,
    projectsCompleted,
    credential,
    "serviceAreas": coalesce(serviceAreas, []),
    mapsUrl
  }
`;

export const homePageQuery = /* groq */ `
  *[_id == "homePage"][0] {
    "heroLead": heroLead${IMAGE},
    "heroSmallLeft": heroSmallLeft${IMAGE},
    "heroSmallRight": heroSmallRight${IMAGE},
    "beforeImage": beforeImage${IMAGE},
    "afterImage": afterImage${IMAGE},
    "areaImage": areaImage${IMAGE},
    "featuredProjects": coalesce(featuredProjects[]->${PROJECT}, [])
  }
`;

export const aboutPageQuery = /* groq */ `
  *[_id == "aboutPage"][0] {
    "ownerPortrait": ownerPortrait${IMAGE},
    "ownerStory": coalesce(ownerStory, []),
    statement,
    "milestones": coalesce(milestones[]{ year, title, body }, []),
    "principles": coalesce(principles[]{ title, body }, [])
  }
`;
