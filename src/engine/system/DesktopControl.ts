import System from './System'
import GameObject from '../GameObject'
import Input from '../component/Input'

export default class PlayerControl implements System {
  inputState: Input

  constructor() {
    this.inputState = { left: false, right: false, up: false, down: false, mousePosition: [0, 0], mouseCanvas: [0, 0] }

    window.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp') this.inputState.up = true
      if (event.key === 'ArrowDown') this.inputState.down = true
      if (event.key === 'ArrowLeft') this.inputState.left = true
      if (event.key === 'ArrowRight') this.inputState.right = true
    })

    window.addEventListener('keyup', event => {
      if (event.key === 'ArrowUp') this.inputState.up = false
      if (event.key === 'ArrowDown') this.inputState.down = false
      if (event.key === 'ArrowLeft') this.inputState.left = false
      if (event.key === 'ArrowRight') this.inputState.right = false
    })

    window.addEventListener('mousemove', event => {
      this.inputState.mousePosition = [event.x, event.y]
      this.inputState.mouseCanvas = [window.innerWidth, window.innerHeight]
    })
  }

  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { player } = gameObject

      if (player && player.isPlayer) {
        gameObject.input = { ...this.inputState }
      }
    })
  }
}
