import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import AuthService from '../services/auth.services'
import { Button } from 'antd'

function Navbar(props) {
  const handleLogout = () => {
    const authService = new AuthService()
    authService
      .logout()
      .then(() => {
        localStorage.removeItem('loggedUser')
        props.history.push('/login')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Perfil</NavLink>
      <Button type="link" onClick={handleLogout}>
        Logout
      </Button>
      <NavLink to="/customers">Clientes</NavLink>
      <NavLink to="/visits">Visitas</NavLink>
      <NavLink to="/users">Usuarios</NavLink>
    </div>
  )
}

export default withRouter(Navbar)
