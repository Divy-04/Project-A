import { Button } from "@/components/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { ArrowIcon } from "@/components/icons";
import { getHomePage } from "@/sanity/loaders";

/**
 * The owner's picks from the gallery, in the order he set them — or the six
 * most recent projects until he has picked any. Either way these are the same
 * project documents the gallery shows; nothing is uploaded twice.
 */
export async function FeaturedWork() {
  const { featuredProjects } = await getHomePage();
  if (featuredProjects.length === 0) return null;

  return (
    <section className="border-t border-line bg-surface py-20 lg:py-28">
      <div className="shell">
        <SectionHead
          label="Recent work"
          title="Finished jobs, around Sabarkantha."
          intro="Every project gets its own page with photographs, location and a short note on what was involved."
          align="between"
          action={
            <Button href="/gallery" variant="outline">
              View all work
              <ArrowIcon className="h-4 w-4" />
            </Button>
          }
        />

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
