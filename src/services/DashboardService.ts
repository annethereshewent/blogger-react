import { AxiosInstance } from "axios"
import { BaseService } from "./BaseService"

export class DashboardService extends BaseService {
  constructor() {
    super()
  }

  async getDashboardData() {
    return await this.client.get('/api/v1/users/dashboard')
  }
}