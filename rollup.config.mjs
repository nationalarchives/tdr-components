import copy from 'rollup-plugin-copy'

export default {
  input: './out-tsc/src/nationalarchives/components/all.js',
  output: {
    dir: 'public',
  },
  plugins: [
    copy({
      targets: [
        {
          src: [
            './out-tsc/src/nationalarchives/components/all.js',
            'src/nationalarchives/components',
            'src/nationalarchives/*.scss',
          ], dest: 'package/nationalarchives'
        }
      ],
      filter: (src, _) => !src.includes("test.ts") && !src.includes(".yaml")
    })
  ]
};
