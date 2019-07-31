import React, { createRef, useEffect } from 'react'

function CustomerList({ customers, selectCustomer, clearCustomerSelection, selectedCustomer, createCustomer }) {
  const refs = customers.reduce((acc, customer) => {
    acc[customer._id] = createRef()
    return acc
  }, {})

  function isVisible(ele) {
    const { top, bottom } = ele.getBoundingClientRect()
    const { top: parentTop, bottom: parentBottom } = ele.parentNode.getBoundingClientRect()

    return top > parentTop && bottom < parentBottom
  }

  useEffect(() => {
    customers.forEach(customer => refs[customer._id].current.classList.remove('selected-customer'))
    if (selectedCustomer) {
      if (!isVisible(refs[selectedCustomer._id].current))
        refs[selectedCustomer._id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      refs[selectedCustomer._id].current.classList.add('selected-customer')
    }
  }, [customers, refs, selectedCustomer])

  const handleClick = customer => {
    selectCustomer(null, customer)
  }

  return (
    <div className="list">
      <h1>Clientes</h1>
      <ul>
        {customers.map(customer => {
          return (
            <li
              key={customer._id}
              ref={refs[customer._id]}
              className="customer-item"
              onClick={() => handleClick(customer)}
            >
              <div>
                <b style={{ marginLeft: '10px' }}>{customer.name}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space_between' }}>
                <span style={{ marginLeft: '10px' }}>{customer.sector}</span>
                <span style={{ marginRight: '10px' }}>{customer.province.name}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CustomerList
