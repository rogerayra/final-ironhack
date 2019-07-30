import React from 'react'
import { Modal } from 'antd'
const { confirm } = Modal

function CustomerDetail({ customer, editCustomer, deleteCustomer }) {
  const showConfirm = () => {
    confirm({
      title: '¿Quiere eliminar este cliente?',
      onOk() {
        deleteCustomer(customer)
      },
      onCancel() {}
    })
  }

  return (
    <div className="detail">
      {customer && (
        <div>
          <h2>{customer.name}</h2>
          <small>{customer.sector}</small>
          <button onClick={() => editCustomer(customer)}>Editar</button>
          <button onClick={showConfirm}>Eliminar</button>
        </div>
      )}
    </div>
  )
}

export default CustomerDetail
