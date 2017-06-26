import _ from 'lodash'
import * as THREE from 'three'
import {Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'
import Project from './components/Project'
import User from './components/User'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Workspace extends React.Component {
  constructor() {
    // member function
    this.settingClickHandler = this.settingClickHandler.bind(this)
    this.exitClickHandler = this.exitClickHandler.bind(this)
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.render = this.render.bind(this)
  }

  // helper
  settingClickHandler() {
      this.props.store.nav('setting')
  }

  exitClickHandler() {
      this.props.store.nav('exit')
  }

  menuClickHandler(e) {
      this.props.store.nav(e.key)
  }

  render() {
    let content
    switch(this.store.state.position) {
        case 'project':
        content = <Project store={this.props.store} />
        break

        case 'user':
        content = <User store={this.props.store} />
        break

        default:
        content = <Project store={this.props.store} />
    }

    return <div>
        <Layout>
            <Header className="Header">
                <div className="Logo" />
                <Button type="primary" onClick={this.navHandler}><Icon type="setting" />设置</Button>
                <Button type="primary" onClick={this.navHandler}><Icon type="logout" />退出</Button>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu 
                        mode="inline"
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={this.menuClickHandler}
                        selectedKeys={[this.props.store.state.position]}
                    >
                        <Menu.Item key="project" title={<span><Icon type="appstore-o" />工程管理</span>}></Menu.Item>
                        <Menu.Item key="user" title={<span><Icon type="user" />用户管理</span>}></Menu.Item>
                        <Menu.Item key="blueprint" title={<span><Icon type="picture" />航道图管理</span>}></Menu.Item>
                        <Menu.Item key="interface" title={<span><Icon type="api" />接口管理</span>}></Menu.Item>
                        <Menu.Item key="marker" title={<span><Icon type="environment-o" />航标管理</span>}></Menu.Item>
                        <Menu.Item key="hydrology" title={<span><Icon type="line-chart" />水文管理</span>}></Menu.Item>
                        <Menu.Item key="fog" title={<span><Icon type="eye-o" />雾情管理</span>}></Menu.Item>
                        <Menu.Item key="meteorology" title={<span><Icon type="cloud-o" />气象管理</span>}></Menu.Item>
                        <Menu.Item key="ship" title={<span><Icon type="global" />船舶管理</span>}></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>{content}</Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  }
}

export default Workspace
