import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { generate } from 'fast-dts'
import pkg from './package.json'

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: resolve(__dirname, pkg.source),
      formats: ['es'],
    },
  },
  plugins: [
    {
      name: 'dts',
      async closeBundle() {
        await generate(pkg.source, pkg.types)
      },
    },
  ],
})
