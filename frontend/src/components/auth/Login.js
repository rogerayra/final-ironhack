import React, { useContext } from 'react'
import AuthService from '../../services/auth.services'
import useForm from '../../hooks/useForm'
import { Input, Button } from 'antd'
import { MyContext } from '../../context'
function Login({ history }) {
  const context = useContext(MyContext)
  if (context.state.isLogged) history.push('/')

  const [form, handleInput] = useForm()
  const authService = new AuthService()

  const handleLogin = () => {
    authService
      .login(form)
      .then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
        context.setUser(response.data.user)
        history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="container login">
      <h1 style={{ fontSize: '100px' }}>Gestión de Clientes</h1>
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
