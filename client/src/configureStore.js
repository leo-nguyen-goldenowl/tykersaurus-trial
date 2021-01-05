import { createStore, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'

import rootReducer from 'redux/store'

export default () => {
  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return { store }
}
