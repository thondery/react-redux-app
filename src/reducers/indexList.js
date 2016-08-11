'use strict'

import * as types from '../constants/actionTypes'

const initState = {
  tab: '',
  page: 1,
  limit: 40,
  mdrender: true,
  data: []
}

const IndexList = (state = initState, action) => {
  switch (action.type) {
    case types.GETINDEXLIST: {
      return Object.assign({}, state, {
        data: action.data
      })
    }
    default:
      return state
  }
}

export default IndexList