import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import "path"

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    open: true,
    hmr: {
      port: 443,
    }
  }
})