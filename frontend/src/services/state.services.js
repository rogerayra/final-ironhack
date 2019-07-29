import axios from 'axios'
const baseURL = 'http://localhost:3001/api/state'

class StateService {
  constructor() {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    })
  }

  getAll() {
    return this.service.get('/')
  }
}

export default StateService
