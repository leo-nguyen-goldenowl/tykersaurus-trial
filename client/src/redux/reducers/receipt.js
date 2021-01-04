import { Receipt } from 'constants/actionTypes'

const initailState = {
  isInitialized: false,
  listReceipt  : [],
  loading      : false
}

const receipt = (state = initailState, action) => {
  switch (action.type) {
    case Receipt.REQUEST_GET_LIST_RECEIPT:
      return { ...state, loading: true }
    case Receipt.FAIL_REQUEST_RECEIPT:
      return { ...state, loading: false }
    case Receipt.GET_LIST_RECEIPT:
      console.log(action.payload)
      return {
        ...state,
        listReceipt: action.payload.listReceipt,
        loading    : false
      }
    default:
      return state
  }
}

export default receipt
