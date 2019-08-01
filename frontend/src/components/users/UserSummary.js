import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

function UserSummary({ users, createUser }) {
  const [roles, setRoles] = useState([new Set()])

  useEffect(() => {
    const auxRoles = new Set()
    if (users) users.forEach(user => auxRoles.add(user.role))
    setRoles(Array.from(auxRoles))
  }, [users])

  return (
    <div className="summary">
      <h2>{`${users.length} usuarios`}</h2>
      <ul>
        {roles.map((role, i) => (
          <li key={i}>{`${role}: ${users.filter(user => user.role === role).length}`}</li>
        ))}
      </ul>
      <Button onClick={createUser} style={{ backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white' }}>
        Crear usuario
      </Button>
    </div>
  )
}

export default UserSummary
