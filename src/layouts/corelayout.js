'use strict'

import React, { PropTypes } from 'react'
import Header from '../components/header'

export const CoreLayout = ({ children }) => (
  <div className="container text-center">
    <Header />
    <div className="mainContainer">
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout