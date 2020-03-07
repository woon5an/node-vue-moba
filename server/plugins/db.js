module.exports = app => {
    const mongoose = require("mongoose")

    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true, useUnifiedTopology: true
    })

    mongoose.connection.once("open",function(){
        console.log("数据库连接成功")
    })
    require('require-all')(__dirname + '/../models')    //将models文件夹下的所有js文件引用了一遍
}