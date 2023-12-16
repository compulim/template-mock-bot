// This is not used today.
// We should see if we can move from ESBuild to tsup.

import { defineConfig } from 'tsup';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nodeResolvePlugin = {
  name: 'browserify',
  setup(build) {
    build.onResolve({ filter: /^(child_process|fs|net|tls)$/ }, args => ({
      path: join(fileURLToPath(import.meta.url), `../esbuild/${args.path}-mock.cjs`)
    }));

    build.onResolve({ filter: /^botframework-connector$/ }, () => ({
      path: join(fileURLToPath(import.meta.url), '../../../node_modules/botframework-connector/src/index.ts')
    }));
  }
};

export default defineConfig({
  bundle: true,
  esbuildOptions(options) {
    options.keepNames = true;
  },
  esbuildPlugins: [nodeResolvePlugin],
  format: 'esm',
  inject: ['./esbuild/global-shim.cjs'],
  minify: false,
  platform: 'browser',
  sourcemap: 'inline',
  target: ['chrome110', 'edge110', 'firefox110', 'safari16']
});
