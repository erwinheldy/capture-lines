import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import oxc from 'oxc-transform'
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
        const file = pkg.source
        const text = await readFile(file, 'utf8')
        const code = oxc.isolatedDeclaration(file, text)
        await writeFile(pkg.types, code.sourceText)
      },
    },
  ],
})
