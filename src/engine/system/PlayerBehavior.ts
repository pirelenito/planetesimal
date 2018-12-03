import System from './System'
import GameObject from '../GameObject'
import { Vector2, Vector3 } from 'three'

const MAX_VELOCITY = 0.01

export default class PlayerBehavior implements System {
  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { input, player, velocity, translation } = gameObject
      if (!(player && player.isPlayer) || !input || !velocity || !translation) return

      const relativePosition = new Vector2(
        input.mousePosition[0] - input.mouseCanvas[0] / 2,
        input.mousePosition[1] - input.mouseCanvas[1] / 2,
      ).normalize()

      const rotation = relativePosition.angle()

      gameObject.translation = { ...translation, rotation }

      const playerForward = new Vector3(1, 0, 0)
        .applyAxisAngle(new Vector3(0, 0, 1), rotation)
        .normalize()
        .multiplyScalar(MAX_VELOCITY)
      gameObject.velocity = { vector: [playerForward.x, playerForward.y] }
    })
  }
}
