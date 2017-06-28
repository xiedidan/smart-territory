import React from 'react'
import {observer} from 'mobx-react'
import {Affix, Button} from 'antd'

@observer class App extends React.Component {
  render() {
    return <div>
      <Affix offsetButtom={30}>
        <Button type="primary" onClick={this.props.store.toggleLight}>Toggle Light</Button>
        &nbsp;
        <Button type="primary" onClick={this.props.store.toggleRotate}>Toggle Rotate</Button>
      </Affix>
    </div>
  }
}

export default App
