import {observable, computed} from 'mobx'
import Mobx from 'mobx'

class TerritoryStore {
  @observable lightSwitch = true

  constructor() {
    this.toggleLight = this.toggleLight.bind(this)
  }

  toggleLight() {
    this.lightSwitch = this.lightSwitch ? false : true
  }

  @computed get lightColor() {
    return (this.lightSwitch ? 0xffffff : 0x000000)
  }
}

export default TerritoryStore
