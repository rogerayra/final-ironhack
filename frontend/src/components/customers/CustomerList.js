import React, { createRef, useEffect } from 'react'

function CustomerList({ customers, selectCustomer, clearCustomerSelection, selectedCustomer }) {
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
    customers.forEach(customer => refs[customer._id].current.classList.remove('selected'))
    if (selectedCustomer) {
      if (!isVisible(refs[selectedCustomer._id].current))
        refs[selectedCustomer._id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      refs[selectedCustomer._id].current.classList.add('selected')
    }
  }, [customers, refs, selectedCustomer])

  const handleClick = customer => {
    selectCustomer(null, customer)
  }

  return (
    <div className="list">
      <h2>{`${customers.length} clientes`}</h2>
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
                <b>{customer.name}</b>
                <span>{customer.sector}</span>
              </div>
              <div>
                <span>Provincia</span>
                <span>ABC</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CustomerList
