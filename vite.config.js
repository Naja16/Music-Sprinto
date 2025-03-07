import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "*/api/itunes": {
        target: "https://itunes.apple.com/search?term=top&media=music&limit=10",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/itunes/, ""),
        secure: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
});
