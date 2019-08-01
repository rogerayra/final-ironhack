import React from 'react'
import { Modal, Button } from 'antd'
const { confirm } = Modal

function UserDetail({ user, editUser, deleteUser }) {
  const showConfirm = () => {
    confirm({
      title: '¿Quiere eliminar este usuario?',
      onOk() {
        deleteUser(user)
      },
      onCancel() {}
    })
  }

  return (
    <div className="detail">
      {user && (
        <div>
          <h2>{`${user.firstname} ${user.surname}`}</h2>
          <div>
            <small>Email</small>
            <span>{user.email}</span>
          </div>
          <div>
            <small>Rol</small>
            <span>{user.role}</span>
          </div>
          <Button style={{ backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white' }} onClick={() => editUser(user)}>
            Editar
          </Button>
          <Button style={{ backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white' }} onClick={showConfirm}>
            Eliminar
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserDetail
