import { Engine, Render, GameObject, Movement, PlayerControl } from '../engine'
import playerVox from './player.vox'
import treeVox from './tree.vox'
import houseVox from './house.vox'

export default async function game(canvas: HTMLCanvasElement) {
  const engine = new Engine()
  engine.addSystem(new PlayerControl())
  engine.addSystem(new Render(canvas))
  engine.addSystem(new Movement())

  const player = new GameObject()
  player.player = { isPlayer: true }
  player.mesh = { voxUrl: playerVox }
  player.position = { vector: [0, 0] }
  player.velocity = { vector: [0.01, 0] }
  player.followCamera = { enabled: true }

  engine.addGameObject(player)

  const tree = new GameObject()
  tree.mesh = { voxUrl: treeVox }
  tree.position = { vector: [30, -1] }

  engine.addGameObject(tree)

  const house = new GameObject()
  house.mesh = { voxUrl: houseVox }
  house.position = { vector: [-30, -1] }

  engine.addGameObject(house)

  engine.start()
}
