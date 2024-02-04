import { defineConfig } from "vite"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import react from "@vitejs/plugin-react"
import pluginRewriteAll from "vite-plugin-rewrite-all"
// import visualizer from "rollup-plugin-visualizer"
import path from "node:path"

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: { "@": _resolve("./src") },
  },

  css: {
    postcss: { plugins: [tailwindcss, autoprefixer] },
  },
})
