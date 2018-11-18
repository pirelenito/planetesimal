import * as THREE from 'three'
import System from './System'
import GameObject from '../GameObject'

// "work-around" for global issue
// see: https://github.com/daishihmr/vox.js/issues/6#issuecomment-338814860
;(window as any).THREE = THREE
const vox = require('vox.js')

export default class VoxLoader implements System {
  promises: Map<GameObject, Promise<THREE.Mesh>>

  constructor() {
    this.promises = new Map()
  }

  async load(url: string) {
    const parser = new vox.Parser()
    const voxelData = await parser.parse(url)
    const builder = new vox.MeshBuilder(voxelData, { voxelSize: 1 })
    return builder.createMesh()
  }

  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { vox } = gameObject

      if (vox) {
        const promise = this.promises.get(gameObject)

        if (!promise) {
          const meshPromise = this.load(vox.voxUrl)

          meshPromise
            .then((mesh: THREE.Mesh) => {
              gameObject.mesh = { mesh }
            })
            .catch(error => {
              console.log('Failed to load vox', error)
            })

          this.promises.set(gameObject, meshPromise)
        }
      }
    })
  }
}
