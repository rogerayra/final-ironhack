import React from 'react'
import { Input, Cascader } from 'antd'

function UserFilters({ handleInput, handleCascader }) {
  return (
    <div className="filters">
      <div className="inputs">
        <label>Usuario</label>
        <Input type="text" name="userName" placeholder="Buscar" onChange={handleInput} />
      </div>
      <div className="inputs">
        <label>Rol</label>
        <Cascader
          name="role"
          options={[{ value: 'ADMIN', label: 'Administrador' }, { value: 'SALESREP', label: 'Comercial' }]}
          onChange={values => handleCascader(values, 'role')}
          changeOnSelect
        />
      </div>
    </div>
  )
}

export default UserFilters
