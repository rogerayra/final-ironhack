import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import VisitServices from '../../services/visit.services'
import VisitFilters from './VisitFilters'
import VisitMap from './VisitMap'
import VisitList from './VisitList'

function VisitHome() {
  const [visits, setVisits] = useState([])
  const [visitsToShow, setVisitsToShow] = useState([])
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [visitsFilters, handleInput, handleCascader] = useForm()

  // Initial load of customers
  useEffect(() => {
    const visitServices = new VisitServices()
    visitServices
      .getAll('?c=1&u=1')
      .then(({ data }) => {
        setVisits(prevState => {
          return [...prevState, ...data.visits]
        })
      })
      .catch(err => console.error(err))
  }, [])

  // Change visits to show based on filters
  useEffect(() => {
    // All visits
    let newVisitsToShow = visits

    // Filter by name
    if (newVisitsToShow && visitsFilters && visitsFilters.customerName)
      newVisitsToShow = newVisitsToShow.filter(customer => customer.name.includes(visitsFilters.customerName))

    // Filter by sector
    if (newVisitsToShow && visitsFilters && visitsFilters.sector)
      newVisitsToShow = newVisitsToShow.filter(customer => customer.sector === visitsFilters.sector)

    setVisitsToShow(newVisitsToShow)
  }, [visits, visitsFilters])

  const selectVisit = (e, customer) => {
    if (e) e.preventDefault()
    setSelectedVisit(customer)
  }
  const clearVisitSelection = () => {
    setSelectedVisit(null)
  }

  return (
    <div>
      <div className="container">
        <VisitFilters handleInput={handleInput} handleCascader={handleCascader} />
        <div className="info">
          <VisitList
            visits={visitsToShow}
            selectVisit={selectVisit}
            clearVisitSelection={clearVisitSelection}
            selectedVisit={selectedVisit}
          />
          <VisitMap
            visits={visitsToShow}
            selectVisit={selectVisit}
            clearVisitSelection={clearVisitSelection}
            selectedVisit={selectedVisit}
          />
        </div>
      </div>
    </div>
  )
}

export default VisitHome
