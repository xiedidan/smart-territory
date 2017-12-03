import React from 'react'
import {observer} from 'mobx-react'

import WrappedLoginForm from './components/Login'
import Workspace from './components/Workspace'
import Dashboard from './components/Dashboard'

@observer class App extends React.Component {
  constructor() {
    super()

    this.render = this.render.bind(this)
  }

  render() {
    let page
    if (this.props.store.appStore.state.user.id == -1) {
      page = <WrappedLoginForm store={this.props.store} />
    }
    else {
      if (this.props.store.appStore.state.user.role == 0) {
        // admin
        page = <Workspace store={this.props.store} />
      }
      else {
        // normal user
        page = <Dashboard store={this.props.store} />
      }
    }

    return <div>{page}</div>
  }
}

export default App
