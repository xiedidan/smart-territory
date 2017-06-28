import React from 'react'
import {observer} from 'mobx-react'
import _ from 'lodash'
import * as THREE from 'three'
import {Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class User extends React.Component {
  constructor() {
    super()

    // member function
    this.render = this.render.bind(this)
  }

  render() {
    return <div>
    </div>
  }
}

export default User
