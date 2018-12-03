import { Vector2 } from 'three'
import System from './System'
import GameObject from '../GameObject'

export default class Movement implements System {
  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObjects => {
      const { translation, velocity } = gameObjects
      if (translation && velocity) {
        const resultPosition = new Vector2(translation.position[0], translation.position[1]).add(
          new Vector2(velocity.vector[0], velocity.vector[1]).multiplyScalar(dt),
        )

        translation.position = [resultPosition.x, resultPosition.y]
      }
    })
  }
}
