//封装成登录授权中间件
module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req, res, next )=> {                                      //pop表示split分割完之后提取数组最后一个数组成员
        const token = String(req.headers.authorization || '').split(' ').pop()       //前端authorization大写，后端应该小写 会自动对应
        assert(token, 401, '请提供jwt token 请先登录')
        //jwt校验token并解构赋值把id获取出来 

        const { id } = jwt.verify(token, req.app.get('secret'))   
        assert(id, 401, '无效的jwt token 请先登录')
        req.user = await AdminUser.findById(id)          //挂载到req上，后续接口、处理后事也可以用       
        assert(req.user, 401, '请先登录')
        await next()
    }
}
