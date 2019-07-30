import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import CustomerServices from '../../services/customer.services'
import CustomerFilters from './CustomerFilters'
import CustomerMap from './CustomerMap'
import CustomerList from './CustomerList'
import CustomerDetail from './CustomerDetail'
import CustomerSummary from './CustomerSummary'
import CustomerForm from './CustomerForm'

function CustomerHome() {
  const [customers, setCustomers] = useState([])
  const [customersToShow, setCustomersToShow] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerFilters, handleInput, handleCascader, handleLocCascader] = useForm()
  const [formVisible, setFormVisible] = useState(false)
  const [customerToEdit, setCustomerToEdit] = useState()

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

  const showFormEdit = customer => {
    setCustomerToEdit(customer)
    setFormVisible(true)
  }

  const showFormCreate = () => {
    setCustomerToEdit(null)
    setFormVisible(true)
  }

  const createCustomer = customerObj => {
    console.log('create-customerObj', customerObj)
    const customerServices = new CustomerServices()
    customerServices
      .postOne(customerObj)
      .then(({ data }) => {
        const auxCustomers = [...customers]
        auxCustomers.push(data.customer)
        setCustomers(auxCustomers)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const updateCustomer = (id, customerObj) => {
    const customerServices = new CustomerServices()
    customerServices
      .patchOne(id, customerObj)
      .then(({ data }) => {
        const auxCustomers = [...customers]
        const index = auxCustomers.findIndex(c => c._id === data.customer._id)
        if (index > -1) auxCustomers[index] = data.customer

        setCustomers(auxCustomers)
        selectCustomer(null, data.customer)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const deleteCustomer = customer => {
    const customerServices = new CustomerServices()
    customerServices
      .deleteOne(customer._id)
      .then(({ data }) => {
        const auxCustomers = [...customers]
        const index = auxCustomers.findIndex(c => c._id === data.customer._id)
        if (index > -1) auxCustomers.splice(index, 1)
        clearCustomerSelection()

        setCustomers(auxCustomers)
      })
      .catch(err => console.error(err))
  }

  const handleFormOk = customerForm => {
    const customerObj = {
      name: customerForm.name,
      sector: customerForm.sector,
      address: customerForm.address,
      salesRep: customerForm.salesRep,
      country: customerForm.loc ? customerForm.loc.country : undefined,
      state: customerForm.loc ? customerForm.loc.state : undefined,
      province: customerForm.loc ? customerForm.loc.province : undefined
    }
    if (customerForm.id) updateCustomer(customerForm.id, customerObj)
    else createCustomer(customerObj)
  }
  const handleFormCancel = () => {
    setFormVisible(false)
  }

  return (
    <div className="container">
      {formVisible && (
        <CustomerForm
          customer={customerToEdit}
          visible={formVisible}
          handleOk={handleFormOk}
          handleCancel={handleFormCancel}
        />
      )}
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
          createCustomer={showFormCreate}
        />
        <div className="info-detail">
          <CustomerSummary customers={customersToShow} />
          <CustomerDetail customer={selectedCustomer} deleteCustomer={deleteCustomer} editCustomer={showFormEdit} />
        </div>
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
