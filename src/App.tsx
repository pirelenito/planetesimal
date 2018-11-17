import React, { Component, createRef } from 'react'
import game from './game'

interface AppProps {}

class App extends Component<AppProps, {}> {
  ref: React.RefObject<HTMLCanvasElement>

  constructor(props: AppProps) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    if (this.ref.current) game(this.ref.current)
  }

  render() {
    return <canvas ref={this.ref} />
  }
}

export default App
