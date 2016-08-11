'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTopicList } from '../actions/indexList'

class IndexList extends Component {

  render () {
    return (
      <div>
        IndexList => {this.props.data}
      </div>
    )
  }

  componentDidMount () {
    let { dispatch } = this.props
    dispatch(getTopicList({}))
  }
}

function mapStateToProps (state) {
  return {
    data: state.IndexList.data
  }
}

export default connect((mapStateToProps))(IndexList)