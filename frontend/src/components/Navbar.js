import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from '../services/auth.services'
import { Popover } from 'antd'
import { MyContext } from '../context'

function Navbar({ history }) {
  const context = useContext(MyContext)
  const handleLogout = () => {
    const authService = new AuthService()
    authService
      .logout()
      .then(() => {
        localStorage.removeItem('loggedUser')
        context.setUser({})
        history.push('/')
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
      <button className="nav-title nav-btn" onClick={() => history.push('/')}>
        Gestión de clientes
      </button>
      <button className="nav-btn" onClick={() => history.push('/customers')}>
        Clientes
      </button>
      <button className="nav-btn" onClick={() => history.push('/visits')}>
        Visitas
      </button>
      {context.state.user.role === 'ADMIN' ? (
        <button className="nav-btn" onClick={() => history.push('/users')}>
          Usuarios
        </button>
      ) : (
        ''
      )}

      <Popover content={profileContent} trigger="hover" placement="bottomRight">
        <button className="nav-btn">{context.state.user.firstname}</button>
      </Popover>
    </div>
  )
}

export default withRouter(Navbar)
