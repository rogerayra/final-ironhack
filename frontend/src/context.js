import React, { createContext, useState } from 'react'

export const MyContext = createContext()

function MyProvider(props) {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem('loggedUser')),
    isLogged: localStorage.getItem('loggedUser') ? true : false
  })

  const setUser = user => {
    // console.log('user', user)
    // console.log('JSON.parse(localStorage.getItem(loggedUser))', JSON.parse(localStorage.getItem('loggedUser')))
    // if (!user) user = JSON.parse(localStorage.getItem('loggedUser'))
    setState(prevState => ({
      ...prevState,
      user,
      isLogged: !prevState.isLogged
    }))
  }

  return (
    <MyContext.Provider
      value={{
        state,
        setUser
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider
