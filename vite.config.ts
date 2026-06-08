import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/proxy": {
        target: "http://161.97.154.119",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy/, ""),
      },
      "/intern-api": {
        target: "http://161.97.154.119",
        changeOrigin: true,
      },
    },
  },
});
