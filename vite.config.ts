import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import { presetIcons } from 'unocss'

const path = require('path')

export default defineConfig({
  base: '',
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetUno({
          dark: 'media',
          safelist: 'i-logos-vue i-logos-svelte'.split(' ')
        }),
        presetIcons({
          cdn: 'https://esm.sh'
        })
      ]
    })
  ],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
