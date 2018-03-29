import {ipcRenderer} from 'electron'
import glamorous from 'glamorous'
import * as React from 'react'

import theme from '../theme'

export interface ITitleBarProps {
  title?: string
}

export interface ITitleBarState {}

export default class TitleBar extends React.Component<ITitleBarProps, ITitleBarState> {

  onClose = () => {
    ipcRenderer.send('close')
  }

  onMinimize = () => {
    ipcRenderer.send('minimize')
  }

  onMaximize = () => {
    ipcRenderer.send('maximize')
  }

  render () {
    const {title} = this.props

    if (process.platform === 'darwin') {
      return (
        <Wrapper style={{'WebkitAppRegion': 'drag'}}>
          <Actions style={{'WebkitAppRegion': 'no-drag'}}>
            <Action onClick={this.onClose}>
              <CircleCloseIcon/>
            </Action>
            <Action onClick={this.onMinimize}>
              <CircleMinimizeIcon/>
            </Action>
            <Action onClick={this.onMaximize}>
              <CircleMaximizeIcon/>
            </Action>
          </Actions>
          <Title>{title}</Title>
        </Wrapper>
      )
    }

    return (
      <Wrapper style={{'WebkitAppRegion': 'drag'}}>
        <Title>{title}</Title>
        <Actions style={{'WebkitAppRegion': 'no-drag'}}>
          <Action onClick={this.onMinimize}>
            <MinimizeIcon/>
          </Action>
          <Action onClick={this.onMaximize}>
            <MaximizeIcon/>
          </Action>
          <Action onClick={this.onClose}>
            <CloseIcon/>
          </Action>
        </Actions>
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div({
  paddingRight: '12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '32',
  width: '100%',
  userSelect: 'none'
})

const Title = glamorous.h1({
  marginLeft: '12px',
  flex: '1',
  fontSize: '14px',
  fontWeight: 'normal',
  color: theme.fontColorLight
})

const Actions = glamorous.div({
  marginLeft: '12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '56px'
})

const Icon = glamorous.svg<{colors: {hover: string, active: string}}>({
  height: '12px',
  width: '12px',
  stroke: theme.grayLight,
  strokeWidth: '1px',
  fill: 'transparent',
  transition: 'stroke 0.3s'
}, (props) => ({
  ':hover': {
    stroke: props.colors.hover
  },
  ':active': {
    stroke: props.colors.active
  }
}))

const CircleCloseIcon = () => (
  <Icon colors={{hover: theme.red, active: theme.redDark}}>
    <circle cx={6} cy={6} r={4}/>
  </Icon>
)

const CircleMinimizeIcon = () => (
  <Icon colors={{hover: theme.yellow, active: theme.yellowDark}}>
    <circle cx={6} cy={6} r={4}/>
  </Icon>
)

const CircleMaximizeIcon = () => (
  <Icon colors={{hover: theme.green, active: theme.greenDark}}>
    <circle cx={6} cy={6} r={4}/>
  </Icon>
)

const CloseIcon = () => (
  <Icon colors={{hover: theme.red, active: theme.redDark}}>
    <line x1={2} y1={2} x2={10} y2={10}/>
    <line x1={2} y1={10} x2={10} y2={2}/>
  </Icon>
)

const MinimizeIcon = () => (
  <Icon colors={{hover: theme.yellow, active: theme.yellowDark}}>
    <line x1={2} y1={8} x2={10} y2={8}/>
  </Icon>
)

const MaximizeIcon = () => (
  <Icon colors={{hover: theme.green, active: theme.greenDark}}>
    <rect x={2} y={2} height={8} width={8}/>
  </Icon>
)

const Action = glamorous.div({
  cursor: 'pointer',
})
