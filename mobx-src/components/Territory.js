import React from 'react'
import {observer} from 'mobx-react'
import ReactThree from 'react-three'
import THREE from 'three'

let meshFactory = React.createFactory(ReactThree.Mesh)

@observer class Territory extends React.Component {
  render() {
    const geometry = this.props.geometry
    const material = this.props.material
    const width = this.props.width
    const height = this.props.height

    let aspectRatio = width / height
    let cameraProps = {
      fov: 75,
      aspect: aspectRatio,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, 0, 600),
      lookat: new THREE.Vector3(0, 0, 0)
    }

    return (
      <Renderer width = {widtch} height = {height}>
        <Scene width = {width} height = {height} camera = 'maincamera'>
          <PerspectiveCamera name = "maincamera" {...cameraProps} />
            <Object3D 
              quaternion = {this.props.quaternion} 
              position = {this.props.position || new THREE.Vector3(0,0,0)} >
              { meshFactory({position: new Vector3(0, -100, 0), geometry: geometry, material: material}) }
            </Object3D>
        </Scene>
      </Renderer>
    )
  }
}

export default Territory
