import React from 'react'
import {observer} from 'mobx-react'

import Cesium from 'cesium/Cesium'
require('cesium/Widgets/widgets.css')

import constants from '../utilities/constants'

@observer class CesiumViewer extends React.Component {
  constructor() {
    super()

    // member function
    

    this.componentDidMount = this.componentDidMount.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
    this.viewer = new Cesium.Viewer('cesiumContainer')
  }

  // helper

  render() {
    return <div id="cesiumContainer" />
  }
}

export default CesiumViewer
