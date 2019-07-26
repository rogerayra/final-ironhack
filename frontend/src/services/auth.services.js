import axios from 'axios'
const baseURL = 'http://localhost:3001/api/auth'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL,
      withCredentials: true
    })
  }

  login(data) {
    return this.service.post('/login', data)
  }

  logout() {
    return this.service.get('/logout')
  }
}

export default AuthService
