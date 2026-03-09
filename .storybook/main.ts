import type { StorybookConfig } from '@storybook/react-vite';

const isBuild = !!process.env.STORYBOOK_BUILD;

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    // addon-vitest causes "preview_XXXXX has already been declared" during build
    ...(isBuild ? [] : ["@storybook/addon-vitest"]),
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    // Remove library-mode build settings and vite-plugin-dts
    // to prevent conflicts during Storybook build
    if (config.build) {
      delete config.build.lib;
      delete config.build.rollupOptions;
    }
    config.plugins = config.plugins?.filter((plugin) => {
      const name = (plugin && typeof plugin === 'object' && 'name' in plugin)
        ? (plugin as { name: string }).name
        : '';
      return !name.includes('dts');
    });
    return config;
  },
};
export default config;