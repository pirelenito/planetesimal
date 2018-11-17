import System from './system/System'
import GameObject from './GameObject'

export default class Engine {
  systems: System[]
  gameObjects: GameObject[]

  constructor() {
    this.systems = []
    this.gameObjects = []
  }

  addSystem(system: System) {
    this.systems.push(system)
  }

  addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject)
  }

  update(dt: number) {
    this.systems.forEach(system => system.update(dt, this.gameObjects))
  }

  start() {
    let previousFrame = Date.now()

    const calculateDtAndUpdate = () => {
      const dt = Date.now() - previousFrame
      previousFrame = Date.now()

      this.update(dt)

      window.requestAnimationFrame(calculateDtAndUpdate)
    }

    calculateDtAndUpdate()
  }
}
