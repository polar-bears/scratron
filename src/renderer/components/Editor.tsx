import glamorous from 'glamorous'
import * as React from 'react'

import Base from './Base'

export interface IEditorProps {
  value?: string
}

export interface IEditorState {}

export default class Editor extends Base<IEditorProps, IEditorState> {

  editorEl: HTMLDivElement | null = null

  constructor (props: IEditorProps) {
    super(props)
    this.state = {}
  }

  saveEl = (el: HTMLDivElement | null) => {
    this.editorEl = el
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
