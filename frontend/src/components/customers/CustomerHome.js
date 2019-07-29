import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import CustomerServices from '../../services/customer.services'
import CustomerFilters from './CustomerFilters'
import CustomerMap from './CustomerMap'
import CustomerList from './CustomerList'
import CustomerDetail from './CustomerDetail'

function CustomerHome() {
  const [customers, setCustomers] = useState([])
  const [customersToShow, setCustomersToShow] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerFilters, handleInput, handleCascader, handleLocCascader] = useForm()

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
  console.log('customers', customers)

  // Change customers to show based on filters
  useEffect(() => {
    clearCustomerSelection()

    // All customers
    let newCustomersToShow = customers

    // Filter by name
    if (newCustomersToShow && customerFilters && customerFilters.customerName)
      newCustomersToShow = newCustomersToShow.filter(customer =>
        customer.name.toLowerCase().includes(customerFilters.customerName.toLowerCase())
      )

    // Filter by sector
    if (newCustomersToShow && customerFilters && customerFilters.sector)
      newCustomersToShow = newCustomersToShow.filter(customer => customer.sector === customerFilters.sector)

    //Filter by location
    if (newCustomersToShow && customerFilters && customerFilters.loc) {
      if (customerFilters.loc.state)
        newCustomersToShow = newCustomersToShow.filter(customer => customer.state === customerFilters.loc.state)
      else if (customerFilters.loc.province)
        newCustomersToShow = newCustomersToShow.filter(customer => customer.province === customerFilters.loc.province)
    }
    setCustomersToShow(newCustomersToShow)
  }, [customerFilters, customers])

  const selectCustomer = (e, customer) => {
    if (e) e.preventDefault()
    setSelectedCustomer(customer)
  }
  const clearCustomerSelection = () => {
    setSelectedCustomer(null)
  }

  console.log('customerFilters', customerFilters)

  return (
    <div className="container">
      <CustomerFilters
        handleInput={handleInput}
        handleCascader={handleCascader}
        handleLocCascader={handleLocCascader}
      />
      <div className="info">
        <CustomerList
          customers={customersToShow}
          selectCustomer={selectCustomer}
          clearCustomerSelection={clearCustomerSelection}
          selectedCustomer={selectedCustomer}
        />
        <CustomerDetail customer={selectedCustomer} />
        <CustomerMap
          customers={customersToShow}
          selectCustomer={selectCustomer}
          clearCustomerSelection={clearCustomerSelection}
          selectedCustomer={selectedCustomer}
        />
      </div>
    </div>
  )
}

export default CustomerHome
