'use strict'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = [thunkMiddleware]

if (__DEV__) {
  middlewares.push(createLogger())
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default function configureStore(preloadedState) {
  const store = createStoreWithMiddleware(rootReducer, preloadedState)
  return store
}