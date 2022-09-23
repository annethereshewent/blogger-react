import { BaseService } from './BaseService'

export class GifTenorService extends BaseService {
  async searchGifs(search_term: string, pos: number) {
    return await this.client.get(`/api/v1/users/search_gifs?search_term=${search_term}`)
  }
}
