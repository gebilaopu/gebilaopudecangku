// 引入mysql
const mysql = require("mysql");
// 创建链接对象
const connection = mysql.createConnection({
    host: 'localhost', //数据库地址
    user: 'root', //数据库用户名
    password: 'root', //数据库密码
    port: '3306', //端口号 默认就是3306 可以不写
    database:'smms'
});
// 执行链接方法
connection.connect(() => {
    console.log('数据库链接成功')
})
// 把链接对象暴露出去
module.exports = connection;