import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import UserServices from '../services/user.services'

function SalesRepSelection({ name, handleCascader, defaultValue }) {
  const [salesReps, setSalesReps] = useState([])

  useEffect(() => {
    let mounted = true
    const userServices = new UserServices()
    userServices
      .getAll(`?role=SALESREP`)
      .then(({ data }) => {
        const auxSalesReps = data.users.map(user => ({
          value: user._id,
          label: `${user.firstname} ${user.surname}`
        }))
        if (mounted) setSalesReps(auxSalesReps)
      })
      .catch(err => console.error(err))

    return () => (mounted = false)
  }, [])

  return (
    <Cascader
      name={name}
      options={salesReps}
      placeholder={'Seleccione comercial'}
      onChange={values => handleCascader(values, name)}
      changeOnSelect
      defaultValue={defaultValue}
    />
  )
}

export default SalesRepSelection
