import React from 'react'
import { Input, Cascader } from 'antd'

function VisitFilters({ handleInput, handleCascader }) {
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
        <label>Cliente</label>
        <Input type="text" name="customerName" placeholder="Buscar" onChange={handleInput} />
      </div>
      <div className="inputs">
        <label>Sector</label>
        <Cascader
          name="sector"
          options={sectorOptions}
          onChange={values => handleCascader(values, 'sector')}
          changeOnSelect
        />
      </div>
      <div className="inputs">
        <label>Localización</label>
        <select name="localización">
          <option value="bcn">Barcelona</option>
          <option value="mad">Madrid</option>
          <option value="val">Valencia</option>
          <option value="viz">Vizcaya</option>
          <option value="ponte">Pontevedra</option>
        </select>
      </div>
    </div>
  )
}

export default VisitFilters
