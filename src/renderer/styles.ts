import {css} from 'glamor'

import theme from './theme'

css.insert(`
html, body, #root {
  height: 100%;
}

body {
  margin: 0;
  font-size: 12px;
  font-family: ${theme.fontFamily};
  color: ${theme.fontColor};
}

div, form, input, button, select, textarea, table, tr, td, th, ul, ol, li {
  box-sizing: border-box;
}

input, textarea, button, select {
  outline: none;
}

ul {
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  color: inherit;
}
`)
