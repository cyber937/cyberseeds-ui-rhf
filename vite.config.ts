import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "./src/components/index.tsx"),
      name: "CyberseedsUI React-Hool-Form",
      fileName: "cyberseeds-ui-rhf",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        assetFileNames: "style.css",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    dts({
      tsconfigPath: "./tsconfig.json",
      include: [path.resolve(__dirname, "src")],
      exclude: ["vite.config.ts"],
      rollupTypes: true,
      outDir: "dist",
    }),
  ],
});
