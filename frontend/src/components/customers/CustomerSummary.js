import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../../context'
import { Button } from 'antd'

function CustomerSummary({ customers, createCustomer }) {
  const context = useContext(MyContext)
  const [sectors, setSectors] = useState([new Set()])

  useEffect(() => {
    let mounted = true
    const auxSectors = new Set()
    if (customers) customers.forEach(customer => auxSectors.add(customer.sector))
    if (mounted) setSectors(Array.from(auxSectors))
    return () => (mounted = false)
  }, [customers])

  return (
    <div className="summary">
      <h2>{`${customers.length} clientes`}</h2>
      <ul>
        {sectors.map((sector, i) => (
          <li key={i}>{`${sector}: ${customers.filter(customer => customer.sector === sector).length}`}</li>
        ))}
      </ul>
      {context && context.state.user && context.state.user.role === 'ADMIN' ? (
        <Button onClick={createCustomer} style={{ backgroundColor: 'rgba(0, 128, 0, 0.7)', color: 'white' }}>
          Crear cliente
        </Button>
      ) : (
        ''
      )}
    </div>
  )
}

export default CustomerSummary
