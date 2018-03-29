import glamorous from 'glamorous'
import * as React from 'react'
import * as electron from 'electron'

import Editor from './components/Editor'
import Output from './components/Output'
import Splitter from './components/Splitter'
import TitleBar from './components/TitleBar'
import debounce from './libs/debounce'
import * as ts from 'typescript'

const compilerOptions = {module: ts.ModuleKind.CommonJS}

export interface IAppProps {}

export interface IAppState {
  splitterLeft: number
  code: string
  output: string
}

export default class App extends React.Component<IAppProps, IAppState> {

  state: IAppState = {
    splitterLeft: 50,
    code: '',
    output: ''
  }

  sandbox = electron.remote.getCurrentWebContents()

  execute = debounce((code: string) => {
    code = code
      .split(/\n/g)
      .map((line, index) => line.replace(/console.log\(([^)]*)\)/g, `__$__(${index + 1}, $1)`))
      .join('\n')

    code = ts.transpileModule(code, {compilerOptions}).outputText

    this.sandbox.executeJavaScript(`
    try {
      let __r__ = []
      function __$__ (line, ...content) {__r__.push({line, content})}
      eval(\`(function (__$__) {${code}})(__$__)\`)
        __r__
      } catch (error) {
        error.stack
      }
    `).then((output) => {
      this.setState({output})
    })
  }, 500)

  onSplitterLeftChange = (splitterLeft: number) => {
    this.setState({splitterLeft})
  }

  onCodeChange = (e: any, code: string) => {
    this.setState({code})
    this.execute(code)
  }

  render () {
    const {splitterLeft: left, code, output} = this.state

    return (
      <Wrapper>
        <TitleBar title='Scratron'/>
        <Container>
          <StyledEditor style={{width: left + '%'}} value={code} onChange={this.onCodeChange}/>
          <StyledSplitter onChange={this.onSplitterLeftChange}/>
          <StyledOutput style={{left: left + '%', width: 100 - left + '%'}} value={output}/>
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
  flex: '1',
  overflow: 'hidden'
})

const StyledEditor = glamorous(Editor)({
  position: 'absolute',
  top: '0',
  left: '0',
  height: '100%'
})

const StyledSplitter = glamorous(Splitter)({
  position: 'fixed'
})

const StyledOutput = glamorous(Output)({
  position: 'absolute',
  top: '0'
})
