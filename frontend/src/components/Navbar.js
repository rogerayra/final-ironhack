import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from '../services/auth.services'
import { Popover } from 'antd'

function Navbar({ history }) {
  const handleLogout = () => {
    const authService = new AuthService()
    authService
      .logout()
      .then(() => {
        localStorage.removeItem('loggedUser')
        history.push('/login')
      })
      .catch(err => console.log(err))
  }

  const profileContent = (
    <div className="popover">
      <button className="nav-btn popover-btn" onClick={() => history.push('/profile')}>
        Perfil
      </button>
      <hr />
      <button className="nav-btn popover-btn" onClick={handleLogout}>
        Cerrar sessión
      </button>
    </div>
  )

  return (
    <div className="navbar">
      <button className="nav-btn" onClick={() => history.push('/customers')}>
        Clientes
      </button>
      <button className="nav-btn" onClick={() => history.push('/visits')}>
        Visitas
      </button>
      <button className="nav-btn" onClick={() => history.push('/users')}>
        Usuarios
      </button>

      <Popover content={profileContent} trigger="hover" placement="bottomRight">
        <button className="nav-btn">Pepe</button>
      </Popover>
    </div>
  )
}

export default withRouter(Navbar)
