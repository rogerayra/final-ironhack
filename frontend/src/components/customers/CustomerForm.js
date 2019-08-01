import React from 'react'
import { Modal } from 'antd'
import useForm from '../../hooks/useForm'
import SectorSelection from '../SectorSelection'
import LocationSelection from '../LocationSelection'
import SalesRepSelection from '../SalesRepSelection'

function CustomerForm({ customer, visible, handleOk, handleCancel }) {
  const [form, handleInput, handleCascader, handleLocCascader] = useForm({ id: customer ? customer._id : undefined })

  const formatData = () => {
    const data = {
      name: form.name,
      sector: form.sector,
      address: form.address,
      salesRep: form.salesRep,
      country: form.loc ? form.loc.country : undefined,
      state: form.loc ? form.loc.state : undefined,
      province: form.loc ? form.loc.province : undefined
    }

    handleOk(customer ? customer._id : undefined, data)
  }

  return (
    <Modal
      title={`${customer ? 'Editar' : 'Crear'} Cliente`}
      visible={visible}
      onOk={() => formatData()}
      onCancel={handleCancel}
      okButtonProps={{ style: { backgroundColor: 'rgba(0, 128, 0, 0.7)', color: 'white' } }}
    >
      <div>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" onChange={handleInput} defaultValue={customer ? customer.name : ''} />
        </div>
        <div>
          <label>Sector</label>
          <SectorSelection handleCascader={handleCascader} defaultValue={customer ? [customer.sector] : []} />
        </div>
        <div>
          <label>Comercial</label>
          <SalesRepSelection
            name={'salesRep'}
            handleCascader={handleCascader}
            defaultValue={customer ? [customer.salesRep._id] : []}
          />
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" name="address" onChange={handleInput} defaultValue={customer ? customer.address : ''} />
        </div>
        <div>
          <label>País</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'country'}
            subareas={false}
            defaultValue={customer ? [`country-${customer.country._id}`] : []}
          />
        </div>
        <div>
          <label>Comunidad Autónoma</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'state'}
            subareas={false}
            defaultValue={customer ? [`state-${customer.state._id}`] : []}
          />
        </div>
        <div>
          <label>Provincia</label>
          <LocationSelection
            handleLocCascader={values => handleLocCascader(values, true)}
            locType={'province'}
            subareas={false}
            defaultValue={customer ? [`province-${customer.province._id}`] : []}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CustomerForm
