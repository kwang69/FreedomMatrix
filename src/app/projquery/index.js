import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input } from 'antd';
import getNode from 'util/getNode'
import './index.less'
import { message } from 'antd'

@inject('projectActions', 'userStore')
@observer
class Projquery extends React.Component {

  constructor(props) {
    super(props)
    this.actions = props.projectActions
    this.store = props.userStore
  }


  render() {

    return (
      <div className='g-projquery'>
        query

        aaaaaaaa
      </div>
    )
  }
}




export default Projquery