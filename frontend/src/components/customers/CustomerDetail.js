import React, { useContext } from 'react'
import { MyContext } from '../../context'
import { Modal, Button } from 'antd'
const { confirm } = Modal

function CustomerDetail({ customer, editCustomer, deleteCustomer }) {
  const context = useContext(MyContext)

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
          <div>
            <small>Sector</small>
            <span>{customer.sector}</span>
          </div>
          <div>
            <small>Comercial</small>
            <span>{customer.salesRep ? `${customer.salesRep.firstname} ${customer.salesRep.surname}` : ''}</span>
          </div>
          <div>
            <small>Dirección</small>
            <span>{customer.address}</span>
          </div>
          <div>
            <span>{`${customer.province.name}, ${customer.state.name}, ${customer.country.name}`}</span>
          </div>
          {context.state.user.role === 'ADMIN' ? (
            <Button
              style={{ backgroundColor: 'rgba(0, 128, 0, 0.7)', color: 'white' }}
              onClick={() => editCustomer(customer)}
            >
              Editar
            </Button>
          ) : (
            ''
          )}
          {context.state.user.role === 'ADMIN' ? (
            <Button style={{ backgroundColor: 'rgba(0, 128, 0, 0.7)', color: 'white' }} onClick={showConfirm}>
              Eliminar
            </Button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default CustomerDetail
