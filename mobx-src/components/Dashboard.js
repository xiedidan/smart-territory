import React from 'react'
import {observer} from 'mobx-react'
import _ from 'lodash'
import * as THREE from 'three'
import {Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

import TerritoryStore from '../stores/TerritoryStore'
import Territory from '../Territory'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Dashboard extends React.Component {
  constructor() {
    super()

    // member function
    this.exitClickHandler = this.exitClickHandler.bind(this)
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
    let width = this.rendererContainer.clientWidth
    let height = this.rendererContainer.clientHeight
    console.log(this.rendererContainer, width, height)

    this.territoryStore = new TerritoryStore()
    this.territory = new Territory(this.territoryStore, width, height)

    this.rendererContainer.appendChild(this.territory.rendererDom)
  }

  // helper
  exitClickHandler() {
      // TODO : show evolution modal
  }

  exitClickHandler() {
      this.props.store.nav('exit')
  }

  menuClickHandler(e) {
      this.props.store.toggleLayer(e.key)
  }

  render() {
    return <div>
        <Layout>
            <Header className="Header">
                <div className="Logo" />
                <Button type="primary" onClick={this.evoClickHandler}><Icon type="line-chart" />河床演变</Button>
                <Button type="primary" onClick={this.exitClickHandler}><Icon type="logout" />退出</Button>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu 
                        theme="dark"
                        mode="inline"
                        multiple={true}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={this.menuClickHandler}
                        selectedKeys={this.props.store.state.layers}
                    >
                        <Menu.Item key="marker"><Icon type="environment-o" />航标</Menu.Item>
                        <Menu.Item key="hydrology"><Icon type="line-chart" />水文</Menu.Item>
                        <Menu.Item key="fog"><Icon type="eye-o" />雾情</Menu.Item>
                        <Menu.Item key="meteorology"><Icon type="cloud-o" />气象</Menu.Item>
                        <Menu.Item key="ship"><Icon type="share-alt" />船舶</Menu.Item>                        
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px 24px 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <div style={{minHeight: 280}} ref={(content) => {this.rendererContainer = content}} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  }
}

export default Dashboard
