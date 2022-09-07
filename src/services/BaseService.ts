import { AxiosInstance } from "axios"
import axios from 'axios'

export class BaseService {
  protected client: AxiosInstance

  constructor() {
    const token = localStorage.getItem('apiToken')

    this.client = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3007',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}