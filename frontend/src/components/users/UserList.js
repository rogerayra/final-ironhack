import React from 'react'
import { List, Button } from 'antd'

function UserList({ users, selectUser, clearUserSelection, selectedUser }) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 10
        }}
        dataSource={users}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => selectUser(null, item)}>
                detalle
              </Button>
            ]}
          >
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={`${item.firstname} ${item.surname}`}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default UserList
