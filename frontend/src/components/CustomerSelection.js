import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import CustomerServices from '../services/customer.services'

function CustomerSelection({ handleCascader, defaultValue }) {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    let mounted = true
    const customerServices = new CustomerServices()
    customerServices
      .getAll()
      .then(({ data }) => {
        const auxCustomers = data.customers.map(customer => ({
          value: customer._id,
          label: customer.name
        }))
        if (mounted) setCustomers(auxCustomers)
      })
      .catch(err => console.error(err))
    return () => (mounted = false)
  }, [])

  return (
    <Cascader
      name="customer"
      options={customers}
      placeholder={'Seleccione cliente'}
      onChange={values => handleCascader(values, 'customer')}
      changeOnSelect
      defaultValue={defaultValue}
    />
  )
}

export default CustomerSelection
