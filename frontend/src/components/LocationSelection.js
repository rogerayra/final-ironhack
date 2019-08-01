import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import GeoAreaServices from '../services/geoarea.services'

function LocationSelection({ locType, subareas, handleLocCascader, defaultValue }) {
  const [geoAreas, setGeoAreas] = useState([])

  useEffect(() => {
    let mounted = true
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
        if (mounted) setGeoAreas(auxGeoAreas)
      })
      .catch(err => console.error(err))

    return () => (mounted = false)
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
