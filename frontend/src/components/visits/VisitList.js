import React, { createRef, useEffect } from 'react'
import moment from 'moment'
moment.locale('es')

function VisitList({ visits, selectVisit, clearVisitSelection, selectedVisit }) {
  const refs = visits.reduce((acc, customer) => {
    acc[customer._id] = createRef()
    return acc
  }, {})

  function isVisible(ele) {
    const { top, bottom } = ele.getBoundingClientRect()
    const { top: parentTop, bottom: parentBottom } = ele.parentNode.getBoundingClientRect()

    return top > parentTop && bottom < parentBottom
  }

  useEffect(() => {
    visits.forEach(visit => refs[visit._id].current.classList.remove('selected'))
    if (selectedVisit) {
      if (!isVisible(refs[selectedVisit._id].current))
        refs[selectedVisit._id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      refs[selectedVisit._id].current.classList.add('selected')
    }
  }, [refs, selectedVisit, visits])

  const handleClick = visit => {
    selectVisit(null, visit)
  }

  return (
    <div className="list">
      <h2>{`${visits.length} visitas`}</h2>
      <ul>
        {visits.map(visit => {
          const start = moment(visit.start)
          const end = moment(visit.end)
          return (
            <li key={visit._id} ref={refs[visit._id]} className="visit-item" onClick={() => handleClick(visit)}>
              <div>
                <b>{`${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`}</b>
                <span>{`${start.fromNow()}`}</span>
              </div>
              <div>
                <span>{`${visit.customer.name}`}</span>
                <span>{`${visit.user.firstname} ${visit.user.surname}`}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VisitList
