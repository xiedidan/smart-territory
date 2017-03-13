import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import TerritoryStore from './stores/TerritoryStore'
import Territory from './Territory'

const store = new TerritoryStore()
const width = window.innerWidth - 17
const height = window.innerHeight

ReactDom.render(
  <App store={store} />,
  document.getElementById('app_container')
)

const territory = new Territory(store, width, height)
document.getElementById('renderer_container').appendChild(territory.rendererDom)