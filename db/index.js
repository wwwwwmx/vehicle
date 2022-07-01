//使用express创建服务器
// 引入express模块
const express = require('express')
const path = require('path')

// 初始化express模块的app
const app = express()
//引入自己写的addAndDetele模块
// const addAndDetele = require('./addAndDetele')
//引入请求体解析中间件
// const bodyParser = require("body-parser")
//引入自己写的mongoControl方法
const mongoControl = require('./dbc').mongoControl
// 初始化数据库中的集合
var user = new mongoControl('user', 'user')
var car = new mongoControl('user', 'car')
var login = new mongoControl('user', 'login')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
// extended: false
// }))
// 引入body-parser模块
const bodyParser = require('body-parser')
// 初始化urlencoded解析器
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
// app.use(addAndDetele)
// 处理静态文件请求 同样可以影响ejs的渲染模板的读取外部js css文件
app.use(express.static('./static', {
    index: false
}))
app.use(bodyParser.json())
//获取用户数据
app.get('/user', (req, res) => {
    user.find({}, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})
//获取车辆信息
app.get('/car', (req, res) => {
    car.find({}, (error, result) => {
        if (error) throw error
        res.send(result)
    })
})
//用户信息表
app.post('/add', urlencodedParser, (req, res) => {
    let {
        name,
        age,
        type,
        carId,
        registerTime,
        returnTime
    } = req.body
    // console.log(type, id, registerTime, returnTime);
    user.insert([{
        name: name,
        age: age,
        carId: carId,
        type: type,
        registerTime: registerTime,
        returnTime: returnTime
    }], (error, result) => {
        res.send('ok')
    })
})
//删除用户
app.post('/delete', urlencodedParser, (req, res) => {
    let carId = req.body.carId
    console.log(req.body);
    console.log(carId);
    user.delete({
        carId: carId
    }, (error, result) => {
        if (error) {
            throw error
        }
        console.log('删除成功');
        res.send('删除成功')
    })
})
//查找用户
app.post('/search', urlencodedParser, (req, res) => {
    let carId = req.body.carId
    user.find({
        carId: carId
    }, (error, result) => {
        if (error) throw error
        if (result.length === 0) {
            res.send(`没有车牌号为${carId}的车`)
        } else {
            res.send(result[0])
        }
    })
})
//删除车辆
app.post('/deleteCar', urlencodedParser, (req, res) => {
    let carId = req.body.carId
    console.log(req.body);
    console.log(carId);
    car.delete({
        carId: carId
    }, (error, result) => {
        if (error) {
            throw error
        }
        console.log('删除成功');
        res.send('删除成功')
    })
})
//查找车辆
app.post('/searchCar', urlencodedParser, (req, res) => {
    let carId = req.body.carId
    car.find({
        carId: carId
    }, (error, result) => {
        if (error) throw error
        if (result.length === 0) {
            res.send(`没有车牌号为${carId}的车`)
        } else {
            res.send(result[0])
        }
    })
})

//增加用户
app.post('/addUserNum', urlencodedParser, (req, res) => {
    let {
        carId,
        registerTime,
        returnTime,
        type,
        name,
        age
    } = req.body.addForm
    user.insert([{
        carId: carId,
        name: name,
        age: age,
        registerTime: registerTime,
        returnTime: returnTime,
        type: type
    }], (error, result) => {
        if (error) throw error
        res.send('成功添加')
    })
})
//增加车辆
app.post('/addCarNum', urlencodedParser, (req, res) => {
    let {
        carId,
        registerTime,
        returnTime,
        type
    } = req.body.addForm
    car.insert([{
        carId: carId,
        registerTime: registerTime,
        returnTime: returnTime,
        type: type
    }], (error, result) => {
        if (error) throw error
        res.send('成功添加')
    })
})
//修改用户
app.post('/updateu', urlencodedParser, (req, res) => {
    let {
        carId,
        registerTime,
        returnTime,
        type,
        name,
        age
    } = req.body.form
    let updateCarId = req.body.carId
    // console.log(carId, registerTime, returnTime, type, name, age, updateCarId);
    user.update(
        //条件
        {
            carId: updateCarId
        },
        //更换的内容 
        {
            carId: carId,
            registerTime: registerTime,
            returnTime: returnTime,
            type: type,
            name: name,
            age: age
        }, (error, result) => {
            if (error) throw error
            res.send('ok')
        })
})
//修改车辆
app.post('/updateCar', urlencodedParser, (req, res) => {
    let {
        carId,
        registerTime,
        returnTime,
        type
    } = req.body.form
    console.log(req.body.form)
    let updateCarId = req.body.carId
    console.log(updateCarId)
    car.update({
        carId: updateCarId
    }, {
        carId: carId,
        registerTime: registerTime,
        returnTime: returnTime,
        type: type
    }, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send('ok')
    })
})
//登录
app.post('/login', urlencodedParser, (req, res) => {
    let {
        username,
        password
    } = req.body.form
    console.log(username,
        password);
    login.find({
        username: username,
        password: password
    }, (err, result) => {
        if (err) throw err
        if (result.length !== 0) {
            // res.send('ok')
            res.send(result[0])
        } else {
            res.send('密码错误')
        }
    })
})
//个人信息
app.post('/loginAdd', urlencodedParser, (req, res) => {
    let {
        username,
        password,
        birthday,
        date,
        desc
    } = req.body.sizeForm
    console.log(username,
        password, birthday,
        date,
        desc);
    login.insert([{
        username: username,
        password: password,
        birthday: birthday,
        date: date,
        desc: desc
    }], (error, result) => {
        res.send('ok')
    })
})
//主页显现
// app.post()
app.listen(3001)