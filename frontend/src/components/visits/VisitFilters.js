import React from 'react'
import moment from 'moment'
import { Input, DatePicker } from 'antd'
import SalesRepSelection from '../SalesRepSelection'
import LocationSelection from '../LocationSelection'
import SectorSelection from '../SectorSelection'
moment.locale('es')

function VisitFilters({ handleInput, handleCascader, handleLocCascader, handleDateRange }) {
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
        <SalesRepSelection handleCascader={handleCascader} />
      </div>
      <div className="inputs">
        <Input type="text" name="customerName" placeholder="Buscar" onChange={handleInput} />
      </div>
      <div className="inputs">
        <SectorSelection handleCascader={handleCascader} />
      </div>
      <div className="inputs">
        <LocationSelection handleLocCascader={handleLocCascader} locType={'state'} subareas={true} />
      </div>
    </div>
  )
}

export default VisitFilters
