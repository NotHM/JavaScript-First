import { defineConfig } from 'vite';

/**
 * Vite Library Mode configuration for jsgamelauncher (.jsgame bundle).
 * Bundles Phaser + src/main.js into dist/phaser-demo.js matching package.json "main".
 */
export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
    lib: {
      entry: 'src/main.js',
      formats: ['es'],
      fileName: () => 'phaser-demo.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: '[name][extname]',
      },
    },
  },
});
