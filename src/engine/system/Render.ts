import * as THREE from 'three'
import System from './System'
import GameObject from '../GameObject'

const CAMERA_POSITION = 40

export default class Render implements System {
  scene: THREE.Scene
  renderer: THREE.Renderer
  camera: THREE.Camera

  constructor(canvas: HTMLCanvasElement) {
    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const frustumSize = 40
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      2000,
    )

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    function handleWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      const aspect = width / height

      renderer.setSize(width, height)

      camera.left = (frustumSize * aspect) / -2
      camera.right = (frustumSize * aspect) / 2
      camera.top = frustumSize / 2
      camera.bottom = frustumSize / -2

      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize, false)

    // get the isometric look
    // see: https://stackoverflow.com/a/23451591
    camera.position.set(CAMERA_POSITION, CAMERA_POSITION, CAMERA_POSITION)
    camera.lookAt(scene.position)

    createLights().forEach(light => scene.add(light))

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  }

  update(dt: number, gameObjects: GameObject[]) {
    gameObjects.forEach(gameObject => {
      const { mesh, position, followCamera } = gameObject

      if (!mesh) {
        return
      }

      if (position) {
        mesh.mesh.position.copy(position.vector)
      }

      if (followCamera && followCamera.enabled) {
        this.camera.position.copy(mesh.mesh.position.clone().addScalar(CAMERA_POSITION))
      }

      if (!this.scene.getObjectById(mesh.mesh.id)) {
        this.scene.add(mesh.mesh)
      }
    })

    this.renderer.render(this.scene, this.camera)
  }
}

function createLights() {
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)

  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  return [hemisphereLight, shadowLight, ambientLight]
}
