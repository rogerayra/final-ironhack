import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import CustomerServices from '../../services/customer.services'
import CustomerFilters from './CustomerFilters'
import CustomerMap from './CustomerMap'
import CustomerList from './CustomerList'

function CustomerHome() {
  const [customers, setCustomers] = useState([])
  const [customersToShow, setCustomersToShow] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerFilters, handleInput, handleCascader] = useForm()

  // Initial load of customers
  useEffect(() => {
    const customerServices = new CustomerServices()
    customerServices
      .getAll()
      .then(({ data }) => {
        setCustomers(prevState => {
          return [...prevState, ...data.customers]
        })
      })
      .catch(err => console.error(err))
  }, [])

  // Change customers to show based on filters
  useEffect(() => {
    // All customers
    let newCustomersToShow = customers

    // Filter by name
    if (newCustomersToShow && customerFilters && customerFilters.customerName)
      newCustomersToShow = newCustomersToShow.filter(customer => customer.name.includes(customerFilters.customerName))

    // Filter by sector
    if (newCustomersToShow && customerFilters && customerFilters.sector)
      newCustomersToShow = newCustomersToShow.filter(customer => customer.sector === customerFilters.sector)

    setCustomersToShow(newCustomersToShow)
  }, [customerFilters, customers])

  const selectCustomer = (e, customer) => {
    if (e) e.preventDefault()
    setSelectedCustomer(customer)
  }
  const clearCustomerSelection = () => {
    setSelectedCustomer(null)
  }

  return (
    <div>
      <div className="container">
        <CustomerFilters handleInput={handleInput} handleCascader={handleCascader} />
        <div className="info">
          <CustomerList
            customers={customersToShow}
            selectCustomer={selectCustomer}
            clearCustomerSelection={clearCustomerSelection}
            selectedCustomer={selectedCustomer}
          />
          <CustomerMap
            customers={customersToShow}
            selectCustomer={selectCustomer}
            clearCustomerSelection={clearCustomerSelection}
            selectedCustomer={selectedCustomer}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomerHome
