import {observable, computed} from 'mobx'
import Mobx from 'mobx'

import constants from '../utilities/constants'

class AppStore {
  @observable state = {
    user: {id: -1},
    position: 'project',
    layers: []
  }

  constructor() {
    this.login = this.login.bind(this)
    this.nav = this.nav.bind(this)
    this.toggleLayer = this.toggleLayer.bind(this)
  }

  login(user, pass) {
      // TODO : login
      this.state.user = {id: 1, name: user, role: -1}
      if (user == 'admin') {
          this.state.user.role = 0
          this.state.position = 'project'
      }
      else {
          this.state.user.role = 1
      }
  }

  nav(position) {
      switch(position) {
          case 'exit':
          this.state.user = {id: -1}
          break

          default:
          this.state.position = position
      }
  }

  toggleLayer(name) {

  }

}

export default AppStore
