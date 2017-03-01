import React from 'react'
import {observer} from 'mobx-react'
import ReactThree from 'react-three'
import THREE from 'three'

import Territory from './components/Territory'

@observer class App extends React.Component {
  render() {
    const boxGeometry = new THREE.BoxGeometry(200, 200, 200)
    const phongMaterial = new THREE.MeshPhongMaterial({color: '0x2194ce', shininess: 0})

    return <Territory width={800} height={600} geometry={boxGeometry} material={phongMaterial} />
  }
}

export default App
