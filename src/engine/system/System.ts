import GameObject from '../GameObject'

export default interface System {
  update(dt: number, gameObjects: GameObject[]): void
}
