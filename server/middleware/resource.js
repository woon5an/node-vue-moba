//封装成资源中间件
module.exports = options =>{
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req, res, next) =>{
        const modelName = require('inflection').classify(req.params.resource)   //将模块名转化为大写字母开头的驼峰式字符串
        req.Model = require(`../models/${modelName}`) //表示在请求req上挂在一个属性Model
        next()
    }
}