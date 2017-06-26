import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import AppStore from './stores/AppStore'

const store = new AppStore()

ReactDom.render(<App store={store} />, document.getElementById('app_container'))
