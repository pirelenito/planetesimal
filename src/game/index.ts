import * as THREE from 'three'
import { Engine, Render, GameObject, Movement, VoxLoader } from '../engine'
import playerVox from './player.vox'
import treeVox from './tree.vox'

export default async function game(canvas: HTMLCanvasElement) {
  const engine = new Engine()
  engine.addSystem(new VoxLoader())
  engine.addSystem(new Render(canvas))
  engine.addSystem(new Movement())

  const player = new GameObject()
  player.vox = { voxUrl: playerVox }
  player.position = { vector: new THREE.Vector3(0, 0, -1) }
  player.velocity = { vector: new THREE.Vector3(0, 0.0002, 0) }
  player.followCamera = { enabled: true }

  engine.addGameObject(player)

  const tree = new GameObject()
  tree.vox = { voxUrl: treeVox }
  tree.position = { vector: new THREE.Vector3(30, 0, -1) }

  engine.addGameObject(tree)

  engine.start()
}
