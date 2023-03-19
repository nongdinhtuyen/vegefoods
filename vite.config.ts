// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import vitePluginRequire from 'vite-plugin-require';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ['**/*.{tsx,ts,jsx,js}'],
    }),
    eslint(),
    tsconfigPaths(),
    vitePluginRequire.default({ fileRegex: /(config.js)$/ }),
    commonjs()
  ],
  server: {
    port: 3000,
  },
});
