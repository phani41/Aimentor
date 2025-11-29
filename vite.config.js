import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "public/manifest.json", dest: "." },
        { src: "contentScript.js", dest: "." },
        { src: "public/icon.png", dest: "." },
          { src: "public/config.js", dest: "." }, 
       
      ],
    }),
  ],
  build: {
    outDir: "dist",
  },
});
