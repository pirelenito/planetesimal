import System from './System'
import GameObject from '../GameObject'

export default class Movement implements System {
  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObjects => {
      const { position, velocity } = gameObjects
      if (position && velocity) {
        position.vector.add(velocity.vector.clone().multiplyScalar(dt))
      }
    })
  }
}
