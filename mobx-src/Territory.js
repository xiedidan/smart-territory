import _ from 'lodash'
import * as THREE from 'three'

import TriangleBuilder from './TriangleBuilder'
import Cloud from './Cloud'
import Flow from './Flow'

import territoryData from './data/test-model-1'

class Territory {
  constructor(store, width, height) {
    this.animate = this.animate.bind(this)
    this.render = this.render.bind(this)

    this.store = store
    this.width = width
    this.height = height

    // create rotate quaternion
    this.quaternion = new THREE.Quaternion()
    this.quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0), 
      this.store.state.rotateAngle)

    // create material
    this.phongMaterial = new THREE.MeshLambertMaterial({ 
	  color: 0x7f7f7f,
      emissive: 0x2f2f2f, 
      side: THREE.DoubleSide
	  })

    // create particles
    this.cloud = new Cloud()
    this.flow = new Flow()

    // create terrain
    this.builder = new TriangleBuilder(territoryData)
    this.planeGeo = this.builder.build()
    this.planeGeo.computeVertexNormals()

    this.terrainMesh = new THREE.Mesh(this.planeGeo, this.phongMaterial) 
    // this.boxMesh = new THREE.Mesh(new THREE.BoxGeometry(400, 400, 400), this.phongMaterial)

    // create lights
    this.envLight = new THREE.AmbientLight(0x303030)
    this.light = new THREE.DirectionalLight(0xffffff)
    this.light.position.set(300, 200, 100)
    this.light.lookAt(new THREE.Vector3(0, 0, 0))

    // create clock for animate
    this.clock = new THREE.Clock()

    // create renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    console.log('Territory.js', 'this.width', 'this.height', this.width, this.height)
    this.renderer.setSize(this.width, this.height)
    // this.renderer.setClearColor(0xfffff7)
    this.renderer.setClearColor(0x000000)

    // create camera
    this.aspectRatio = this.width / this.height
    this.camera = new THREE.PerspectiveCamera(75, this.aspectRatio, 1, 5000)
    this.camera.position.set(1200, 800, 1200)

    // create scene
    this.scene = new THREE.Scene()
    this.scene.add(this.envLight)
    this.scene.add(this.light)
    this.scene.add(this.terrainMesh)
    this.scene.add(this.cloud.particleGroup.mesh)
    this.scene.add(this.flow.particleGroup.mesh)
    this.camera.position.set(400, 400, 400)
    this.camera.lookAt(new THREE.Vector3(0, -300, 0))
    // this.scene.fog = new THREE.Fog(0x0f0f0f, 0.1, 5000)

    setTimeout(this.animate, 0) 
  }

  animate() {
    requestAnimationFrame(this.animate)

    let dt = this.clock.getDelta()

    this.store.update(dt)
    this.cloud.update(dt)
    this.flow.update(dt)

    this.render()
  }

  render() {
    // this.light.color = this.store.state.lightColor
    this.light.color.setHex(this.store.lightColor)
    this.quaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0), 
      this.store.state.rotateAngle)
    this.scene.quaternion.set(this.quaternion.x, this.quaternion.y, this.quaternion.z, this.quaternion.w)

    this.renderer.render(this.scene, this.camera)
  }

  get rendererDom() {
    return this.renderer.domElement
  }
}

export default Territory
