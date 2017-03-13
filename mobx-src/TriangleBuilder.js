import _ from 'lodash'
import * as THREE from 'three'

class TriangleBuilder {
  constructor(pointArray) {
    this.points = pointArray.map(currPoint => {
      if (Math.abs(currPoint.z) > 20)
        return {x: currPoint.x, y: 20, z: currPoint.y}
      else
        return {x: currPoint.x, y: currPoint.z, z: currPoint.y}
    })
  }

  build() {
    let plane = new THREE.PlaneGeometry(1200, 1000, 239, 199)

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
