import axios from 'axios'
const baseURL = 'http://localhost:3001/api/geoarea'

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
