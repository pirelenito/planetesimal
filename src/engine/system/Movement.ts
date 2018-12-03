import { Vector2 } from 'three'
import System from './System'
import GameObject from '../GameObject'

export default class Movement implements System {
  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObjects => {
      const { position, velocity } = gameObjects
      if (position && velocity) {
        const resultPosition = new Vector2(position.vector[0], position.vector[1]).add(
          new Vector2(velocity.vector[0], velocity.vector[1]).multiplyScalar(dt),
        )

        position.vector = [resultPosition.x, resultPosition.y]
      }
    })
  }
}
