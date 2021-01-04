import axios from 'axios'

const apiHost = '/api/v1'

const instance = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
