import * as polished from 'polished'

const baseColors = {
  blue: '#339DE7',
  green: '#8CD049',
  red: '#FD5B13',
  yellow: '#FFC41D',
  gray: '#7D7D7D',
  grayLight: '#9D9D9D',
  grayLighter: '#DBDBDB'
}

const generatedColors = {
  blueDark: polished.darken(0.1, baseColors.blue),
  greenDark: polished.darken(0.1, baseColors.green),
  redDark: polished.darken(0.1, baseColors.red),
  yellowDark: polished.darken(0.1, baseColors.yellow)
}

const theme = {
  ...baseColors,
  ...generatedColors,
  fontColor: 'rgba(0, 0, 0, 0.77)',
  fontColorLight: 'rgba(0, 0, 0, 0.5)',
  fontFamily: '"Roboto Mono", Menlo, Consolas, monospace, "Microsoft YaHei"'
}

export default theme
