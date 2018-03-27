module.exports = function rewireMonacoEditor(config) {
  config.entry = {
    "main": config.entry.main || config.entry,
    "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js',
    "ts.worker": 'monaco-editor/esm/vs/language/typescript/ts.worker'
    // "json.worker": 'monaco-editor/esm/vs/language/json/json.worker',
    // "css.worker": 'monaco-editor/esm/vs/language/css/css.worker',
    // "html.worker": 'monaco-editor/esm/vs/language/html/html.worker'
  }

  config.output = {
    ...config.output,
    filename: 'static/js/[name].bundle.js'
  }

  return config
}
