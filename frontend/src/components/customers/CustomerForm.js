import React from 'react'
import { Modal } from 'antd'
import useForm from '../../hooks/useForm'
import SectorSelection from '../SectorSelection'
import LocationSelection from '../LocationSelection'

function CustomerForm({ customer, visible, handleOk, handleCancel }) {
  const [form, handleInput, handleCascader, handleLocCascader] = useForm({ id: customer ? customer._id : undefined })

  console.log('customer', customer)
  console.log('form', form)

  return (
    <Modal
      title="Editar Cliente"
      visible={visible}
      onOk={() => handleOk(form)}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div>
        <div>
          <label htmlFor="">Nombre</label>
          <input type="text" name="name" onChange={handleInput} defaultValue={customer ? customer.name : ''} />
        </div>
        <div>
          <label htmlFor="">Sector</label>
          <SectorSelection handleCascader={handleCascader} defaultValue={customer ? [customer.sector] : []} />
        </div>
        <div>
          <label htmlFor="">Dirección</label>
          <input type="text" name="address" onChange={handleInput} defaultValue={customer ? customer.address : ''} />
        </div>
        <div>
          <label htmlFor="">País</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'country'}
            subareas={false}
            defaultValue={customer ? [`country-${customer.country}`] : []}
          />
        </div>
        <div>
          <label htmlFor="">Comunidad Autónoma</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'state'}
            subareas={false}
            defaultValue={customer ? [`state-${customer.state}`] : []}
          />
        </div>
        <div>
          <label htmlFor="">Provincia</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'province'}
            subareas={false}
            defaultValue={customer ? [`province-${customer.province}`] : []}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CustomerForm
