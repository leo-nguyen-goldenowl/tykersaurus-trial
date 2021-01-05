import { Receipt } from 'constants/actionTypes'

export const failRequestReceipt = () => ({
  type: Receipt.FAIL_REQUEST_RECEIPT
})

export const noHaveNewReceipt = () => ({
  type: Receipt.NO_HAVE_NEW_RECEIPT
})

export const requestReadReceipt = () => ({
  type: Receipt.REQUEST_READ_RECEIPT
})

export const requestGetListReceipt = () => ({
  type: Receipt.REQUEST_GET_LIST_RECEIPT
})

export const readReceipt = ({ id }) => ({
  type   : Receipt.READ_RECEIPT,
  payload: { id }
})

export const getListReceipt = ({ listReceipt }) => ({
  type   : Receipt.GET_LIST_RECEIPT,
  payload: { listReceipt }
})
