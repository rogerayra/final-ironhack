import React, { useState } from 'react'
import { Modal, Cascader, DatePicker, TimePicker } from 'antd'
import useForm from '../../hooks/useForm'
import SalesRepSelection from '../SalesRepSelection'
import CustomerSelection from '../CustomerSelection'
import moment from 'moment'

function VisitForm({ visit, visible, handleOk, handleCancel }) {
  const initial = {
    startDate: visit ? moment(visit.start) : moment(),
    startTime: visit ? moment(visit.start) : moment(),
    endDate: visit ? moment(visit.end) : moment(),
    endTime: visit ? moment(visit.end) : moment()
  }

  const [form, handleInput, handleCascader] = useForm({})
  const [datesRange, setDatesRange] = useState(initial)

  const dateChanged = (value, field) => {
    setDatesRange({
      ...datesRange,
      [field]: value
    })
  }

  const formatData = () => {
    const start = datesRange.startDate
      .set({
        hour: datesRange.startTime.get('hour'),
        minute: datesRange.startTime.get('minute'),
        second: 0,
        millisecond: 0
      })
      .toDate()
    const end = datesRange.startDate
      .set({
        hour: datesRange.endTime.get('hour'),
        minute: datesRange.endTime.get('minute'),
        second: 0,
        millisecond: 0
      })
      .toDate()

    const data = {
      ...form,
      start,
      end
    }

    handleOk(visit ? visit._id : undefined, data)
  }

  return (
    <Modal
      title={`${visit ? 'Editar' : 'Crear'} Visita`}
      visible={visible}
      onOk={() => formatData()}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <div>
        <div>
          <label htmlFor="">Inicio</label>
          <DatePicker
            name="startDate"
            onChange={value => dateChanged(value, 'startDate')}
            defaultValue={visit ? moment(visit.start) : moment()}
          />
          <TimePicker
            name="startTime"
            minuteStep={15}
            format={'HH:mm'}
            onChange={value => dateChanged(value, 'startTime')}
            defaultValue={visit ? moment(visit.start) : moment()}
          />
        </div>
        <div>
          <label htmlFor="">Fin</label>
          {/* <DatePicker name="endDate" onChange={value => dateChanged(value, 'endDate')} /> */}
          <TimePicker
            name="endTime"
            minuteStep={15}
            format={'HH:mm'}
            onChange={value => dateChanged(value, 'endTime')}
            defaultValue={visit ? moment(visit.end) : moment()}
          />
        </div>
        <div>
          <label htmlFor="">Comercial</label>
          <SalesRepSelection
            name={'user'}
            handleCascader={handleCascader}
            defaultValue={visit ? [visit.user._id] : []}
          />
        </div>
        <div>
          <label htmlFor="">Cliente</label>
          <CustomerSelection handleCascader={handleCascader} defaultValue={visit ? [visit.customer._id] : []} />
        </div>
        <div>
          <label htmlFor="">Motivo</label>
          <Cascader
            name="purpose"
            options={[
              {
                value: 'Visita de cortesía',
                label: 'Visita de cortesía'
              },
              {
                value: 'Presentación oferta',
                label: 'Presentación oferta'
              }
            ]}
            placeholder={'Seleccione'}
            onChange={values => handleCascader(values, 'purpose')}
            changeOnSelect
            defaultValue={visit ? [visit.purpose] : []}
          />
        </div>
        <div>
          <label htmlFor="">Notas</label>
          <input type="text" name="notes" onChange={handleInput} defaultValue={visit ? visit.notes : ''} />
        </div>
      </div>
    </Modal>
  )
}

export default VisitForm
