import * as THREE from 'three'
import Loader from './Loader'

// "work-around" for global issue
// see: https://github.com/daishihmr/vox.js/issues/6#issuecomment-338814860
import GameObject from '../GameObject'
;(window as any).THREE = THREE
const vox = require('vox.js')

export default class VoxLoader implements Loader<THREE.Mesh> {
  promises: Map<GameObject['id'], Promise<THREE.Mesh>>
  meshes: Map<GameObject['id'], THREE.Mesh>

  constructor() {
    this.promises = new Map()
    this.meshes = new Map()
  }

  load(gameObject: GameObject): void {
    if (!gameObject.mesh) throw new Error('Attempted to load a mesh for a game object without a mesh component.')

    const promise = this.promises.get(gameObject.id)
    if (promise) return

    const parser = new vox.Parser()

    const newPromise = parser.parse(gameObject.mesh.voxUrl).then((voxelData: any) => {
      const builder = new vox.MeshBuilder(voxelData, { voxelSize: 1 })
      const mesh = builder.createMesh()
      this.meshes.set(gameObject.id, mesh)

      return mesh
    })

    this.promises.set(gameObject.id, newPromise)
  }

  get(gameObject: GameObject) {
    const mesh = this.meshes.get(gameObject.id)
    if (!mesh) this.load(gameObject)
    return mesh
  }
}
