import './styles.ts'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

declare const module: any

const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept(() => {
    const NextApp = require('./App').default
    render(NextApp)
  })
}
