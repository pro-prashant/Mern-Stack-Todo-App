import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [react()], // Change this for Vue
  root: '.', // Ensures Vite finds index.html in the root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html' // Ensure this points to the correct file
    }
  }
});
