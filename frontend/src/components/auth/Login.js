import React, { useEffect } from 'react'
import AuthService from '../../services/auth.services'
import useForm from '../../hooks/useForm'
import { Input, Button } from 'antd'
function Login(props) {
  const [form, handleInput] = useForm()
  const authService = new AuthService()

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) return props.history.push('/customers')
  }, [props.history])

  const handleLogin = () => {
    authService
      .login(form)
      .then(response => {
        console.log(response)
        localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
        props.history.push('/customers')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="container">
      <div>
        <label>Email</label>
        <Input type="email" name="email" id="email" onChange={handleInput} />
        <label>Password</label>
        <Input type="password" name="password" id="password" onChange={handleInput} />
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login
