import { combineReducers } from 'redux'
import receipt from './reducers/receipt'
import ticket from './reducers/ticket'

const appReducer = combineReducers({
  receipt,
  ticket
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
