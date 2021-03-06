import axios from 'axios'
import apiUrl from './apiUrl'

class CustomerService {
  constructor() {
    this.service = axios.create({
      baseURL: `${apiUrl}/customer`,
      withCredentials: true
    })
  }

  getAll() {
    return this.service.get('/')
  }

  getOne(id) {
    return this.service.get(`/${id}`)
  }

  postOne(data) {
    return this.service.post('/', data)
  }

  patchOne(id, data) {
    return this.service.patch(`/${id}`, data)
  }

  deleteOne(id) {
    return this.service.delete(`/${id}`)
  }
}

export default CustomerService
