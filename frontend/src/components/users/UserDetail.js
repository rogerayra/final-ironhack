import React from 'react'
import useForm from '../../hooks/useForm'
import UserService from '../../services/user.services'
import { Input, Cascader } from 'antd'

function UserDetail({ user, history }) {
  const [form, handleInput, handleCascader] = useForm()
  const userService = new UserService()

  const handleUpdate = () => {
    userService
      .patchOne(user._id, form)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleDelete = () => {
    userService
      .deleteOne(user._id)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  console.log('user', user)
  console.log('form', form)

  return (
    <div className="detail">
      {user && (
        <div>
          <div>
            <label>Nombre</label>
            <Input type="text" name="firstname" id="name" onChange={handleInput} defaultValue={user.firstname} />
          </div>
          <div>
            <label>Apellido</label>
            <Input type="text" name="surname" id="name" onChange={handleInput} defaultValue={user.surname} />
          </div>
          <div>
            <label>Email</label>
            <Input type="email" name="email" id="email" onChange={handleInput} defaultValue={user.email} />
          </div>
          <div>
            <label>Rol</label>
            <Cascader
              name="role"
              options={[{ value: 'ADMIN', label: 'Administrador' }, { value: 'SALESREP', label: 'Comercial' }]}
              onChange={values => handleCascader(values, 'role')}
              defaultValue={[user.role]}
            />
          </div>
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  )
}

export default UserDetail
