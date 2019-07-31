import axios from 'axios'
import apiUrl from './apiUrl'

const baseURL = `${apiUrl}/geoarea`

class GeoAreaService {
  constructor() {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    })
  }
  getAll(locType) {
    return this.service.get(`/${locType}`)
  }
}

export default GeoAreaService
