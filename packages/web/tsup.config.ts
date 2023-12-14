import { defineConfig } from 'tsup';

export default defineConfig({
  esbuildOptions(options) {
    options.keepNames = true;
    options.sourcemap = 'inline';
  },
  format: 'esm',
  sourcemap: 'inline',
  target: ['chrome110', 'edge110', 'firefox110', 'safari16']
});
