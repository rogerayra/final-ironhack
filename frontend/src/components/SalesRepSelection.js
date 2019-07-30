import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import UserServices from '../services/user.services'

function SalesRepSelection({ handleCascader }) {
  const [salesReps, setSalesReps] = useState([])

  useEffect(() => {
    const userServices = new UserServices()
    userServices
      .getAll(`?role=SALESREP`)
      .then(({ data }) => {
        const auxSalesReps = data.users.map(user => ({
          value: user._id,
          label: `${user.firstname} ${user.surname}`
        }))

        setSalesReps(auxSalesReps)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <Cascader
      name="salesRep"
      options={salesReps}
      placeholder={'Seleccione comercial'}
      onChange={values => handleCascader(values, 'salesRep')}
      changeOnSelect
    />
  )
}

export default SalesRepSelection
