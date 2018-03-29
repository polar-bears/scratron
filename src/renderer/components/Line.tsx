import * as React from 'react'
import glamorous from 'glamorous'
import theme from '../theme'

export interface ILineProps {
  lineno?: number
  content?: any[]
  defaultFolded?: boolean
}

export interface ILineState {
  expanded: boolean
}

export default class Line extends React.Component<ILineProps, ILineState> {

  constructor (props: ILineProps) {
    super(props)
    this.state = {
      expanded: !!props.defaultFolded
    }
  }

  onToggle = () => {
    this.setState({expanded: !this.state.expanded})
  }

  render () {
    const {lineno, content = []} = this.props
    const {expanded} = this.state
    
    const formatted = content.map((c) => JSON.stringify(c, null, 2)).join(', ')
    const brief = content.map((c) => JSON.stringify(c)).join(', ')

    return (
      <Wrapper onClick={this.onToggle}>
        <Lineno>{lineno}</Lineno>
        <Brief>{brief}</Brief>
        {expanded && (
          <Content>{formatted}</Content>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = glamorous.div({
  position: 'relative',
  paddingLeft: '64px',
  minHeight: '19px',
  lineHeight: '19px'
})

const Lineno = glamorous.div({
  position: 'absolute',
  left: '0',
  top: '0',
  width: '38px',
  textAlign: 'right'
})

const Brief = glamorous.div({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all'
})

const Content = glamorous.pre({
  position: 'relative',
  width: '100%',
  '::after': {
    position: 'absolute',
    top: '0',
    left: '-8px',
    display: 'block',
    content: '""',
    height: '100%',
    width: '1px',
    background: theme.grayLighter
  }
})
