import { defineConfig } from "cypress";
// @ts-ignore
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin";

// @ts-ignore
const DISPLAY_MODE = process.env.DISPLAY_MODE || 'MOBILE';

export default defineConfig({
  e2e: {
    viewportWidth: DISPLAY_MODE === 'MOBILE' ? 414 : 1024,
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config);
    },
  },
});
