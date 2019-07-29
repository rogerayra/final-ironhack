import React, { useState, useEffect } from 'react'
import StateServices from '../../services/state.services'
import { Input, Cascader } from 'antd'

function CustomerFilters({ handleInput, handleCascader, handleLocCascader }) {
  const [geoStates, setGeoStates] = useState([])

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
        <Input type="text" name="customerName" placeholder="Nombre cliente" onChange={handleInput} />
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

export default CustomerFilters
