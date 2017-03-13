import _ from 'lodash'
import * as THREE from 'three'
import * as SPE from './utilities/SPE.min'

class Flow {
  constructor() {
    this.particleGroup = new SPE.Group({
      texture: { value: THREE.ImageUtils.loadTexture('./images/smokeparticle.png') }
    })

    this.emitter = new SPE.Emitter({
      particleCount: 5000,
      // type: Math.random() * 4 | 0,
      maxAge: 50,
      /*
      position: {
        value: new THREE.Vector3(0, 20, 0),
        spread: new THREE.Vector3(1800, 1500, 50)
      },
      */
      position: {
        value: new THREE.Vector3(0, 5, -250),
        spread: new THREE.Vector3(1200, 1, 950)
      },
      velocity: { value: new THREE.Vector3(0, 0, 200) },
      /*
      velocity: { value: new THREE.Vector3(
        this.getRandomNumber(50),
        this.getRandomNumber(50),
        this.getRandomNumber(50)
      )},
      */
      acceleration:{ value: new THREE.Vector3(
          this.getRandomNumber(-2),
          this.getRandomNumber(-2),
          this.getRandomNumber(-2)
      )},
      /*
      rotation: {
        axis: new THREE.Vector3(
          this.getRandomNumber(1),
          this.getRandomNumber(1),
          this.getRandomNumber(1)
        ),
        angle: Math.random() * Math.PI,
        center: new THREE.Vector3(
          this.getRandomNumber(100),
          this.getRandomNumber(100),
          this.getRandomNumber(100)
      )},
      */
      wiggle: { value: 5 },
      size: { value: [0, 15, 0] },
      // drag: { value: Math.random() * 10 },
      opacity: { value: [0, 1, 0] },
      color: {
        value: new THREE.Color(0, 1, 0.5),
        spread: new THREE.Color(0, 0.1, 0.05)
      }
    })

    this.particleGroup.addEmitter(this.emitter)
  }

  update(dt) {
    this.particleGroup.tick(dt)
  }

  getRandomNumber( base ) {
    return Math.random() * base - (base/2)
  }

  getRandomColor() {
    let c = new THREE.Color()
    c.setRGB(Math.random(), Math.random(), Math.random())
    return c
  }

}

export default Flow
