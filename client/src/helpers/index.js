import { toast } from 'react-toastify'

export const toastifyNotify = (type, err) => {
  toast[type](err, {
    position       : 'top-right',
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : true,
    progress       : undefined
  })
}

export const isSuccessResponse = (res) => {
  const { statusCode, message } = res.data
  switch (statusCode) {
    case 200:
    case 201:
      return true
    case 204:
      return false
    default:
      toastifyNotify('error', message)

      return false
  }
}
