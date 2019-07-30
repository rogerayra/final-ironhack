import React from 'react'
import { Cascader } from 'antd'

export default function SectorSelection({ handleCascader, defaultValue }) {
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
