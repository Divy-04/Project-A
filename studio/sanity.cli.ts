import { defineCliConfig } from "sanity/cli";

/**
 * CLI settings: which project the commands talk to, and where `sanity deploy`
 * publishes the Studio. Auto-updates on, so the hosted Studio picks up Sanity
 * releases without anyone redeploying it — the owner is not going to run
 * `npm update`.
 */
export default defineCliConfig({
  api: {
    projectId: "hhvsb0rp",
    dataset: "production",
  },
  studioHost: "aadi-enterprise",
  deployment: {
    // Issued by Sanity on the first deploy; pinned so later deploys do not
    // prompt for it.
    appId: "kss0pejm4qdf60w3nj2f9nyu",
    autoUpdates: true,
  },
});
