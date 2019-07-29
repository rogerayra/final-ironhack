import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import VisitServices from '../../services/visit.services'
import VisitFilters from './VisitFilters'
import VisitMap from './VisitMap'
import VisitList from './VisitList'
import moment from 'moment'

function VisitHome() {
  const [visits, setVisits] = useState([])
  const [visitsToShow, setVisitsToShow] = useState([])
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [visitsFilters, handleInput, handleCascader, handleLocCascader, handleDateRange] = useForm()

  // Initial load of visits
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
    clearVisitSelection()

    // All visits
    let newVisitsToShow = visits

    //Filter by dates
    if (newVisitsToShow && visitsFilters && visitsFilters.dates) {
      newVisitsToShow = newVisitsToShow.filter(visit => {
        const start = moment(visit.start)
        const end = moment(visit.end)
        return start.isSameOrAfter(visitsFilters.dates.start) && end.isSameOrBefore(visitsFilters.dates.end)
      })
    }

    //Filer by salesRep
    if (newVisitsToShow && visitsFilters && visitsFilters.salesRep) {
      newVisitsToShow = newVisitsToShow.filter(visit => visit.user._id === visitsFilters.salesRep)
    }

    // Filter by customer name
    if (newVisitsToShow && visitsFilters && visitsFilters.customerName)
      newVisitsToShow = newVisitsToShow.filter(visit =>
        visit.customer.name.toLowerCase().includes(visitsFilters.customerName.toLowerCase())
      )

    // Filter by customer sector
    if (newVisitsToShow && visitsFilters && visitsFilters.sector)
      newVisitsToShow = newVisitsToShow.filter(visit => visit.customer.sector === visitsFilters.sector)

    //Filter by customer location
    if (newVisitsToShow && visitsFilters && visitsFilters.loc) {
      if (visitsFilters.loc.state)
        newVisitsToShow = newVisitsToShow.filter(visit => visit.customer.state === visitsFilters.loc.state)
      else if (visitsFilters.loc.province)
        newVisitsToShow = newVisitsToShow.filter(visit => visit.customer.province === visitsFilters.loc.province)
    }

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
        <VisitFilters
          handleInput={handleInput}
          handleCascader={handleCascader}
          handleLocCascader={handleLocCascader}
          handleDateRange={handleDateRange}
        />
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
