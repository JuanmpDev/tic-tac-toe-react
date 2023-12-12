import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tic-tac-toe-react/', // Asegúrate de que esto coincida con el nombre de tu repositorio
  build: {
    outDir: 'build',
  },
  plugins: [react()],
});

