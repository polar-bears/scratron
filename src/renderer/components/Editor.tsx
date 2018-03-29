import glamorous from 'glamorous'
import * as monaco from 'monaco-editor'
import * as React from 'react'

import Base, {IBaseProps} from './Base'

(self as any).MonacoEnvironment = {
  getWorkerUrl: function (moduleId: string, label: string) {
    // if (label === 'json') {
    //  return './json.worker.bundle.js'
    // }

    // if (label === 'css') {
    //  return './css.worker.bundle.js'
    // }

    // if (label === 'html') {
    //  return './html.worker.bundle.js'
    // }

    if (label === 'typescript' || label === 'javascript') {
      return '/static/js/ts.worker.bundle.js'
    }

    return '/static/js/editor.worker.bundle.js'
  }
}

export interface IEditorProps {
  value?: string
  language?: string
  onChange?: (e: monaco.editor.IModelContentChangedEvent, value: string) => void
}

export interface IEditorState {}

export default class Editor extends Base<IEditorProps, IEditorState> {

  editor: monaco.editor.IStandaloneCodeEditor | null = null

  editorElement: HTMLDivElement | null = null

  editorValue: string = ''

  constructor (props: IEditorProps) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    if (this.editorElement) {
      const {value = '', language = 'typescript'} = this.props

      this.initialize(this.editorElement, value, language)
    }
    window.addEventListener('resize', this.resize)
  }

  componentDidUpdate (prevProps: IEditorProps & IBaseProps) {
    if (!this.editor) {
      return
    }

    const {value = '', language = 'typescript', style} = this.props

    if (value !== this.editorValue) {
      this.editorValue = value
      this.editor.setValue(this.editorValue)
    }

    if (language !== prevProps.language) {
      monaco.editor.setModelLanguage(this.editor.getModel(), language)
    }

    if (style && style !== prevProps.style) {
      this.editor.layout()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)

    if (this.editor) {
      this.editor.dispose()
    }
  }

  initialize = (el: HTMLElement, value: string, language: string) => {
    const minimap: monaco.editor.IEditorMinimapOptions = {renderCharacters: false}
    const editor = this.editor = monaco.editor.create(el, {language, value, minimap})
  
    editor.onDidChangeModelContent((e) => {
      this.editorValue = editor.getValue()

      if (this.props.onChange) {
        this.props.onChange(e, this.editorValue)
      }
    })
  }

  resize = () => {
    if (this.editor) {
      this.editor.layout()
    }
  }

  saveEl = (el: HTMLDivElement | null) => {
    this.editorElement = el
  }

  render () {
    const {className, style} = this.props

    return (
      <Wrapper
        innerRef={this.saveEl}
        className={className}
        style={style}
      />
    )
  }
}

const Wrapper = glamorous.div()
