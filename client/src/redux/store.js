import { combineReducers } from 'redux'
import receipt from './reducers/receipt'

const appReducer = combineReducers({
  receipt
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
