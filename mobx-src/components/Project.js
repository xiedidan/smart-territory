import React from 'react'
import {observer} from 'mobx-react'
import _ from 'lodash'
import * as THREE from 'three'
import {Table, Layout, Menu, Breadcrumb, Form, Input, Icon, Checkbox, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

@observer class Project extends React.Component {
  constructor() {
    super()

    // data member
    this.columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTs',
            key: 'createTs'
        },
        {
            title: '描述',
            dataIndex: 'detail',
            key: 'detail'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                <span>
                    <a href="#"><Icon type="edit" />修改</a>
                    <span className="ant-divider" />
                    <a href="#">删除</a>
                </span>
            }
        }
    ]

    // member function
    this.render = this.render.bind(this)
  }

  render() {
    return <div>
        <Row><Button /></Row>
        <Row><Table /></Row>
    </div>
  }
}

export default Project
