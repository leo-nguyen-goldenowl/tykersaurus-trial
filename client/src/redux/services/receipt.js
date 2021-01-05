import {
  failRequestReceipt,
  requestGetListReceipt,
  getListReceipt,
  noHaveNewReceipt,
  requestReadReceipt,
  readReceipt
} from '../actions/receipt'

import api from 'api'
import { isSuccessResponse, toastifyNotify } from 'helpers'

const fetchListReceipt = () => async (dispatch, getState) => {
  dispatch(requestGetListReceipt())
  const fetchData = async () => {
    try {
      const res = await api.get(
        `/receipts?current=${
          Object.values(getState().receipt.listReceipt).length
        }`
      )

      if (isSuccessResponse(res)) {
        const { result, statusCode } = res.data

        if (statusCode === 204) {
          dispatch(noHaveNewReceipt())
        } else {
          const { listReceipt } = result
          listReceipt.map(
            (receipt) =>
              !receipt.flag_read &&
              toastifyNotify(
                receipt.status ? 'success' : 'error',
                receipt.status
                  ? `Booking course (${receipt.date}) successfully`
                  : `Booking course (${receipt.date}) failed`,
                null,
                ()=>dispatch(seenReceipt(receipt._id))
              )
          )
          dispatch(
            getListReceipt({
              listReceipt
            })
          )
        }
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

const seenReceipt = (id) => async (dispatch) => {
  dispatch(requestReadReceipt())

  try {
    const res = api.post(`/receipts/read-receipt/${id}`)
    if (isSuccessResponse(res)) {
      dispatch(readReceipt({ id }))
    } else {
      dispatch(failRequestReceipt())
    }
  } catch (error) {
    dispatch(failRequestReceipt())
  }
}
