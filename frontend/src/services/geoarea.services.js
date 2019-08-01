import axios from 'axios'
import apiUrl from './apiUrl'

class GeoAreaService {
  constructor() {
    this.service = axios.create({
      baseURL: `${apiUrl}/geoarea`,
      withCredentials: true
    })
  }
  getAll(locType) {
    return this.service.get(`/${locType}`)
  }
}

export default GeoAreaService
