import React from 'react'
import { Modal, Cascader } from 'antd'
import useForm from '../../hooks/useForm'

function UserForm({ user, visible, handleOk, handleCancel }) {
  const [form, handleInput, handleCascader] = useForm({ id: user ? user._id : undefined })

  const formatData = () => {
    const data = {
      firstname: form.firstname,
      surname: form.surname,
      email: form.email,
      role: form.role,
      password: form.password
    }

    handleOk(user ? user._id : undefined, data)
  }

  return (
    <Modal
      title={`${user ? 'Editar' : 'Crear'} Usuario`}
      visible={visible}
      onOk={() => formatData()}
      onCancel={handleCancel}
      okButtonProps={{ style: { backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white' } }}
    >
      <div>
        <div>
          <label>Nombre</label>
          <input type="text" name="firstname" onChange={handleInput} defaultValue={user ? user.firstname : ''} />
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" name="surname" onChange={handleInput} defaultValue={user ? user.surname : ''} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" onChange={handleInput} defaultValue={user ? user.email : ''} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleInput} defaultValue={user ? user.password : ''} />
        </div>
        <div>
          <label>Rol</label>
          <Cascader
            name="role"
            options={[{ value: 'ADMIN', label: 'Administrador' }, { value: 'SALESREP', label: 'Comercial' }]}
            placeholder={'Seleccione rol'}
            onChange={values => handleCascader(values, 'role')}
            defaultValue={user ? [user.role] : []}
            changeOnSelect
          />
        </div>
      </div>
    </Modal>
  )
}

export default UserForm
