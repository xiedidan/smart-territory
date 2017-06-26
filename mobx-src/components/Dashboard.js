import _ from 'lodash'
import * as THREE from 'three'
import {Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

import TerritoryStore from './stores/TerritoryStore'
import Territory from './Territory'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Dashboard extends React.Component {
  constructor() {
    // member function
    this.exitClickHandler = this.exitClickHandler.bind(this)
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.render = this.render.bind(this)
  }

  // lifecycle
  componentDidMount() {
    let width = this.refs.renderer_container.clientWidth
    let height = this.refs.renderer_container.clientHeight

    this.territoryStore = new TerritoryStore()
    this.territory = new Territory(this.territoryStore, width, height)

    this.refs.renderer_container.appendChild(this.territory.rendererDom)
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
                        mode="inline"
                        multiple={true}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={this.menuClickHandler}
                        selectedKeys={this.props.store.state.layers}
                    >
                        <Menu.Item key="marker" title={<span><Icon type="environment-o" />航标</span>}></Menu.Item>
                        <Menu.Item key="hydrology" title={<span><Icon type="line-chart" />水文</span>}></Menu.Item>
                        <Menu.Item key="fog" title={<span><Icon type="eye-o" />雾情</span>}></Menu.Item>
                        <Menu.Item key="meteorology" title={<span><Icon type="cloud-o" />气象</span>}></Menu.Item>
                        <Menu.Item key="ship" title={<span><Icon type="global" />船舶</span>}></Menu.Item>                        
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <div refs="renderer_container" />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  }
}

export default Dashboard
