import * as React from 'react'

export interface IBaseProps {
  className?: string
  style?: React.CSSProperties
}

export default abstract class Base<P, S> extends React.Component<IBaseProps & P, S> {

}
