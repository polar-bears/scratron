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

    return (
      <Wrapper style={{'WebkitAppRegion': 'drag'}}>
        <Actions style={{'WebkitAppRegion': 'no-drag'}}>
          <Action colors={{hover: theme.red, active: theme.redDark}} onClick={this.onClose}/>
          <Action colors={{hover: theme.yellow, active: theme.yellowDark}} onClick={this.onMinimize}/>
          <Action colors={{hover: theme.green, active: theme.greenDark}} onClick={this.onMaximize}/>
        </Actions>
        <Title>{title}</Title>
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '32',
  width: '100%',
  userSelect: 'none'
})

const Title = glamorous.h1({
  flex: '1',
  fontSize: '14px',
  fontWeight: 'normal',
  color: theme.fontColorLight
})

const Actions = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 12px',
  width: '80px'
})

const Action = glamorous.div<{colors: {hover: string, active: string}}>({
  width: '12px',
  height: '12px',
  borderRadius: '12px',
  background: theme.grayLight,
  cursor: 'pointer',
  transition: 'background 0.3s'
}, (props) => ({
  ':hover': {
    background: props.colors.hover
  },
  ':active': {
    background: props.colors.active
  }
}))
