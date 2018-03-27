module.exports = function rewireMonacoEditor(config) {
  return Object.assign({}, config, {
    target: 'electron-renderer'
  })
}
