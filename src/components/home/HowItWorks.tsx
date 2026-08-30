import { SectionHead } from "@/components/SectionHead";
import { ScrollRig } from "@/components/ScrollRig";
import {
  SceneDeliver,
  SceneFabricate,
  SceneFit,
  SceneMeasure,
} from "./scenes";

const steps = [
  {
    kicker: "Site survey",
    title: "We measure, at your site",
    note: "Kitchen run · survey",
    body: "We come out, measure the run ourselves and check the wall, the level and the fall. Nothing is taken over the phone, and there is no charge for the visit.",
    Scene: SceneMeasure,
  },
  {
    kicker: "Fabrication",
    title: "We fabricate, on our own bench",
    note: "Carcass · door · top",
    body: "Cut, mitred and built up part by part in our workshop from the measurements we took — not bought in ready-made and forced to fit.",
    Scene: SceneFabricate,
  },
  {
    kicker: "In transit",
    title: "We deliver, with our own team",
    note: "Wrapped · en route",
    body: "Wrapped and brought to your site when the work is ready. Nothing is handed to a transporter or a subcontractor along the way.",
    Scene: SceneDeliver,
  },
  {
    kicker: "Installation",
    title: "We fit, and we finish",
    note: "Seated · sealed · done",
    body: "Seated, levelled, sealed and cleaned up, to the same dimensions we surveyed. If something needs easing later, we come back and ease it.",
    Scene: SceneFit,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-0 bg-ground">
      <div className="shell py-20 lg:py-28">
        <SectionHead
          label="How it works"
          title="Measured, made, delivered and fitted by us."
          intro="Four stages, one team, one unit — surveyed on your wall, built on our bench, and seated back into the same opening it was drawn from."
        />
      </div>

      {/* The pinned scene fills the viewport; the spacers below it supply the
          scroll distance the rig reads. Everything is in the base CSS, so
          hydration changes no geometry and the section contributes no CLS. */}
      <div data-hiw-track className="relative">
        <div className="hiw-pin bg-ground">
          <div className="hiw-strip h-full">
            {steps.map(({ kicker, title, note, body, Scene }, i) => {
              const n = String(i + 1).padStart(2, "0");

              return (
                <div key={title} data-hiw-panel className="hiw-panel h-full">
                  <div className="shell flex h-full items-center pt-14 pb-16 lg:pt-20 lg:pb-24">
                    <div className="grid w-full items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
                      {/* The drawing is decorative — everything it says is in
                          the copy beside it — so the whole card is hidden from
                          assistive tech, title block included. */}
                      <div className="order-1 lg:order-2" aria-hidden="true">
                        <div className="mx-auto w-full max-w-[288px] overflow-hidden rounded-lg border border-line bg-surface sm:max-w-[400px] lg:mr-0 lg:ml-auto lg:max-w-[560px]">
                          <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2 sm:px-4 sm:py-2.5">
                            <span className="eyebrow truncate text-ink-3">
                              {note}
                            </span>
                            <span className="eyebrow shrink-0 text-brand">
                              {n} / 04
                            </span>
                          </div>
                          <svg
                            viewBox="0 0 600 460"
                            className="block h-auto w-full"
                          >
                            <Scene />
                          </svg>
                        </div>
                      </div>

                      <div className="order-2 max-w-xl lg:order-1">
                        <p className="eyebrow text-brand-ink">
                          Step {n} · {kicker}
                        </p>
                        <h3 className="mt-4 text-[1.625rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance sm:text-[2.125rem] lg:text-[3rem]">
                          {title}
                        </h3>
                        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base lg:text-[1.0625rem]">
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-0 pb-6 lg:pb-8">
            <div className="shell">
              <div className="h-0.5 w-full overflow-hidden bg-line">
                <div className="hiw-progress-bar h-full w-full bg-brand" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll distance per step. Longer than it looks like it needs to be,
            deliberately: each scene has to be readable at scroll speed without
            the reader having to go back up to catch what happened. */}
        <div className="hiw-spacers" aria-hidden="true">
          {steps.map((step) => (
            <div key={step.title} data-hiw-step className="h-[125svh]" />
          ))}
        </div>
      </div>

      <ScrollRig targetId="how-it-works" />
    </section>
  );
}
