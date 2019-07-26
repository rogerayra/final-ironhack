import React, { useState, useEffect } from 'react'
import { List, Drawer, Button } from 'antd'
import CustomerDetail from './CustomerDetail'

function CustomerList({ customers, selectCustomer, clearCustomerSelection, selectedCustomer }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (selectedCustomer) showDrawer()
  }, [selectedCustomer])

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  return (
    <div>
      <Drawer title="Basic Drawer" placement="right" closable={false} onClose={onClose} visible={visible}>
        <CustomerDetail customer={selectedCustomer} />
      </Drawer>
      <List
        itemLayout="horizontal"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 10
        }}
        dataSource={customers}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => selectCustomer(null, item)}>
                detalle
              </Button>
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={item.name}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CustomerList
