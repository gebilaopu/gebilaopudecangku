// 这是账号管理路由
var express = require('express');
var router = express.Router();
// 引入连接数据模块
const connection = require("./connect")

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    //  设置响应头 解决跨域
    res.header('Access-Control-Allow-Origin', '*');
    next();
})



// router.all("*",(req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     next();
// })
// 添加账号的路由 /accountadd
router.post('/accountadd', (req, res) => {
    // 设置响应头 解决跨域
    // res.header("Access-Control-Allow-Origin", "*");
    //接收前端发送的添加账号的数据
    let {
        username,
        password,
        usergroup
    } = req.body;
    // console.log(username, password, usergroup)
    // 把数据存入数据库
    // 构造增加账号的sql语句
    const sqlstr = `insert into account(username,password,usergroup) values('${username}','${password}','${usergroup}')`;
    // console.log(sqlstr);
    // 执行sql语句
    connection.query(sqlstr, (err, data) => {
        // 如果if错误 就抛出错误 err
        if (err) throw err;
        // 判断受影响的行数
        if (data.affectedRows > 0) {
            // 如果大于0就给前端返回成功的数据对象
            res.send({
                "error_code": 0,
                "reason": "插入数据成功"
            });
        } else {
            // 失败 返回给前端失败的数据对象
            res.send({
                "error_code": 1,
                "reason": "插入数据失败"
            });
        }
    })
})
// 显示账号的路由 /accountmanage
router.get('/accountmanage', (req, res) => {
    // 设置响应头 解决跨域
    //  res.header("Access-Control-Allow-Origin", "*");

    //  查询所有的账号数据 构造sql语句
    const sqlstr = "select * from account order by ctime desc";
    //  执行sql语句
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        // 否则把查询到的数据响应给前端
        res.send(data)
    })
    //   res.send("1");
})
// 删除账号请求的路由 
router.get('/accountdel', (req, res) => {
    // 接受id
    let id = req.query.id;
    // 根据id 执行删除
    // 构造删除数据的sql语句
    const sqlstr = `delete from account where id=${id}`;
    // 执行sql语句
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        // 根据删除结果判断
        if (data.affectedRows > 0) {
            //   如果受影响行数大于0 那么删除成功 响应回前端
            res.send({
                "error_code": 0,
                "reason": "删除数据成功"
            });
        } else {
            //  如果失败 将失败结果响应回前端
            res.send({
                "error_code": 1,
                "reason": "删除数据失败"
            });
        }
        // res.send(1)
    })
})

// 接受修改的数据回填请求 

router.get('/accountedit', (req, res) => {
    // 接受id
    let {
        id
    } = req.query;
    // 构造sql
    const sqlstr = `select*from account where id=${id}`;
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        // 把查询的数据返回给前端
        console.log(data)
        res.send(data);
    })
    // console.log(sqlstr)
    // res.send()
})

// 接受修改 保存修改数据的请求
router.post('/accounteditsave', (req, res) => {
    // 接受修改后的新数据和原来的id
    let {
        username,
        usergroup,
        editId
    } = req.body;
    // 构造sql
    const sqlstr =`update account set username='${username}',usergroup='${usergroup}' where id=${editId}`;
    // 执行sql
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        //受影响函数大于0 成功
        if (data.affectedRows > 0) {
            res.send({
                "error_code": 0,
                "reason":"修改账号成功" 
            });
        } else {
            res.send({
                "error_code": 1,
                "reason":"修改账号失败" 
            })
        }
    })
})


module.exports = router;