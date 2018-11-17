import React, { Component, createRef } from 'react'
import * as THREE from 'three'
import { Engine, Render, GameObject, Movement } from './engine'

interface AppProps {}

class App extends Component<AppProps, {}> {
  ref: React.RefObject<HTMLCanvasElement>

  constructor(props: AppProps) {
    super(props)
    this.ref = createRef()
  }

  componentDidMount() {
    if (!this.ref.current) return

    const engine = new Engine()
    engine.addSystem(new Render(this.ref.current))
    engine.addSystem(new Movement())

    const playerGeometry = new THREE.BoxGeometry(1, 1, 1)
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial)

    const player = new GameObject()
    player.mesh = { mesh: playerMesh }
    player.position = { vector: new THREE.Vector3(0, 0, -1) }
    player.velocity = { vector: new THREE.Vector3(0, 0.02, 0) }
    player.followCamera = { enabled: true }

    engine.addGameObject(player)

    const enemyGeometry = new THREE.BoxGeometry(1, 1, 1)
    const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const enemyMesh = new THREE.Mesh(enemyGeometry, enemyMaterial)

    const enemy = new GameObject()
    enemy.mesh = { mesh: enemyMesh }
    enemy.position = { vector: new THREE.Vector3(3, 0, -1) }
    enemy.velocity = { vector: new THREE.Vector3(0.01, 0, 0) }

    engine.addGameObject(enemy)

    engine.start()
  }

  render() {
    return <canvas ref={this.ref} />
  }
}

export default App
