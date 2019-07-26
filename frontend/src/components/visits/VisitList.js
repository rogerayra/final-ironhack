import React, { useState, useEffect } from 'react'
import { List, Drawer, Button } from 'antd'
import VisitDetail from './VisitDetail'

function VisitList({ visits, selectVisit, clearVisitSelection, selectedVisit }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (selectedVisit) showDrawer()
  }, [selectedVisit])

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
    <div>
      <Drawer title="Basic Drawer" placement="right" closable={false} onClose={onClose} visible={visible}>
        <VisitDetail customer={selectedVisit} />
      </Drawer>
      <List
        itemLayout="horizontal"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 10
        }}
        dataSource={visits}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => selectVisit(null, item)}>
                detalle
              </Button>
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={`${item.start}-${item.end}`}
              description={`${item.user.firstname} ${item.user.surname} visita ${item.customer.name}`}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default VisitList
