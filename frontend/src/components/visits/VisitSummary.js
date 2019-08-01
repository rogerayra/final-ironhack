import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../../context'
import { Button } from 'antd'

function VisitSummary({ visits, createVisit }) {
  const context = useContext(MyContext)

  const [sectors, setSectors] = useState([new Set()])
  const [salesReps, setSalesReps] = useState([new Set()])

  useEffect(() => {
    const auxSectors = new Set()
    if (visits)
      visits.forEach(visit => (visit.customer && visit.customer.sector ? auxSectors.add(visit.customer.sector) : ''))
    setSectors(Array.from(auxSectors))

    if (context.state.user.role !== 'SALESREP') {
      const auxSalesReps = new Set()
      if (visits)
        visits.forEach(visit => (visit.user ? auxSalesReps.add(`${visit.user.firstname} ${visit.user.surname}`) : ''))
      setSalesReps(Array.from(auxSalesReps))
    }
  }, [context.state.user.role, visits])

  return (
    <div className="summary">
      <h2>{`${visits.length} visitas`}</h2>
      <div style={{ display: 'flex', justifyContent: 'space_between' }}>
        <ul>
          {sectors.map((sector, i) => (
            <li key={i}>{`${sector}: ${
              visits.filter(visit => visit.customer && visit.customer.sector && visit.customer.sector === sector).length
            }`}</li>
          ))}
        </ul>
        {context.state.user.role !== 'SALESREP' ? (
          <ul>
            {salesReps.map((salesRep, i) => (
              <li key={i}>{`${salesRep}: ${
                visits.filter(visit => visit.user && `${visit.user.firstname} ${visit.user.surname}` === salesRep)
                  .length
              }`}</li>
            ))}
          </ul>
        ) : (
          ''
        )}
        {context.state.user.role === 'SALESREP' ? (
          <Button onClick={createVisit} style={{ backgroundColor: 'rgba(128, 0, 128, 0.7)', color: 'white' }}>
            Crear visita
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default VisitSummary
