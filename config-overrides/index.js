const rewire = require('react-app-rewired')
const rewireTypescript = require('react-app-rewire-typescript')
const rewireElectronTarget = require('./rewireElectronTarget')
const rewireMonacoEditor = require('./rewireMonacoEditor')

module.exports = {
  webpack: (config, env) => {
    const rewires = rewire.compose(
      rewireMonacoEditor,
      rewireElectronTarget,
      rewireTypescript
    )

    return rewires(config, env)
  }
}
