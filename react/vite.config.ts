import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  envDir: '../laravel',
  base: "/react-build/",
  build: {
    outDir: "../laravel/public/react-build",
    sourcemap: true,
  },
}));
