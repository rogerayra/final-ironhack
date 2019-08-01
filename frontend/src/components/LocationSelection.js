import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import GeoAreaServices from '../services/geoarea.services'

function LocationSelection({ locType, subareas, handleLocCascader, defaultValue }) {
  const [geoAreas, setGeoAreas] = useState([])

  useEffect(() => {
    const geoAreaServices = new GeoAreaServices()
    geoAreaServices
      .getAll(locType)
      .then(({ data }) => {
        const auxGeoAreas = data.geoareas.map(geoarea => ({
          value: `${geoarea.category}-${geoarea._id}`,
          label: geoarea.name,
          children: subareas
            ? geoarea.subareas.map(subarea => ({
                value: `${subarea.category}-${subarea._id}`,
                label: subarea.name
              }))
            : ''
        }))

        setGeoAreas(auxGeoAreas)
      })
      .catch(err => console.error(err))
  }, [locType, subareas])

  return (
    <Cascader
      name="location"
      options={geoAreas}
      placeholder={'Seleccione localización'}
      onChange={values => handleLocCascader(values)}
      expandTrigger="hover"
      defaultValue={defaultValue}
      changeOnSelect
    />
  )
}

export default LocationSelection
