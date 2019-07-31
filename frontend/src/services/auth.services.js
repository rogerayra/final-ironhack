import axios from 'axios'
import apiUrl from './apiUrl'

const baseURL = `${apiUrl}/auth`

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
