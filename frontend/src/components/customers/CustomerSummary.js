import React, { useState, useEffect } from 'react'

function CustomerSummary({ customers }) {
  const [sectors, setSectors] = useState([new Set()])

  useEffect(() => {
    const auxSectors = new Set()
    if (customers) customers.forEach(customer => auxSectors.add(customer.sector))
    setSectors(Array.from(auxSectors))
  }, [customers])

  return (
    <div className="summary">
      <div>
        <h3>{`${customers.length} clientes`}</h3>
        <ul>
          {sectors.map((sector, i) => (
            <li key={i}>{`${sector}: ${customers.filter(customer => customer.sector === sector).length}`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomerSummary
