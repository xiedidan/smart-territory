import _ from 'lodash'
import * as THREE from 'three'
import {Slider, Table, Tag, Button, Row, Col} from 'antd'

import constants from '../utilities/constants'
import Transect from './Transect'

@observer class Evolution extends React.Component {
  constructor(store) {
    // member function
    this.dateFormatter = this.dateFormatter.bind(this)
    this.dateChangeHandler = this.dateChangeHandler.bind(this)
    this.render = this.render.bind(this)

    // data member
    this.store = store
    this.tableColumns = [
        {
            title: '编号',
            dataIndex: 'series',
            key: 'series'
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date'
        }
    ]

  }

  // helper
  playHandler() {
      this.store.togglePlay()
      if (this.store.state.playFlag) {
          this.playInterval = setInterval(() => {
              this.store.nextIndex()
          }, constants.EVOLUTION_PLAY_INTERVAL)
      }
  }

  dateFormatter(value) {
      return this.store.date
  }

  dateChangeHandler(value) {
      this.store.setIndex(value)
  }

  render() {
    return <div>
        <Row>
            <Transect></Transect>
        </Row>
        <Row>
            <Col><Button shape="circle" icon={this.store.playIcon} onClick={this.playHandler} /></Col>
            <Col>
                <Slider tipFormatter={this.dateFormatter} 
                    onChange={this.dateChangeHandler} 
                    max={this.store.evolutionList.length}
                    marks={this.store.dateMarkList} 
                    dots={true} 
                />
            </Col>
            <Col><Tag>{this.store.date}</Tag></Col>
        </Row>
        <Row>
            <Col><Table dataSource={this.store.evolutionList} columns={this.tableColumns} /></Col>
        </Row>
    </div>
  }
}

export default Evolution
