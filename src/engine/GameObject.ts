import Mesh from './component/Mesh'
import Position from './component/Position'
import Velocity from './component/Velocity'
import FollowCamera from './component/FollowCamera'
import Player from './component/Player'
import Input from './component/Input'
import id from './id'

export default class GameObject {
  id: number
  mesh: Mesh | undefined
  position: Position | undefined
  velocity: Velocity | undefined
  followCamera: FollowCamera | undefined
  player: Player | undefined
  input: Input | undefined

  constructor() {
    this.id = id()
  }
}
