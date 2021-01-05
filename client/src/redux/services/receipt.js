import {
  failRequestReceipt,
  requestGetListReceipt,
  getListReceipt
} from '../actions/receipt'

import api from 'api'
import { isSuccessResponse } from 'helpers'

const fetchListReceipt = () => async (dispatch, getState) => {
  dispatch(requestGetListReceipt())
  const fetchData = async () => {
    try {
      const res = await api.get(
        `/receipts?current=${getState().receipt.listReceipt.length}`
      )

      if (isSuccessResponse(res)) {
        const { result } = res.data
        const { listReceipt } = result

        dispatch(
          getListReceipt({
            listReceipt: listReceipt.filter(
              (receipt) => receipt.status === true
            )
          })
        )
      } else {
        dispatch(failRequestReceipt())
      }

      setTimeout(fetchData, 15000)
    } catch (error) {
      console.log(error)
    }
  }

  await fetchData()
}

const shouldFetchListReceipt = (state) => {
  const { isInitialized } = state
  return !isInitialized
}

export const fetchListReceiptIfNeedeed = () => (dispatch, getState) => {
  if (shouldFetchListReceipt(getState().receipt)) {
    return dispatch(fetchListReceipt())
  }
  return true
}
