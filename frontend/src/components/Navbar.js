import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from '../services/auth.services'
import { MyContext } from '../context'
import UserForm from './users/UserForm'

function Navbar({ history }) {
  const context = useContext(MyContext)
  const [formVisible, setFormVisible] = useState(false)

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

  const closeForm = () => {
    setFormVisible(false)
  }

  return (
    <div className="navbar">
      {formVisible && (
        <UserForm user={context.state.user} visible={formVisible} handleOk={closeForm} handleCancel={closeForm} />
      )}
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
      <button className="nav-btn" onClick={() => setFormVisible(true)}>
        Perfil
      </button>
      <hr />
      <button className="nav-btn" onClick={handleLogout}>
        Cerrar sessión
      </button>
    </div>
  )
}

export default withRouter(Navbar)
