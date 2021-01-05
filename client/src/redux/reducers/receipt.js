import { Receipt } from 'constants/actionTypes'

const initailState = {
  isInitialized: false,
  listReceipt  : {},
  loading      : false
}

const receipt = (state = initailState, action) => {
  switch (action.type) {
    case Receipt.REQUEST_GET_LIST_RECEIPT:
    case Receipt.REQUEST_READ_RECEIPT:
      return { ...state, loading: true }
    case Receipt.FAIL_REQUEST_RECEIPT:
    case Receipt.NO_HAVE_NEW_RECEIPT:
      return { ...state, loading: false }
    case Receipt.GET_LIST_RECEIPT:
      return {
        ...state,
        listReceipt: Object.fromEntries(
          action.payload.listReceipt.map((receipt) => [receipt._id, receipt])
        ),
        loading: false
      }
    case Receipt.READ_RECEIPT: {
      const newListReceipt = { ...state.listReceipt }
      newListReceipt[action.payload.id].flag_read = true

      return { ...state, listReceipt: newListReceipt, loading: false }
    }
    default:
      return state
  }
}

export default receipt
