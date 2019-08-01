import axios from 'axios'
import apiUrl from './apiUrl'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${apiUrl}/auth`,
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
