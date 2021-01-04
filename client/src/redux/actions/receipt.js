import { Receipt } from 'constants/actionTypes'

export const failRequestReceipt = () => ({
  type: Receipt.FAIL_REQUEST_RECEIPT
})

export const requestGetListReceipt = () => ({
  type: Receipt.REQUEST_GET_LIST_RECEIPT
})

export const getListReceipt = ({ listReceipt }) => ({
  type   : Receipt.GET_LIST_RECEIPT,
  payload: { listReceipt }
})
