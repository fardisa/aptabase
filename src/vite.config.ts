import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
const pkg = require("./package.json");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(pkg.version),
  },
  publicDir: "webapp/public",
  build: {
    outDir: "wwwroot",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
          chartjs: ["chart.js", "chartjs-plugin-annotation"],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/uploads": {
        target: "http://localhost:5251",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:5251",
        changeOrigin: true,
        secure: false,
      },
      "/webhook": {
        target: "http://localhost:5251",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    conditions: ["development", "browser"],
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./webapp/components"),
      },
      {
        find: "@fns",
        replacement: path.resolve(__dirname, "./webapp/fns"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./webapp/hooks"),
      },
      {
        find: "@features",
        replacement: path.resolve(__dirname, "./webapp/features"),
      },
    ],
  },
});
