import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import UserService from '../../services/user.services'
import UserFilters from './UserFilters'
import UserList from './UserList'
import UserDetail from './UserDetail'

function UserHome() {
  const [users, setUsers] = useState([])
  const [usersToShow, setUsersToShow] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userFilters, handleInput, handleCascader] = useForm()

  // Initial load of users
  useEffect(() => {
    const userService = new UserService()
    userService
      .getAll()
      .then(({ data }) => {
        setUsers(prevState => {
          return [...prevState, ...data.users]
        })
      })
      .catch(err => console.error(err))
  }, [])

  // Change users to show based on filters
  useEffect(() => {
    // All users
    let newUsersToShow = users

    // Filter by firstname and surname
    if (newUsersToShow && userFilters && userFilters.userName)
      newUsersToShow = newUsersToShow.filter(user =>
        `${user.firstname} ${user.surname}`.name.includes(userFilters.userName)
      )

    // Filter by role
    if (newUsersToShow && userFilters && userFilters.role)
      newUsersToShow = newUsersToShow.filter(user => user.role === userFilters.role)

    setUsersToShow(newUsersToShow)
  }, [userFilters, users])

  const selectUser = (e, user) => {
    if (e) e.preventDefault()
    setSelectedUser(user)
  }
  const clearUserSelection = () => {
    setSelectedUser(null)
  }

  return (
    <div>
      <div className="container">
        <UserFilters handleInput={handleInput} handleCascader={handleCascader} />
        <div className="info">
          <UserList
            users={usersToShow}
            selectUser={selectUser}
            clearUserSelection={clearUserSelection}
            selectedUser={selectedUser}
          />
          <UserDetail user={selectedUser} />
        </div>
      </div>
    </div>
  )
}

export default UserHome
