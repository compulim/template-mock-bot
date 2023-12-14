import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options) {
    options.keepNames = true;
    options.sourcemap = 'inline';
  },
  format: 'esm',
  target: 'node18'
});
