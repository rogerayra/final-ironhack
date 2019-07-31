import React from 'react'
import { Cascader } from 'antd'

export default function SectorSelection({ handleCascader, defaultValue }) {
  const sectorOptions = [
    {
      value: 'Automóvil',
      label: 'Automóvil'
    },
    {
      value: 'Aeronáutica',
      label: 'Aeronáutica'
    },
    {
      value: 'Molde / Matriz',
      label: 'Molde / Matriz'
    },
    {
      value: 'Mecanizado General',
      label: 'Mecanizado General'
    },
    {
      value: 'Energía',
      label: 'Energía'
    }
  ]
  return (
    <Cascader
      name="sector"
      options={sectorOptions}
      placeholder={'Seleccione sector'}
      onChange={values => handleCascader(values, 'sector')}
      defaultValue={defaultValue}
      changeOnSelect
    />
  )
}
