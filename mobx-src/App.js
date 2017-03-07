import React from 'react'
import {observer} from 'mobx-react'
import ReactThree from 'react-three'
import * as THREE from 'three'
import {Button} from 'antd'

import Territory from './components/Territory'
import TerritoryStore from './stores/TerritoryStore'

const store = new TerritoryStore()

@observer class App extends React.Component {
  render() {
    const boxGeometry = new THREE.BoxGeometry(200, 200, 200)
    const phongMaterial = new THREE.MeshPhongMaterial({color: 0x2194ce})
    const light = React.createElement(ReactThree.DirectionalLight, {color: store.lightColor, position: new THREE.Vector3(3,2,1)})
    const envLight = React.createElement(ReactThree.AmbientLight, {color: 0x303030})

    return <div>
        <div>
          <Territory width={800} height={600} light={light} envLight={envLight} geometry={boxGeometry} material={phongMaterial} />
        </div>
        <div>
          <Button type="primary" onClick={store.toggleLight}>Toggle Light</Button>
        </div>
    </div>
  }
}

export default App
