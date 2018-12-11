import { Tag, Badge } from 'antd';

const status = {
  [null]: {

  },
  NORMAL: {
    status: 'success',
    text: '有效'
  },
  ABNORMAL: {
    status: 'error',
    text: '无效'
  }
}

exports.AccountListTable = {
  columns: [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: val => <Badge status={status[val].status} text={status[val].text} />
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: item => <div>{item && item.map( val => <Tag key={val.id}>{val.name}</Tag> )}</div>
    }
  ],
}