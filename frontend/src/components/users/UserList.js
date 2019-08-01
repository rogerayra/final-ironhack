import React, { createRef, useEffect } from 'react'

function UserList({ users, selectUser, clearUserSelection, selectedUser, createUser }) {
  const refs = users.reduce((acc, user) => {
    acc[user._id] = createRef()
    return acc
  }, {})

  function isVisible(ele) {
    const { top, bottom } = ele.getBoundingClientRect()
    const { top: parentTop, bottom: parentBottom } = ele.parentNode.getBoundingClientRect()

    return top > parentTop && bottom < parentBottom
  }

  useEffect(() => {
    users.forEach(customer => refs[customer._id].current.classList.remove('selected-user'))
    if (selectedUser) {
      if (!isVisible(refs[selectedUser._id].current))
        refs[selectedUser._id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      refs[selectedUser._id].current.classList.add('selected-user')
    }
  }, [refs, selectedUser, users])

  const handleClick = customer => {
    selectUser(null, customer)
  }

  return (
    <div className="list">
      <h1>Usuarios</h1>
      <ul>
        {users.map(user => {
          return (
            <li key={user._id} ref={refs[user._id]} className="customer-item" onClick={() => handleClick(user)}>
              <div>
                <b style={{ marginLeft: '10px' }}>{`${user.firstname} ${user.surname}`}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space_between' }}>
                <span style={{ marginLeft: '10px' }}>{user.role}</span>
                <span style={{ marginRight: '10px' }}>{user.email}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserList
