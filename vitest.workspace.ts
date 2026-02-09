import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineWorkspace } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
  {
    extends: "vite.config.ts",
    test: {
      name: "unit",
      environment: "jsdom",
      setupFiles: ["./src/test-setup.ts"],
      globals: true,
      css: true,
      include: ["src/**/*.test.{ts,tsx}"],
      exclude: ["node_modules", "dist", "storybook-static"],
    },
  },
  {
    extends: "vite.config.ts",
    plugins: [
      storybookTest({ configDir: path.join(dirname, ".storybook") }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        instances: [{ browser: "chromium" }],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
]);
