import _ from 'lodash'
import * as THREE from 'three'

class TriangleBuilder {
  constructor(pointArray) {
    this.points = pointArray
    
    // member function
    this.normalize = this.normalize.bind(this)
    this.setWindow = this.setWindow.bind(this)
  }

  setWindow(zLimit) {
    this.points = this.points.map(currPoint => {
      if (Math.abs(currPoint.z) > zLimit)
        return {x: currPoint.x, y: zLimit, z: currPoint.y}
      else
        return {x: currPoint.x, y: currPoint.z, z: currPoint.y}
    })
  }

  normalize() {
    this.points = this.points.filter((point, index) => {
      if (index % 10 == 0) {
        return true
      }
      else {
        return false
      }
    })

    let avg = this.points.reduce((prev, curr) => {
      prev.x += curr.x / this.points.length
      prev.y += curr.y / this.points.length
      prev.z += curr.z / this.points.length
      return prev
    }, {x: 0.0, y: 0.0, z: 0.0})

    let range = this.points.reduce((prev, curr) => {
      if (curr.x > prev.max.x)
        prev.max.x = curr.x
      if (curr.y > prev.max.y)
        prev.max.y = curr.y
      if (curr.z > prev.max.z)
        prev.max.z = curr.z

      if (curr.x < prev.min.x)
        prev.min.x = curr.x
      if (curr.y < prev.min.y)
        prev.min.y = curr.y
      if (curr.z < prev.min.z)
        prev.min.z = curr.z

      return prev
    }, {max: {x: 0.0, y: 0.0, z: 0.0}, min: {x: 100000000.0, y: 100000000.0, z: 100000000.0}})

    range = {max: {x: range.max.x - avg.x, y: range.max.y - avg.y, z: range.max.z - avg.z}, min: {x: range.min.x - avg.x, y: range.min.y - avg.y, z: range.min.z - avg.z}}
    console.log("normalize()", avg, range)

    this.points = this.points.map(point => {
      point.x = (point.x - avg.x)
      point.y = (point.y - avg.y)
      point.z = (point.z - 265.6)

      return point
    })
  }

  build() {
    let plane = new THREE.PlaneGeometry(12000, 10000, 239, 199)

    let vertices = plane.vertices.map(vert => {
      return new THREE.Vector2(vert.x, vert.y)
    })

    let heightMap = this.points.map(point => {
      return new THREE.Vector3(point.x, point.y, point.z)
    })

    let heightPlane = this.points.map(point => {
      return new THREE.Vector2(point.x, point.z)
    })

    let heightVerts = vertices.map(vert => {

      let nearHeight = heightPlane.reduce((prev, point, index) => {
        let dist = vert.distanceTo(point)
        if (dist < prev.minDist)
          return {minDist: dist, index: index}
        else
          return prev
      }, {minDist: 100000.0, index: 0})

      let height = (nearHeight.minDist > 200) ? 20.0 : heightMap[nearHeight.index].y 
      return new THREE.Vector3(vert.x, height, vert.y)
    })

    plane.vertices = heightVerts

    return plane
  }

}

export default TriangleBuilder
