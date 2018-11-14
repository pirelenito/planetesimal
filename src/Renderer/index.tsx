import React, { Component, createRef } from 'react'
import setupRenderer from './setupRenderer'

interface RendererProps {}

export default class Renderer extends Component<RendererProps, {}> {
  ref: React.RefObject<HTMLCanvasElement>

  constructor(props: RendererProps) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    if (!this.ref.current) return

    const { renderer, scene, camera } = setupRenderer(this.ref.current)

    const animate = () => {
      renderer.render(scene, camera)

      window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)
  }

  render() {
    return <canvas ref={this.ref} />
  }
}
