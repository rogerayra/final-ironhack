import React, { useState, useEffect, useContext } from 'react'
import useForm from '../../hooks/useForm'
import UserServices from '../../services/user.services'
import UserFilters from './UserFilters'
import UserList from './UserList'
import UserDetail from './UserDetail'
import UserSummary from './UserSummary'
import UserForm from './UserForm'
import { MyContext } from '../../context'

function UserHome({ history }) {
  const context = useContext(MyContext)
  if (!context.state.isLogged || context.state.user.role !== 'ADMIN') history.push('/')

  const [users, setUsers] = useState([])
  const [usersToShow, setUsersToShow] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userFilters, handleInput, handleCascader] = useForm()
  const [formVisible, setFormVisible] = useState(false)
  const [userToEdit, setUserToEdit] = useState()

  // Initial load of users
  useEffect(() => {
    const userServices = new UserServices()
    userServices
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
        `${user.firstname} ${user.surname}`.toUpperCase().includes(userFilters.userName.toUpperCase())
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

  const showFormEdit = user => {
    setUserToEdit(user)
    setFormVisible(true)
  }

  const showFormCreate = () => {
    setUserToEdit(null)
    setFormVisible(true)
  }

  const createUser = form => {
    const userServices = new UserServices()
    userServices
      .postOne(form)
      .then(({ data }) => {
        const auxUsers = [...users]
        auxUsers.push(data.user)
        console.log(data)
        setUsers(auxUsers)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const updateUser = (id, form) => {
    const userServices = new UserServices()
    userServices
      .patchOne(id, form)
      .then(({ data }) => {
        const auxUsers = [...users]
        const index = auxUsers.findIndex(u => u._id === data.user._id)
        if (index > -1) auxUsers[index] = data.user
        clearUserSelection()
        setUsers(auxUsers)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const deleteUser = user => {
    const userServices = new UserServices()
    userServices
      .deleteOne(user._id)
      .then(({ data }) => {
        const auxUsers = [...users]
        const index = auxUsers.findIndex(u => u._id === data.user._id)
        if (index > -1) auxUsers.splice(index, 1)
        clearUserSelection()

        setUsers(auxUsers)
      })
      .catch(err => console.error(err))
  }

  const handleFormOk = (id, data) => {
    if (id) updateUser(id, data)
    else createUser(data)
  }

  const handleFormCancel = () => {
    setFormVisible(false)
  }

  return (
    <div className="container">
      {formVisible && (
        <UserForm user={userToEdit} visible={formVisible} handleOk={handleFormOk} handleCancel={handleFormCancel} />
      )}
      <UserFilters handleInput={handleInput} handleCascader={handleCascader} />
      <div className="info">
        <UserList
          users={usersToShow}
          selectUser={selectUser}
          clearUserSelection={clearUserSelection}
          selectedUser={selectedUser}
        />
        <div className="info-detail">
          <UserSummary users={usersToShow} createUser={showFormCreate} />
          <UserDetail user={selectedUser} deleteUser={deleteUser} editUser={showFormEdit} />
        </div>
      </div>
    </div>
  )
}

export default UserHome
