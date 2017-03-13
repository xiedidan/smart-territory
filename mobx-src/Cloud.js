import _ from 'lodash'
import * as THREE from 'three'
import * as SPE from './utilities/SPE.min'

class Cloud {
  constructor() {
    this.particleGroup = new SPE.Group({
      texture: { value: THREE.ImageUtils.loadTexture('./images/cloud.png') },
      blending: THREE.NormalBlending,
      fog: true
    })

    this.emitter = new SPE.Emitter({
      particleCount: 20,
      maxAge: { value: 50 },
      position: {
        value: new THREE.Vector3(0, 200, 0),
        spread: new THREE.Vector3(1800, 50, 1500)
      },
      velocity: { value: new THREE.Vector3(0, 0, 30) },
      wiggle: { spread: 10 },
      size: {
        value: 500,
        spread: 250
      },
      opacity: { value: [0, 1, 0] },
      color: {
        value: new THREE.Color(1, 1, 1),
        spread: new THREE.Color(0.1, 0.1, 0.1)
      },
      angle: { value: [0, Math.PI * 0.125] }
    })

    this.particleGroup.addEmitter(this.emitter)
  }

  update(dt) {
    this.particleGroup.tick(dt)
  }
}

export default Cloud
