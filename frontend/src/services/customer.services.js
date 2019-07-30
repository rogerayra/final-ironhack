import axios from 'axios'
// const baseURL = 'http://localhost:3001/api/customer'
const baseURL = 'https://thawing-atoll-50612.herokuapp.com/api/customer'

class CustomerService {
  constructor() {
    this.service = axios.create({
      baseURL,
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
