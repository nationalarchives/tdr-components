import copy from 'rollup-plugin-copy'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: './out-tsc/src/nationalarchives/components/all.js',
  output: {
    dir: 'public',
  },
  plugins: [
    nodeResolve(),
    copy({
      targets: [
        {
          src: [
            'src/nationalarchives/index.ts',
            'src/nationalarchives/components',
            'src/nationalarchives/*.scss',
          ], dest: 'package'
        }
      ],
      filter: (src, _) => !src.includes("test.ts") && !src.includes(".yaml")
    })
  ]
};
