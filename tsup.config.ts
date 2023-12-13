import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options) {
    options.keepNames = true;
  },
  format: 'iife',
  target: 'node18'
});
