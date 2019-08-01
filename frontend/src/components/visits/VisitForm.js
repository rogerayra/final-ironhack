import React, { useState, useContext } from 'react'
import { Modal, Cascader, DatePicker, TimePicker } from 'antd'
import { MyContext } from '../../context'
import useForm from '../../hooks/useForm'
import CustomerSelection from '../CustomerSelection'
import moment from 'moment'

function VisitForm({ visit, visible, handleOk, handleCancel }) {
  const context = useContext(MyContext)
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
      end,
      user: context.state.user._id
    }

    handleOk(visit ? visit._id : undefined, data)
  }

  return (
    <Modal
      title={`${visit ? 'Editar' : 'Crear'} Visita`}
      visible={visible}
      onOk={() => formatData()}
      onCancel={handleCancel}
      okButtonProps={{ style: { backgroundColor: 'rgba(128, 0, 128, 0.7)', color: 'white' } }}
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
          <TimePicker
            name="endTime"
            minuteStep={15}
            format={'HH:mm'}
            onChange={value => dateChanged(value, 'endTime')}
            defaultValue={visit ? moment(visit.end) : moment()}
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
