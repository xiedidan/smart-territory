import {observable, computed} from 'mobx'
import Mobx from 'mobx'

class TerritoryStore {
  @observable lightSwitch = true
  @observable rotateAngle = 0.0
  rotateInterval = null

  constructor() {
    this.toggleLight = this.toggleLight.bind(this)
    this.toggleRotate = this.toggleRotate.bind(this)
  }

  // light
  toggleLight() {
    this.lightSwitch = this.lightSwitch ? false : true
  }

  @computed get lightColor() {
    return (this.lightSwitch ? 0xffffff : 0x000000)
  }

  // rotate
  toggleRotate() {
    if (this.rotateInterval != null) {
      clearInterval(this.rotateInterval)
      this.rotateInterval = null
    }
    else
      this.rotateInterval = setInterval(() => {
        if (this.rotateAngle < 2 * Math.PI)
          this.rotateAngle += Math.PI / 180
        else 
          this.rotateAngle = 0.0
      }, 20)
  }
  
}

export default TerritoryStore
