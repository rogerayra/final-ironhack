import React from 'react'
import { Modal } from 'antd'
const { confirm } = Modal

function VisitDetail({ visit, editVisit, deleteVisit }) {
  const showConfirm = () => {
    confirm({
      title: '¿Quiere eliminar esta visita?',
      onOk() {
        deleteVisit(visit)
      },
      onCancel() {}
    })
  }

  return (
    <div className="detail">
      {visit && (
        <div>
          <h2>{`${visit.start} - ${visit.end}`}</h2>
          <span>{visit.customer ? visit.customer.name : 'Sin cliente'}</span>
          <small>{visit.user ? `${visit.user.firstname} ${visit.user.surname}` : 'Sin comercial'}</small>
          <button onClick={() => editVisit(visit)}>Editar</button>
          <button onClick={showConfirm}>Eliminar</button>
        </div>
      )}
    </div>
  )
}

export default VisitDetail
