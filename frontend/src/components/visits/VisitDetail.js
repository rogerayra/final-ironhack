import React, { useContext } from 'react'
import { Modal, Button } from 'antd'
import { MyContext } from '../../context'
import VisitServices from '../../services/visit.services'
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

  const getVisit = () => {
    const visitServices = new VisitServices()
    visitServices
      .getOne(visit._id)
      .then(({ data }) => {
        editVisit(data.visit)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="detail">
      {visit && (
        <div>
          <h2>{`${start.format('DD/MM/YY')}  ${start.format('HH:mm')}-${end.format('HH:mm')}`}</h2>
          {context.state.user.role === 'ADMIN' ? (
            <div>
              <small>Comercial</small>
              <span>{visit.user ? `${visit.user.firstname} ${visit.user.surname}` : ''}</span>
            </div>
          ) : (
            ''
          )}
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
            <Button style={{ backgroundColor: 'rgba(128, 0, 128, 0.7)', color: 'white' }} onClick={getVisit}>
              Editar
            </Button>
          ) : (
            ''
          )}
          {context.state.user.role === 'SALESREP' ? (
            <Button style={{ backgroundColor: 'rgba(128, 0, 128, 0.7)', color: 'white' }} onClick={showConfirm}>
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
