import React from 'react'
import {observer} from 'mobx-react'
import ReactThree from 'react-three'
import * as THREE from 'three'

let meshFactory = React.createFactory(ReactThree.Mesh)

@observer class Territory extends React.Component {
  render() {
    const geometry = this.props.geometry
    const material = this.props.material
    const light = this.props.light
    const envLight = this.props.envLight
    const width = this.props.width
    const height = this.props.height

    let raycaster = new THREE.Raycaster()

    let aspectRatio = width / height
    let cameraProps = {
      fov: 75,
      aspect: aspectRatio,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(600, 600, 600),
      lookat: new THREE.Vector3(0, 0, 0)
    }

    return (
      <ReactThree.Renderer width = {width} height = {height}>
        <ReactThree.Scene width = {width} height = {height} camera = 'maincamera'>
          <ReactThree.PerspectiveCamera name = "maincamera" {...cameraProps} />
          {light}
          {envLight}
          <ReactThree.Object3D 
            position = {this.props.position || new THREE.Vector3(0, 0, 0)} >
            { meshFactory({position: new THREE.Vector3(0, 0, 0), geometry: geometry, material: material}) }
          </ReactThree.Object3D>
        </ReactThree.Scene>
      </ReactThree.Renderer>
    )
  }
}

export default Territory
