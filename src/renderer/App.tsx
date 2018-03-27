import glamorous from 'glamorous'
import * as React from 'react'

import Editor from './components/Editor'
import Output from './components/Output'
import Splitter from './components/Splitter'
import TitleBar from './components/TitleBar'

export interface IAppProps {}

export interface IAppState {
  splitterLeft: number
}

export default class App extends React.Component<IAppProps, IAppState> {

  state: IAppState = {
    splitterLeft: 50
  }

  onSplitterLeftChange = (left: number) => {
    this.setState({splitterLeft: left})
  }

  render () {
    const {splitterLeft: left} = this.state

    return (
      <Wrapper>
        <TitleBar title='Scratron'/>
        <Container>
          <StyledEditor style={{width: left + '%'}}/>
          <StyledSplitter onChange={this.onSplitterLeftChange}/>
          <StyledOutput style={{left: left + '%', width: 100 - left + '%'}}/>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const Container = glamorous.div({
  position: 'relative',
  flex: '1'
})

const StyledEditor = glamorous(Editor)({
  position: 'absolute',
  top: '0',
  left: '0'
})

const StyledSplitter = glamorous(Splitter)({
  position: 'fixed'
})

const StyledOutput = glamorous(Output)({
  position: 'absolute',
  top: '0'
})
