'use strict'

import React, { Component } from 'react'
import { Router, Route, IndexRoute, Redirect, browserHistory, hashHistory } from 'react-router'

import IndexList from './indexList'

const history = __PROD__ ? browserHistory : hashHistory

class App extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path="/" component={Roots}>
          <IndexRoute component={IndexList} />
        </Route>
      </Router>
    )
  }
}

class Roots extends Component {
  render() {
    let { children } = this.props
    return (
        <div>{children}</div>
    )
  }
}

export default App