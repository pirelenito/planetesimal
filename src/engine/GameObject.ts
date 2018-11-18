import Mesh from './component/Mesh'
import Position from './component/Position'
import Velocity from './component/Velocity'
import FollowCamera from './component/FollowCamera'
import Vox from './component/Vox'
import Player from './component/Player'
import Input from './component/Input'

export default class GameObject {
  mesh: Mesh | undefined
  position: Position | undefined
  velocity: Velocity | undefined
  followCamera: FollowCamera | undefined
  vox: Vox | undefined
  player: Player | undefined
  input: Input | undefined
}
