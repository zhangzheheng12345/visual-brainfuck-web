import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import "path"

export default defineConfig({
  base: "/visual-brainfuck-web/",
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
})