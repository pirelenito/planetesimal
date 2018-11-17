import * as THREE from 'three'
import { Engine, Render, GameObject, Movement } from '../engine'
import playerVox from './player.vox'

// "work-around" for global issue
// see: https://github.com/daishihmr/vox.js/issues/6#issuecomment-338814860
;(window as any).THREE = THREE
const vox = require('vox.js')

export default async function game(canvas: HTMLCanvasElement) {
  const engine = new Engine()
  engine.addSystem(new Render(canvas))
  engine.addSystem(new Movement())

  const parser = new vox.Parser()
  const voxelData = await parser.parse(playerVox)
  const builder = new vox.MeshBuilder(voxelData, { voxelSize: 1 })
  const playerMesh = builder.createMesh()

  const player = new GameObject()
  player.mesh = { mesh: playerMesh }
  player.position = { vector: new THREE.Vector3(0, 0, -1) }
  player.velocity = { vector: new THREE.Vector3(0, 0.0002, 0) }
  player.followCamera = { enabled: true }

  engine.addGameObject(player)

  const enemyGeometry = new THREE.BoxGeometry(1, 1, 1)
  const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const enemyMesh = new THREE.Mesh(enemyGeometry, enemyMaterial)

  const enemy = new GameObject()
  enemy.mesh = { mesh: enemyMesh }
  enemy.position = { vector: new THREE.Vector3(3, 0, -1) }
  enemy.velocity = { vector: new THREE.Vector3(0.0001, 0, 0) }

  engine.addGameObject(enemy)

  engine.start()
}
