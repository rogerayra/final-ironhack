import React from 'react'
import { Modal } from 'antd'
import useForm from '../../hooks/useForm'
import SectorSelection from '../SectorSelection'
import LocationSelection from '../LocationSelection'
import SalesRepSelection from '../SalesRepSelection'

function CustomerForm({ customer, visible, handleOk, handleCancel }) {
  const [form, handleInput, handleCascader, handleLocCascader] = useForm({ id: customer ? customer._id : undefined })

  return (
    <Modal
      title={`${customer ? 'Editar' : 'Crear'} Cliente`}
      visible={visible}
      onOk={() => handleOk(form)}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
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
          <label htmlFor="">Comercial</label>
          <SalesRepSelection handleCascader={handleCascader} defaultValue={customer ? [customer.salesRep] : []} />
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
