import React, { useState, useEffect } from 'react'

function VisitSummary({ visits }) {
  const [sectors, setSectors] = useState([new Set()])
  const [salesReps, setSalesReps] = useState([new Set()])

  useEffect(() => {
    const auxSectors = new Set()
    if (visits)
      visits.forEach(visit => (visit.customer && visit.customer.sector ? auxSectors.add(visit.customer.sector) : ''))
    setSectors(Array.from(auxSectors))

    const auxSalesReps = new Set()
    if (visits)
      visits.forEach(visit => (visit.user ? auxSalesReps.add(`${visit.user.firstname} ${visit.user.surname}`) : ''))
    setSalesReps(Array.from(auxSalesReps))
  }, [visits])

  return (
    <div className="summary">
      <div>
        <h3>{`${visits.length} visitas`}</h3>
        <ul>
          {sectors.map((sector, i) => (
            <li key={i}>{`${sector}: ${
              visits.filter(visit => visit.customer && visit.customer.sector && visit.customer.sector === sector).length
            }`}</li>
          ))}
        </ul>
        <ul>
          {salesReps.map((salesRep, i) => (
            <li key={i}>{`${salesRep}: ${
              visits.filter(visit => visit.user && `${visit.user.firstname} ${visit.user.surname}` === salesRep).length
            }`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VisitSummary
