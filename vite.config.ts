import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       'index.html': 'src/main.js',
  //       'page1.html': 'src/page1.js',
  //       'page2.html': 'src/page2.js'
  //     }
  //   }
  // }
})
