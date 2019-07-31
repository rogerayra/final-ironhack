import React, { useContext } from 'react'
import { Modal, Button } from 'antd'
import { MyContext } from '../../context'
import moment from 'moment'
const { confirm } = Modal

function VisitDetail({ visit, editVisit, deleteVisit }) {
  const context = useContext(MyContext)
  const showConfirm = () => {
    confirm({
      title: '¿Quiere eliminar esta visita?',
      onOk() {
        deleteVisit(visit)
      },
      onCancel() {}
    })
  }
  let start
  let end
  if (visit) {
    start = moment(visit.start)
    end = moment(visit.end)
  }

  return (
    <div className="detail">
      {visit && (
        <div>
          <h2>{`${start.format('DD/MM/YY')}  ${start.format('HH:mm')}-${end.format('HH:mm')}`}</h2>
          <div>
            <small>Comercial</small>
            <span>{visit.user ? `${visit.user.firstname} ${visit.user.surname}` : ''}</span>
          </div>
          <div>
            <small>Cliente</small>
            <span>{visit.customer ? visit.customer.name : ''}</span>
          </div>
          <div>
            <small>Motivo</small>
            <span>{visit.purpose}</span>
          </div>
          <div>
            <small>Notas</small>
            <span>{visit.notes}</span>
          </div>

          {context.state.user.role === 'SALESREP' ? (
            <Button style={{ backgroundColor: 'purple', color: 'white' }} onClick={() => editVisit(visit)}>
              Editar
            </Button>
          ) : (
            ''
          )}
          {context.state.user.role === 'SALESREP' ? (
            <Button style={{ backgroundColor: 'purple', color: 'white' }} onClick={showConfirm}>
              Eliminar
            </Button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default VisitDetail
