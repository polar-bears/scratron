import glamorous from 'glamorous'
import * as React from 'react'

import Base from './Base'
import Line from './Line'

export interface ILine {
  line?: number
  content?: any[]
}

export interface IOutputProps {
  value: string | ILine[]
}

export interface IOutputState {}

export default class Output extends Base<IOutputProps, IOutputState> {

  render () {
    const {className, style, value} = this.props

    const lines = typeof value === 'string' ? [{content: [value]}] : value

    return (
      <Wrapper className={className} style={style}>
        {lines.map((line, i) => (
          <Line key={i} lineno={line.line} content={line.content}/>
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div({
  paddingRight: '20px'
})
