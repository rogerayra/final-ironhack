import React, { useState, useEffect } from 'react'
import moment from 'moment'
import StateServices from '../../services/state.services'
import UserServices from '../../services/user.services'
import { Input, Cascader, DatePicker } from 'antd'
moment.locale('es')

function VisitFilters({ handleInput, handleCascader, handleLocCascader, handleDateRange }) {
  const [geoStates, setGeoStates] = useState([])
  const [salesReps, setSalesReps] = useState([])

  useEffect(() => {
    const stateServices = new StateServices()
    stateServices
      .getAll()
      .then(({ data }) => {
        const auxGeoStates = data.states.map(state => ({
          value: `${state.category}-${state._id}`,
          label: state.name,
          children: state.subareas.map(subarea => ({
            value: `${subarea.category}-${subarea._id}`,
            label: subarea.name
          }))
        }))

        setGeoStates(auxGeoStates)
      })
      .catch(err => console.error(err))

    const userServices = new UserServices()
    userServices
      .getAll(`?role=SALESREP`)
      .then(({ data }) => {
        const auxSalesReps = data.users.map(user => ({
          value: user._id,
          label: `${user.firstname} ${user.surname}`
        }))

        setSalesReps(auxSalesReps)
      })
      .catch(err => console.error(err))
  }, [])

  const sectorOptions = [
    {
      value: 'auto',
      label: 'Automóvil'
    },
    {
      value: 'aero',
      label: 'Aeronáutica'
    },
    {
      value: 'molde',
      label: 'Molde / Matriz'
    },
    {
      value: 'meca',
      label: 'Mecanizado General'
    },
    {
      value: 'ener',
      label: 'Energía'
    }
  ]

  return (
    <div className="filters">
      <div className="inputs">
        <DatePicker.RangePicker
          ranges={{
            Hoy: [moment().startOf('day'), moment().endOf('day')],
            'Esta semana': [moment().startOf('week'), moment().endOf('week')],
            'Este mes': [moment().startOf('month'), moment().endOf('month')]
          }}
          onChange={values => handleDateRange(values)}
          separator={'-'}
          format={'DD/MM/YY'}
        />
      </div>
      <div className="inputs">
        <Cascader
          name="salesRep"
          options={salesReps}
          placeholder={'Seleccione comercial'}
          onChange={values => handleCascader(values, 'salesRep')}
          changeOnSelect
        />
      </div>
      <div className="inputs">
        <Input type="text" name="customerName" placeholder="Buscar" onChange={handleInput} />
      </div>
      <div className="inputs">
        <Cascader
          name="sector"
          options={sectorOptions}
          placeholder={'Seleccione sector'}
          onChange={values => handleCascader(values, 'sector')}
          changeOnSelect
        />
      </div>
      <div className="inputs">
        <Cascader
          name="location"
          options={geoStates}
          placeholder={'Seleccione localización'}
          onChange={values => handleLocCascader(values)}
          expandTrigger="hover"
          changeOnSelect
        />
      </div>
    </div>
  )
}

export default VisitFilters
