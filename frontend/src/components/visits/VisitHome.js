import React, { useState, useEffect, useContext } from 'react'
import useForm from '../../hooks/useForm'
import VisitServices from '../../services/visit.services'
import VisitFilters from './VisitFilters'
import VisitMap from './VisitMap'
import VisitList from './VisitList'
import VisitDetail from './VisitDetail'
import VisitSummary from './VisitSummary'
import VisitForm from './VisitForm'
import moment from 'moment'
import { MyContext } from '../../context'

function VisitHome({ history }) {
  const context = useContext(MyContext)
  if (!context.state.isLogged) history.push('/')

  const [visits, setVisits] = useState([])
  const [visitsToShow, setVisitsToShow] = useState([])
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [visitsFilters, handleInput, handleCascader, handleLocCascader, handleDateRange] = useForm()
  const [formVisible, setFormVisible] = useState(false)
  const [visitToEdit, setVisitToEdit] = useState()

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

  const showFormEdit = visit => {
    setVisitToEdit(visit)
    setFormVisible(true)
  }

  const showFormCreate = () => {
    setVisitToEdit(null)
    setFormVisible(true)
  }

  const createVisit = form => {
    const visitServices = new VisitServices()
    visitServices
      .postOne(form)
      .then(({ data }) => {
        const auxVisits = [...visits]
        auxVisits.push(data.visit)
        setVisits(auxVisits)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const updateVisit = (id, form) => {
    const visitServices = new VisitServices()
    visitServices
      .patchOne(id, form)
      .then(({ data }) => {
        const auxVisits = [...visits]
        const index = auxVisits.findIndex(v => v._id === data.visit._id)
        if (index > -1) auxVisits[index] = data.visit

        setVisits(auxVisits)
        selectVisit(null, data.visit)
      })
      .catch(err => console.error(err))
    setFormVisible(false)
  }

  const deleteVisit = visit => {
    const visitServices = new VisitServices()
    visitServices
      .deleteOne(visit._id)
      .then(({ data }) => {
        const auxVisits = [...visits]
        const index = auxVisits.findIndex(v => v._id === data.visit._id)
        if (index > -1) auxVisits.splice(index, 1)
        clearVisitSelection()

        setVisits(auxVisits)
      })
      .catch(err => console.error(err))
  }

  const handleFormOk = (id, data) => {
    console.log(id)
    if (id) updateVisit(id, data)
    else createVisit(data)
  }
  const handleFormCancel = () => {
    setFormVisible(false)
  }

  return (
    <div>
      <div className="container">
        {formVisible && (
          <VisitForm
            visit={visitToEdit}
            visible={formVisible}
            handleOk={handleFormOk}
            handleCancel={handleFormCancel}
          />
        )}
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
          <div className="info-detail">
            <VisitSummary visits={visitsToShow} createVisit={showFormCreate} />
            <VisitDetail visit={selectedVisit} deleteVisit={deleteVisit} editVisit={showFormEdit} />
          </div>
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
