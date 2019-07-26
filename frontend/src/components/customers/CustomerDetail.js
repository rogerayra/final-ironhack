import React from 'react'

function CustomerDetail({ customer }) {
  return (
    <div className="detail">
      {customer && (
        <div>
          <h2>{customer.name}</h2>
          <small>{customer.sector}</small>
        </div>
      )}
    </div>
  )
}

export default CustomerDetail
