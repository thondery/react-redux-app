'use strict'

import React from 'react'
import DuckImage from '../../../../assets/images/Duck.jpg'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt="This is a duck, because Redux!"
      className="duck"
      src={DuckImage} />
  </div>
)

export default HomeView