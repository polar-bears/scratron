import glamorous from 'glamorous'
import * as React from 'react'

import theme from '../theme'
import Base from './Base'

export interface ISplitterProps {
  onChange?: (left: number) => void
}

export interface ISplitterState {
  left?: number
}

export default class Splitter extends Base<ISplitterProps, ISplitterState> {

  dragging: boolean = false

  state: ISplitterState = {
    left: 50
  }

  componentDidMount () {
    document.body.addEventListener('mousemove', this.onMouseMove)
  }

  componentWillUnmount () {
    document.body.addEventListener('mouseup', this.onMouseMove)
  }

  onMouseDown = () => {
    this.dragging = true
  }

  onMouseUp = () => [
    this.dragging = false
  ]

  onMouseMove = (e: MouseEvent) => {
    if (!this.dragging) {
      return
    }

    if (window.getSelection) {
      window.getSelection().removeAllRanges()
    }

    const bodyWidth = document.body.offsetWidth
    const bodyHeight = document.body.offsetHeight
    const xLimit = 10
    const yLimit = 10

    let x = e.clientX

    x = x < xLimit
      ? xLimit
      : x > bodyWidth - xLimit
      ? bodyWidth - xLimit
      : x

    if (
      (e.clientX <= xLimit || e.clientX >= bodyWidth - xLimit) ||
      (e.clientY < yLimit || e.clientY > bodyHeight - yLimit)
    ) {
      return this.onMouseUp()
    }

    const left = (x / bodyWidth) * 100

    this.setState({left})

    if (this.props.onChange) {
      this.props.onChange(left)
    }
  }

  render () {
    const {className, style} = this.props
    const {left} = this.state

    return (
      <Wrapper
        className={className}
        style={{left: left + '%', ...style}}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

const Wrapper = glamorous.div({
  position: 'absolute',
  top: '0',
  left: '50%',
  marginLeft: '-2px',
  padding: '0 2px',
  height: '100%',
  cursor: 'ew-resize',
  '::after': {
    display: 'block',
    content: '""',
    width: '1px',
    height: '100%',
    background: theme.grayLighter
  }
})
