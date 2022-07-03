import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: '0.0.0.0',
    open: true,
    hmr: {
      port: 443,
    }
  }
})