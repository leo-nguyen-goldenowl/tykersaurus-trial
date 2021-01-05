import { toast } from 'react-toastify'

export const toastifyNotify = (type, err, autoClose = false, onClose) => {
  toast(err, {
    position       : 'top-right',
    autoClose      : autoClose || false,
    hideProgressBar: !autoClose,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : true,
    progress       : undefined,
    type           : type,
    onClose        : onClose
  })
}

export const isSuccessResponse = (res) => {
  const { statusCode, message } = res.data
  switch (statusCode) {
    case 200:
    case 201:
    case 204:
      return true

    default:
      toastifyNotify('error', message)

      return false
  }
}
