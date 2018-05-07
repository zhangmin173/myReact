function mock() {
    let data = {
      success: true,
      data: [
        {
          type_id: 1,
          type_name: '分类1',
          type_level: 1,
          type_parent_id: 0,
        },
        {
          type_id: 2,
          type_name: '分类2',
          type_level: 1,
          type_parent_id: 0,
        },
        {
          type_id: 3,
          type_name: '分类1-1',
          type_level: 2,
          type_parent_id: 1,
        },
        {
          type_id: 4,
          type_name: '分类1-2',
          type_level: 2,
          type_parent_id: 1,
        },
        {
          type_id: 5,
          type_name: '分类2-1',
          type_level: 2,
          type_parent_id: 2,
        }
      ],
      msg: '请求成功'
    }
    return data
  }
  module.exports = mock
  