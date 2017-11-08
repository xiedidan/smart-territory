import _ from 'lodash'
import * as THREE from 'three'

class GeometryShader {
  constructor(geo) {
    this.geometry = geo
    
    this.yLimits = this.geometry.vertices.reduce((prev, curr) => {
      let data = {max: 0.0, min: 0.0}

      if (curr.y > prev.max)
        data.max = curr.y
      else
        data.max = prev.max

      if (curr.y < prev.min)
        data.min = curr.y
      else
        data.min = prev.min

      return data
    }, {max: -1000.0, min: 1000.0})

    this.yHalfRange = (Math.abs(this.yLimits.max) > Math.abs(this.yLimits.min)) ? Math.abs(this.yLimits.max) : Math.abs(this.yLimits.min)
    this.yRange = this.yHalfRange * 2.0

    console.log('yRange', this.yRange, 'yHalfRange', this.yHalfRange, 'yMax', this.yLimits.max, 'yMin', this.yLimits.min)
  }

  shade() {
    this.geometry.colors = []

    this.geometry.vertices.map(curr => {
      let colorScale = (curr.y + this.yHalfRange) / (this.yRange)
      this.geometry.colors.push(new THREE.Color(colorScale, colorScale, colorScale))
    })

    this.geometry.colorNeedUpdate = true

    return this.geometry
  }
}

export default GeometryShader

