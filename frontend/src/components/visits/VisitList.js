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
    visits.forEach(visit => refs[visit._id].current.classList.remove('selected-visit'))
    if (selectedVisit) {
      if (!isVisible(refs[selectedVisit._id].current))
        refs[selectedVisit._id].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      refs[selectedVisit._id].current.classList.add('selected-visit')
    }
  }, [refs, selectedVisit, visits])

  const handleClick = visit => {
    selectVisit(null, visit)
  }

  return (
    <div className="list">
      <h1>Visitas</h1>
      <ul>
        {visits.map(visit => {
          const start = moment(visit.start)
          const end = moment(visit.end)
          return (
            <li key={visit._id} ref={refs[visit._id]} className="visit-item" onClick={() => handleClick(visit)}>
              <div>
                <b style={{ marginLeft: '10px' }}>{`${start.format('DD/MM/YY')}  ${start.format('HH:mm')} -${end.format(
                  'HH:mm'
                )}`}</b>
                <span>{` (${start.fromNow()})`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space_between' }}>
                <span style={{ marginLeft: '10px' }}>{visit.customer ? `${visit.customer.name}` : 'Sin cliente'}</span>
                <span style={{ marginRight: '10px' }}>
                  {visit.user ? ` (${visit.user.firstname[0]}. ${visit.user.surname})` : ' (Sin comercial)'}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VisitList
