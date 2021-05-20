// code from https://github.com/pd-smith/next-express-babel
const buildPreset = targets => ['next/babel', { 'preset-env': { targets, modules: 'commonjs' } }]
module.exports = {
  presets: [buildPreset({ node: 'current' })],
  env: {
    client: {
      presets: [buildPreset({ chrome: 89, ie: 11 })]
    }
  }
}
