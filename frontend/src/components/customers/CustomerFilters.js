import React from 'react'
import { Input } from 'antd'
import LocationSelection from '../LocationSelection'
import SectorSelection from '../SectorSelection'

function CustomerFilters({ handleInput, handleCascader, handleLocCascader }) {
  return (
    <div className="filters">
      <div className="inputs">
        <Input type="text" name="customerName" placeholder="Nombre cliente" onChange={handleInput} />
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

export default CustomerFilters
