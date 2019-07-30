import React from 'react'
import { Modal } from 'antd'
import useForm from '../../hooks/useForm'

function VisitForm({ visit, visible, handleOk, handleCancel }) {
  const [form, handleInput, handleCascader] = useForm({})

  const customerOptions = []

  return (
    <Modal
      title="Editar Visita"
      visible={visible}
      onOk={() => handleOk(form)}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {visit && <div />}
    </Modal>
  )
}

export default VisitForm
