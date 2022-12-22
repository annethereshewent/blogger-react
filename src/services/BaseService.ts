import axios, { AxiosInstance } from 'axios'

export class BaseService {
  protected client: AxiosInstance

  constructor() {
    const token = localStorage.getItem('apiToken')

    const auth = token != null ? `Bearer ${token}` : ''

    this.client = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3007',
      headers: {
        Authorization: auth
      }
    })
  }
}
