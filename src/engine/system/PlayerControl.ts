import System from './System'
import GameObject from '../GameObject'

export default class PlayerControl implements System {
  buttonState: {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
  }

  constructor() {
    this.buttonState = { left: false, right: false, up: false, down: false }

    window.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp') this.buttonState.up = true
      if (event.key === 'ArrowDown') this.buttonState.down = true
      if (event.key === 'ArrowLeft') this.buttonState.left = true
      if (event.key === 'ArrowRight') this.buttonState.right = true
    })

    window.addEventListener('keyup', event => {
      if (event.key === 'ArrowUp') this.buttonState.up = false
      if (event.key === 'ArrowDown') this.buttonState.down = false
      if (event.key === 'ArrowLeft') this.buttonState.left = false
      if (event.key === 'ArrowRight') this.buttonState.right = false
    })
  }

  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { player } = gameObject

      if (player && player.isPlayer) {
        gameObject.input = { ...this.buttonState }
      }
    })
  }
}
