import { useEffect } from 'react'

const useCheckInternet = (onNotify) => {
  useEffect(() => {
    window.addEventListener('online', onNotify)
    window.addEventListener('offline', onNotify)
  }, [window])
}

export default useCheckInternet
