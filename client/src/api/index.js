import axios from 'axios'

import config from 'configs'

const host = config.URIServer
const apiHost = `${host}/api`

const instance = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
