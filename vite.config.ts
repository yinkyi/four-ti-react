import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/** https://vitejs.dev/config */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    mode: mode,
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_APP_PORT),
      host: true,
    },
    preview: {
      port: parseInt(env.VITE_APP_PORT),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
                          @import  "./src/App.scss";
                        `,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1250,
      rollupOptions: {
        output: [
          {
            manualChunks: {
              redux: ["@reduxjs/toolkit"],
            },
          },
        ],
      },
    },
  };
});
