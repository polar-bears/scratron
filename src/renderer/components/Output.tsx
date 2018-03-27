import glamorous from 'glamorous'
import * as React from 'react'

import Base from './Base'

export interface IOutputProps {
}

export interface IOutputState {}

export default class Output extends Base<IOutputProps, IOutputState> {

  constructor (props: IOutputProps) {
    super(props)
    this.state = {}
  }

  render () {
    const {className, style} = this.props

    return (
      <Wrapper className={className} style={style}>
        output
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div()
