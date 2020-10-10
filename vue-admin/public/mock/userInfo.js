import Mock from 'mockjs'
const result = Mock.mock({
  "data|20":[{
    "注册日期":"@date(yyyy-MM-dd HH:mm)",
    "用户姓名":"@cname",
    "用户地址":"@county(true)",
    "联系电话":/1[357]\d{9}/,
    "邮箱":'@email',
    "其他信息":'@csentence()'
  }]
})
Mock.mock('/mock/userinfo','get',result)