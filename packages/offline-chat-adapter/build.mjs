import * as esbuild from 'esbuild';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const nodeResolvePlugin = {
  name: 'node',
  setup(build) {
    build.onResolve({ filter: /^(child_process|fs|net|tls)$/ }, args => ({
      path: join(fileURLToPath(import.meta.url), `../esbuild/${args.path}-mock.js`)
    }));

    build.onResolve({ filter: /^botframework-connector$/ }, () => ({
      path: join(fileURLToPath(import.meta.url), '../../../node_modules/botframework-connector/src/index.ts')
    }));
  }
};

await esbuild.build({
  bundle: true,
  entryPoints: {
    app: './src/index.ts'
  },
  format: 'esm',
  inject: ['./esbuild/global-shim.js'],
  minify: true,
  outfile: './dist/index.mjs',
  plugins: [nodeResolvePlugin],
  sourcemap: 'inline'
});
