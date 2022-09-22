import { BaseService } from "./BaseService";

const GIF_TENOR_API_KEY = process.env.REACT_APP_GIF_TENOR_API_KEY

export class GifTenorService extends BaseService {
  constructor() {
    super()
  }

  async searchGifs(search_term: string, pos: number) {
    return await this.client.get(`/api/v1/users/search_gifs?search_term=${search_term}`)

  }
}