import { createElement } from "react";
import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: "light", value: "#F7F9F2" },
        dark: { name: "dark", value: "#333" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "dark";
      const html = document.documentElement;
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      return createElement(Story);
    },
  ],
  initialGlobals: {
    backgrounds: { value: "light" },
  },
};

export default preview;
