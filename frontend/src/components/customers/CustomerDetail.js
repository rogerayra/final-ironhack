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
            <span>{`${customer.salesRep.firstname} ${customer.salesRep.surname}`}</span>
          </div>
          <div>
            <small>Dirección</small>
            <span>{customer.address}</span>
          </div>
          <div>
            <span>{`${customer.province.name}, ${customer.state.name}, ${customer.country.name}`}</span>
          </div>
          {context.state.user.role === 'ADMIN' ? (
            <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => editCustomer(customer)}>
              Editar
            </Button>
          ) : (
            ''
          )}
          {context.state.user.role === 'ADMIN' ? (
            <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={showConfirm}>
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
