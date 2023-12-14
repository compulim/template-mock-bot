import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options) {
    options.keepNames = true;
    options.sourcemap = 'inline';
  },
  format: 'iife',
  target: 'node18'
});
