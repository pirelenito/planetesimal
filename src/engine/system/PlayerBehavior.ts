import System from './System'
import GameObject from '../GameObject'
import { Vector2 } from 'three'

export default class PlayerBehavior implements System {
  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { input, player, velocity, translation } = gameObject
      if (!(player && player.isPlayer) || !input || !velocity || !translation) return

      const relativeMousePosition = new Vector2(
        input.mousePosition[0] - input.mouseCanvas[0] / 2,
        input.mousePosition[1] - input.mouseCanvas[1] / 2,
      )

      const rotation = relativeMousePosition.angle()

      gameObject.translation = { ...translation, rotation }
    })
  }
}
